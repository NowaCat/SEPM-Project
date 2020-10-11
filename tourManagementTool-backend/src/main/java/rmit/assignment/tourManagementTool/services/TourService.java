package rmit.assignment.tourManagementTool.services;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import rmit.assignment.tourManagementTool.exceptions.LocationIdException;
import rmit.assignment.tourManagementTool.exceptions.TourIdException;
import rmit.assignment.tourManagementTool.exceptions.TourNotFoundException;
import rmit.assignment.tourManagementTool.model.Location;
import rmit.assignment.tourManagementTool.model.Tour;
import rmit.assignment.tourManagementTool.model.User;
import rmit.assignment.tourManagementTool.repositories.LocationRepository;
import rmit.assignment.tourManagementTool.repositories.TourRepository;
import rmit.assignment.tourManagementTool.repositories.UserRepository;

import java.util.*;

@Service
public class TourService {

    @Autowired
    private TourRepository tourRepository;

    @Autowired
    private LocationRepository locationRepository;

    @Autowired
    private UserRepository userRepository;

    public Tour saveOrUpdateTour(Tour tour, String username){
        try {

            if(tour.getId() != null) {
                Tour existingTour = tourRepository.findByTourIdentifier(tour.getTourIdentifier());

                if(existingTour != null && (!existingTour.getTourCreator().equals(username))) {
                    throw new TourNotFoundException("Tour not found in your account");
                } else if (existingTour == null) {
                    throw new TourNotFoundException("Tour with ID: '" + tour.getTourIdentifier()
                            + "'cannot be updated because it does not exist");
                }
            }

            User user = userRepository.findByUsername(username);

            tour.setUser(user);
            tour.setTourCreator(user.getUsername());

            String identifier = tour.getTourIdentifier().toUpperCase();
            tour.setTourIdentifier(identifier);

            if(tour.getId() != null) {
                tour.setCreated_At(tourRepository.findByTourIdentifier(identifier).getCreated_At());
            }
            List<Location> tempLocs = new ArrayList<>();
            for (Location loc: tour.getLocations()) {
                Location newLoc = locationRepository.findByLocationIdentifier(loc.getLocationIdentifier());
                if (newLoc == null) {
                    throw new LocationIdException(loc.getLocationIdentifier());
                }
                tempLocs.add(newLoc);
            }
            tour.setLocations(tempLocs);
            return tourRepository.save(tour);

        }catch (LocationIdException t){
            throw new LocationIdException("Location(s) not found");
        }

        catch (Exception e){
            throw new TourIdException("Error creating tour ID '" + tour.getTourIdentifier() + "'");
        }
    }

    public Tour findTourByTourIdentifier(String id, String username){

        Tour tour = tourRepository.findByTourIdentifier(id);

        if(tour == null){
            throw new TourIdException("Tour ID '" + id + "' does not exist");
        }

        if(!tour.getTourCreator().equals(username)) {
            throw new TourNotFoundException("Tour not found in your account");
        }

        return tour;
    }

    public Iterable<Tour> findAllTours(String username){
        return tourRepository.findAllByTourCreator(username);
    }

    public void deleteTourByTourIdentifier(String id, String username){

        tourRepository.delete(findTourByTourIdentifier(id, username));
    }
}
