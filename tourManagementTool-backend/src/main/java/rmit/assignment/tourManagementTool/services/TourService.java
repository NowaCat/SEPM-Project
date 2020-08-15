package rmit.assignment.tourManagementTool.services;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import rmit.assignment.tourManagementTool.model.Tour;
import rmit.assignment.tourManagementTool.repositories.TourRepository;

@Service
public class TourService {

    @Autowired
    private TourRepository tourRepository;

    public Tour saveOrUpdateTour(Tour tour){

        return tourRepository.save(tour);
    }
}
