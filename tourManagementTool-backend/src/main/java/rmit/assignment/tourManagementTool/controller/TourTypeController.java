package rmit.assignment.tourManagementTool.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.*;
import rmit.assignment.tourManagementTool.exceptions.TourIdException;
import rmit.assignment.tourManagementTool.model.Location;
import rmit.assignment.tourManagementTool.model.TourType;
import rmit.assignment.tourManagementTool.services.LocationService;
import rmit.assignment.tourManagementTool.services.MapValidationErrorService;
import rmit.assignment.tourManagementTool.services.TourTypeService;

import javax.validation.Valid;

@RestController
@RequestMapping("/api/tourType")
@CrossOrigin
public class TourTypeController {
    @Autowired
    private TourTypeService tourTypeService;

    @PostMapping("")
    public ResponseEntity<?> createNewTourType(@Valid @RequestBody TourType tourType, BindingResult result){

        TourType tourType1 = tourTypeService.saveOrUpdateTourType(tourType);

        return new ResponseEntity<TourType>(tourType1, HttpStatus.CREATED);
    }

    @GetMapping("/{label}")
    public ResponseEntity<?> getTourTypeByLabel(@PathVariable String label){
        TourType type = tourTypeService.findTourTypeByLabel(label);
        return new ResponseEntity<TourType>(type, HttpStatus.OK);
    }

    @GetMapping("/all")
    public Iterable<TourType> getAllTypes(){
        return tourTypeService.findAllTourTypes();
    }

    @DeleteMapping("/{label}")
    public ResponseEntity<?> deleteType(@PathVariable String label){
        tourTypeService.deleteTourTypeByLabel(label);

        return new ResponseEntity<String>("Tour type label: '" + label + "' deleted successfully", HttpStatus.OK);
    }
}
