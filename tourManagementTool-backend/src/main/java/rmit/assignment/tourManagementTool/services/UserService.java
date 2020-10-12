package rmit.assignment.tourManagementTool.services;

import rmit.assignment.tourManagementTool.model.User;

public interface UserService {
    void save(User user);

    User findByUsername(String username);
}
