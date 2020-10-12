package rmit.assignment.tourManagementTool.services;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;
import rmit.assignment.tourManagementTool.exceptions.UsernameAlreadyExistsException;
import rmit.assignment.tourManagementTool.model.Role;
import rmit.assignment.tourManagementTool.model.User;
import rmit.assignment.tourManagementTool.repositories.RoleRepository;
import rmit.assignment.tourManagementTool.repositories.UserRepository;

import java.util.HashSet;
import java.util.Set;

@Service
public class UserServiceImpl implements UserService {

    @Autowired
    private UserRepository userRepository;
    @Autowired
    private RoleRepository roleRepository;
    @Autowired
    private BCryptPasswordEncoder bCryptPasswordEncoder;

    @Override
    public void save(User user) {
        try {
            Set<Role> roles = new HashSet<>();
            user.setPassword(bCryptPasswordEncoder.encode(user.getPassword()));
            for (Role r : user.getRoles()) {
                roleRepository.save(r);
                roles.add(r);
            }
            user.setRoles(roles);
            userRepository.save(user);
        }catch (Exception e) {
            throw new UsernameAlreadyExistsException("Username already exists");
        }
    }

    @Override
    public User findByUsername(String username) {
        return userRepository.findByUsername(username);
    }

    public Iterable<User> findAll(){
        return userRepository.findAll();
    }

    public void deleteUserByUsername(String username){
        userRepository.delete(findByUsername(username));
    }
}
