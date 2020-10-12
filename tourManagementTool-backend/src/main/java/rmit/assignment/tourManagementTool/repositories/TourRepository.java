package rmit.assignment.tourManagementTool.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import rmit.assignment.tourManagementTool.model.Tour;

import java.util.List;

@Repository
public interface TourRepository extends JpaRepository<Tour, Long> {

    Tour findByTourIdentifier(String tourId);

    @Override
    List<Tour> findAll();

    Iterable<Tour> findAllByTourCreator(String username);
}
