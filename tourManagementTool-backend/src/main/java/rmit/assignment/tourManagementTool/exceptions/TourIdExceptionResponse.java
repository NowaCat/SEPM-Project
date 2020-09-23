package rmit.assignment.tourManagementTool.exceptions;

public class TourIdExceptionResponse {

    private String identifier;

    public TourIdExceptionResponse(String customTourIdentifier) {
        this.identifier = customTourIdentifier;
    }

    public String getTourIdentifier() {
        return identifier;
    }

    public void setTourIdentifier(String tourIdentifier) {
        this.identifier = tourIdentifier;
    }
}
