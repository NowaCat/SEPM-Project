package rmit.assignment.tourManagementTool.exceptions;

public class TourNotFoundExceptionResponse {

    private String tourNotFound;

    public TourNotFoundExceptionResponse(String tourNotFound) {
        this.tourNotFound = tourNotFound;
    }

    public String getTourNotFound() {
        return tourNotFound;
    }

    public void setTourNotFound(String tourNotFound) {
        this.tourNotFound = tourNotFound;
    }
}
