package rmit.assignment.tourManagementTool.exceptions;

public class LocationIdExceptionResponse {

    private String locationIdentifier;

    public LocationIdExceptionResponse(String locationIdentifier) {
        this.locationIdentifier = locationIdentifier;
    }

    public String getLocationIdentifier() {
        return locationIdentifier;
    }

    public void setLocationIdentifier(String locationIdentifier) {
        this.locationIdentifier = locationIdentifier;
    }
}
