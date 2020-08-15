package rmit.assignment.tourManagementTool.exceptions;

public class TourIdExceptionResponse {

    private String tourIdentifier;

    public TourIdExceptionResponse(String tourIdentifier) {
        this.tourIdentifier = tourIdentifier;
    }

    public String getTourIdentifier() {
        return tourIdentifier;
    }

    public void setTourIdentifier(String tourIdentifier) {
        this.tourIdentifier = tourIdentifier;
    }
}
