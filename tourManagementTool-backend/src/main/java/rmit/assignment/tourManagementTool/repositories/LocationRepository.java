package rmit.assignment.tourManagementTool.repositories;

import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;
import rmit.assignment.tourManagementTool.model.Location;

import java.util.Optional;

@Repository
public interface LocationRepository extends CrudRepository<Location, Long> {
    Location findByLocationIdentifier(String locationId);

    @Override
    Iterable<Location> findAll();
}
