package rmit.assignment.tourManagementTool.repositories;

import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;
import rmit.assignment.tourManagementTool.model.Tour;

@Repository
public interface TourRepository extends CrudRepository<Tour, Long> {

    Tour findByCustomTourIdentifier(String tourId);

    @Override
    Iterable<Tour> findAll();
}
