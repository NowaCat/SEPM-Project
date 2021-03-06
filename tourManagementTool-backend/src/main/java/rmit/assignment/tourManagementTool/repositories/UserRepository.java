package rmit.assignment.tourManagementTool.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import rmit.assignment.tourManagementTool.model.User;

import java.util.List;

@Repository
public interface UserRepository extends JpaRepository<User, Long> {
    User findByUsername(String username);

    User getById(Long id);

    @Override
    List<User> findAll();
}
