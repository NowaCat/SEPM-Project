package rmit.assignment.tourManagementTool.model;

import com.fasterxml.jackson.annotation.JsonFormat;

import javax.persistence.*;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.Size;
import java.sql.Time;
import java.util.Date;

@Entity
public class Tour {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    @NotBlank(message = "Tour ID is required")
    @Size(max=10, message = "Maximum size allowed is 10 characters")
    @Column(updatable = false, unique = true)
    private String customTourIdentifier;
    @NotBlank(message = "Tour name is required")
    private String tourName;
    @NotBlank(message = "Tour type is required")
    private String tourType;

    @JsonFormat(pattern = "yyyy-MM-dd")
    private Date tourDate;
    private Time minDuration;

    @JsonFormat(pattern = "yyyy-MM-dd")
    @Column(updatable = false)
    private Date created_At;
    @JsonFormat(pattern = "yyyy-MM-dd")
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
