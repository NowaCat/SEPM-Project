package rmit.assignment.tourManagementTool.exceptions;

public class TourIdExceptionResponse {

    private String customTourIdentifier;

    public TourIdExceptionResponse(String customTourIdentifier) {
        this.customTourIdentifier = customTourIdentifier;
    }

    public String getCustomTourIdentifier() {
        return customTourIdentifier;
    }

    public void setCustomTourIdentifier(String customTourIdentifier) {
        this.customTourIdentifier = customTourIdentifier;
    }
}
