package rmit.assignment.tourManagementTool.model;

import javax.persistence.*;
import java.sql.Time;
import java.util.Date;

@Entity
public class Tour {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String customTourIdentifier;
    private String tourName;
    private String tourType;
    private Date tourDate;
    private Time minDuration;

    private Date created_At;
    private Date updated_At;

    public Tour() {
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getCustomTourIdentifier() {
        return customTourIdentifier;
    }

    public void setCustomTourIdentifier(String customTourIdentifier) {
        this.customTourIdentifier = customTourIdentifier;
    }

    public String getTourName() {
        return tourName;
    }

    public void setTourName(String tourName) {
        this.tourName = tourName;
    }

    public String getTourType() {
        return tourType;
    }

    public void setTourType(String tourType) {
        this.tourType = tourType;
    }

    public Date getTourDate() {
        return tourDate;
    }

    public void setTourDate(Date tourDate) {
        this.tourDate = tourDate;
    }

    public Time getMinDuration() {
        return minDuration;
    }

    public void setMinDuration(Time minDuration) {
        this.minDuration = minDuration;
    }

    public Date getCreated_At() {
        return created_At;
    }

    public void setCreated_At(Date created_At) {
        this.created_At = created_At;
    }

    public Date getUpdated_At() {
        return updated_At;
    }

    public void setUpdated_At(Date updated_At) {
        this.updated_At = updated_At;
    }

    @PrePersist
    protected void onCreate(){
        this.created_At = new Date();
    }

    @PreUpdate
    protected void onUpdate(){
        this.updated_At = new Date();
    }

}
