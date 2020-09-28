package rmit.assignment.tourManagementTool.services;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import rmit.assignment.tourManagementTool.exceptions.LocationIdException;
import rmit.assignment.tourManagementTool.exceptions.TourIdException;
import rmit.assignment.tourManagementTool.model.Location;
import rmit.assignment.tourManagementTool.model.Tour;
import rmit.assignment.tourManagementTool.repositories.LocationRepository;
import rmit.assignment.tourManagementTool.repositories.TourRepository;

import java.util.*;

@Service
public class TourService {

    @Autowired
    private TourRepository tourRepository;

    @Autowired
    private LocationRepository locationRepository;

    public Tour saveOrUpdateTour(Tour tour){
        try {
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

    public Tour findTourByTourIdentifier(String id){

        Tour tour = tourRepository.findByTourIdentifier(id);

        if(tour == null){
            throw new TourIdException("Tour ID '" + id + "' does not exist");
        }

        return tour;
    }

    public Iterable<Tour> findAllTours(){
        return tourRepository.findAll();
    }

    public void deleteTourByTourIdentifier(String id){

        tourRepository.delete(findTourByTourIdentifier(id));
    }
}
