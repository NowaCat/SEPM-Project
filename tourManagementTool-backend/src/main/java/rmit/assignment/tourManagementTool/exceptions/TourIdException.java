package rmit.assignment.tourManagementTool.exceptions;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ResponseStatus;

@ResponseStatus(HttpStatus.BAD_REQUEST)
public class TourIdException extends RuntimeException{

    public TourIdException(String s) {
        super(s);
    }
}
