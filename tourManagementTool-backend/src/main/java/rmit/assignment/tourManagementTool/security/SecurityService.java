package rmit.assignment.tourManagementTool.security;

import org.springframework.security.core.Authentication;

public interface SecurityService {
    String findLoggedInUsername();

    Authentication autoLogin(String username, String password);
}
