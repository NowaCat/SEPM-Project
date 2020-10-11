package rmit.assignment.tourManagementTool.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import rmit.assignment.tourManagementTool.model.Role;

@Repository
public interface RoleRepository extends JpaRepository<Role, Long> {
}
