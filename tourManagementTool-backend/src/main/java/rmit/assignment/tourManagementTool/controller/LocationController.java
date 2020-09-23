package rmit.assignment.tourManagementTool.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.*;
import rmit.assignment.tourManagementTool.exceptions.TourIdException;
import rmit.assignment.tourManagementTool.model.Location;
import rmit.assignment.tourManagementTool.model.Tour;
import rmit.assignment.tourManagementTool.services.LocationService;
import rmit.assignment.tourManagementTool.services.MapValidationErrorService;

import javax.validation.Valid;

@RestController
@RequestMapping("/api/location")
@CrossOrigin
public class LocationController {

    @Autowired
    private LocationService locationService;

    @Autowired
    private MapValidationErrorService mapValidationErrorService;

    @PostMapping("")
    public ResponseEntity<?> createNewLocation(@Valid @RequestBody Location location, BindingResult result){

        ResponseEntity<?> errorMap = mapValidationErrorService.MapValidationService(result);
        if(errorMap!=null) return errorMap;

        Location location1 = locationService.saveOrUpdateLocation(location);

        return new ResponseEntity<Location>(location1, HttpStatus.CREATED);
    }

    @GetMapping("/{locationId}")
    public ResponseEntity<?> getLocationByCustomId(@PathVariable String locationId){
        Location location = locationService.findLocationByLocationIdentifier(locationId.toUpperCase());

        if (location == null){
            throw new TourIdException("Location ID '" + locationId + "' does not exist" );
        }
        return new ResponseEntity<Location>(location, HttpStatus.OK);
    }

    @GetMapping("/all")
    public Iterable<Location> getAllLocation(){
        return locationService.findAllLocations();
    }

    @DeleteMapping("/{locationId}")
    public ResponseEntity<?> deleteLocation(@PathVariable String locationId){
        locationService.deleteLocationByLocationIdentifier(locationId.toUpperCase());

        return new ResponseEntity<String>("Location with ID '" + locationId + "' deleted successfully", HttpStatus.OK);
    }
}
