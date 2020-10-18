package rmit.assignment.tourManagementTool.services;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import rmit.assignment.tourManagementTool.model.TourType;
import rmit.assignment.tourManagementTool.repositories.TourTypeRepository;

@Service
public class TourTypeService {
    @Autowired
    private TourTypeRepository tourTypeRepository;

    public TourType saveOrUpdateTourType(TourType tourType) {
        try {
            return tourTypeRepository.save(tourType);
        } catch (Exception e) {
            System.out.println(e.getMessage());
            System.out.println(tourType.toString());
            return null;
        }
    }

    public TourType findTourTypeByLabel(String label) {
        return tourTypeRepository.findByLabel(label);
    }

    public Iterable<TourType> findAllTourTypes() {return tourTypeRepository.findAll(); }

    public void deleteTourTypeByLabel(String label) {
        tourTypeRepository.delete(findTourTypeByLabel(label));
    }
}
