package rmit.assignment.tourManagementTool.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import rmit.assignment.tourManagementTool.model.Tour;
import rmit.assignment.tourManagementTool.services.TourService;

@RestController
@RequestMapping("/api/tour")
public class TourController {

    @Autowired
    private TourService tourService;

    @PostMapping("")
    public ResponseEntity<?> createNewTour(@RequestBody Tour tour){
        return new ResponseEntity<Tour>(tour, HttpStatus.CREATED);
    }
}
