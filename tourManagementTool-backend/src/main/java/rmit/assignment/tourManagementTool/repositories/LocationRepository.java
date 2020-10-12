package rmit.assignment.tourManagementTool.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import rmit.assignment.tourManagementTool.model.Location;

import java.util.List;

@Repository
public interface LocationRepository extends JpaRepository<Location, Long> {
    Location findByLocationIdentifier(String locationId);

    @Override
    List<Location> findAll();
}
