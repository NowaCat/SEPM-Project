package rmit.assignment.tourManagementTool.exceptions;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.context.request.WebRequest;

@RestController
@ControllerAdvice
public class CustomResponseEntityExceptionHandler {

    @ExceptionHandler
    public final ResponseEntity<Object> handleTourIdException(TourIdException ex, WebRequest web){
        TourIdExceptionResponse res = new TourIdExceptionResponse(ex.getMessage());
        return new ResponseEntity<>(res, HttpStatus.BAD_REQUEST);
    }

    @ExceptionHandler
    public final ResponseEntity<Object> handleLocationIdException(LocationIdException ex, WebRequest web){
        LocationIdExceptionResponse res = new LocationIdExceptionResponse(ex.getMessage());
        return new ResponseEntity<>(res, HttpStatus.BAD_REQUEST);
    }

    @ExceptionHandler
    public final ResponseEntity<Object> handleUsernameException(UsernameAlreadyExistsException ex, WebRequest web){
        UsernameAlreadyExistsExceptionResponse res = new UsernameAlreadyExistsExceptionResponse(ex.getMessage());
        return new ResponseEntity<>(res, HttpStatus.BAD_REQUEST);
    }

    @ExceptionHandler
    public final ResponseEntity<Object> handleTourNotFoundException(TourNotFoundException ex, WebRequest web){
        TourNotFoundExceptionResponse res = new TourNotFoundExceptionResponse(ex.getMessage());
        return new ResponseEntity<>(res, HttpStatus.BAD_REQUEST);
    }
}
