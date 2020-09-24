package rmit.assignment.tourManagementTool.services;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.util.StringUtils;
import rmit.assignment.tourManagementTool.exceptions.LocationIdException;
import rmit.assignment.tourManagementTool.exceptions.TourIdException;
import rmit.assignment.tourManagementTool.model.Location;
import rmit.assignment.tourManagementTool.model.Tour;
import rmit.assignment.tourManagementTool.repositories.LocationRepository;

import java.util.ArrayList;
import java.util.HashSet;
import java.util.List;
import java.util.Set;

@Service
public class LocationService {

    @Autowired
    private LocationRepository locationRepository;

    public Location saveOrUpdateLocation(Location location){

        try {
            String identifier = location.getLocationIdentifier().toUpperCase();
            location.setLocationIdentifier(identifier);

            if(location.getId() != null) {
                location.setCreated_At(locationRepository.findByLocationIdentifier(identifier).getCreated_At());
            }

            return locationRepository.save(location);

        }catch (Exception e){
            throw new LocationIdException("Location ID '" + location.getLocationIdentifier() + "' already exists");
        }
    }

    public Location findLocationByLocationIdentifier(String id){
        Location location = locationRepository.findByLocationIdentifier(id);

        if (location == null) {
            throw new LocationIdException("Location ID '" + id + "' does not exist");
        }

        return location;
    }

    public Iterable<Location> findAllLocations(){
        return locationRepository.findAll();
    }

    public void deleteLocationByLocationIdentifier(String id){

        locationRepository.delete(findLocationByLocationIdentifier(id));
    }
}
