package rmit.assignment.tourManagementTool.services;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.GetMapping;
import rmit.assignment.tourManagementTool.exceptions.TourIdException;
import rmit.assignment.tourManagementTool.model.Tour;
import rmit.assignment.tourManagementTool.repositories.TourRepository;

@Service
public class TourService {

    @Autowired
    private TourRepository tourRepository;

    public Tour saveOrUpdateTour(Tour tour){

        try {

            tour.setCustomTourIdentifier(tour.getCustomTourIdentifier().toUpperCase());
            return tourRepository.save(tour);

        }catch (Exception e){
            throw new TourIdException("Tour ID '" + tour.getCustomTourIdentifier() + "' already exists");
        }
    }

    public Tour findTourByCustomIdentifier(String id){
        return tourRepository.findByCustomTourIdentifier(id);
    }

    public Iterable<Tour> findAllTours(){
        return tourRepository.findAll();
    }

    public void deleteTourByCustomIdentifier(String id){
        Tour tour = tourRepository.findByCustomTourIdentifier(id);

        if (tour == null) {
            throw new TourIdException("Cannot delete tour with ID '" + id + "'. This tour does not exist");
        }

        tourRepository.delete(tour);
    }
}
