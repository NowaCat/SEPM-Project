package rmit.assignment.tourManagementTool.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import rmit.assignment.tourManagementTool.model.TourType;

import java.util.List;

public interface TourTypeRepository extends JpaRepository<TourType, Long> {
    TourType findByLabel(String locationId);

    @Override
    List<TourType> findAll();
}
