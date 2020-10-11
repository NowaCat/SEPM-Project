package rmit.assignment.tourManagementTool.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.*;
import rmit.assignment.tourManagementTool.model.User;
import rmit.assignment.tourManagementTool.payload.JwtLoginSuccessResponse;
import rmit.assignment.tourManagementTool.payload.LoginRequest;
import rmit.assignment.tourManagementTool.security.JwtTokenProvider;
import rmit.assignment.tourManagementTool.security.SecurityService;
import rmit.assignment.tourManagementTool.services.MapValidationErrorService;
import rmit.assignment.tourManagementTool.services.UserService;
import rmit.assignment.tourManagementTool.validators.UserValidator;

import javax.validation.Valid;

import static rmit.assignment.tourManagementTool.security.WebSecurityConstants.TOKEN_PREFIX;

@RestController
@RequestMapping("/api/users")
@CrossOrigin
public class UserController {

    @Autowired
    private UserService userService;

    @Autowired
    private UserValidator userValidator;

    @Autowired
    private SecurityService securityService;

    @Autowired
    private MapValidationErrorService mapValidationErrorService;

    @Autowired
    private JwtTokenProvider tokenProvider;

    @PostMapping("/login")
    public ResponseEntity<?> authenticateUser(@Valid @RequestBody LoginRequest loginRequest, BindingResult result){
        Authentication authentication = securityService.autoLogin(loginRequest.getUsername(), loginRequest.getPassword());
        String jwt = TOKEN_PREFIX +  tokenProvider.generateToken(authentication);

        ResponseEntity<?> errorMap = mapValidationErrorService.MapValidationService(result);
        if(errorMap != null) return errorMap;

        return ResponseEntity.ok(new JwtLoginSuccessResponse(true, jwt));
    }

    @PostMapping("/register")
    public ResponseEntity<?> registerUser(@Valid @RequestBody User user, BindingResult result){

        // Validate passwords match
        userValidator.validate(user, result);

        ResponseEntity<?> errorMap = mapValidationErrorService.MapValidationService(result);
        if(errorMap!=null) return errorMap;

        userService.save(user);

        return new ResponseEntity<>(user, HttpStatus.CREATED);
    }
}
