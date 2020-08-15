package rmit.assignment.tourManagementTool.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.BindingResult;
import org.springframework.validation.FieldError;
import org.springframework.web.bind.annotation.*;
import rmit.assignment.tourManagementTool.exceptions.TourIdException;
import rmit.assignment.tourManagementTool.model.Tour;
import rmit.assignment.tourManagementTool.services.MapValidationErrorService;
import rmit.assignment.tourManagementTool.services.TourService;

import javax.validation.Valid;
import java.util.HashMap;
import java.util.Map;

@RestController
@RequestMapping("/api/tour")
public class TourController {

    @Autowired
    private TourService tourService;

    @Autowired
    private MapValidationErrorService mapValidationErrorService;

    @PostMapping("")
    public ResponseEntity<?> createNewTour(@Valid @RequestBody Tour tour, BindingResult result){

        ResponseEntity<?> errorMap = mapValidationErrorService.MapValidationService(result);
        if(errorMap!=null) return errorMap;

        Tour tour1 = tourService.saveOrUpdateTour(tour);

        return new ResponseEntity<Tour>(tour1, HttpStatus.CREATED);
    }

    @GetMapping("/{tourId}")
    public ResponseEntity<?> getTourByCustomId(@PathVariable String tourId){
        Tour tour = tourService.findTourByCustomIdentifier(tourId.toUpperCase());

        if (tour == null){
            throw new TourIdException("Tour ID '" + tourId + "' does not exist" );
        }
        return new ResponseEntity<Tour>(tour, HttpStatus.OK);
    }

    @GetMapping("/all")
    public Iterable<Tour> getAllTours(){
        return tourService.findAllTours();
    }

    @DeleteMapping("/{tourId}")
    public ResponseEntity<?> deleteTour(@PathVariable String tourId){
        tourService.deleteTourByCustomIdentifier(tourId.toUpperCase());

        return new ResponseEntity<String>("Tour with ID '" + tourId + "' deleted successfully", HttpStatus.OK);
    }
}
