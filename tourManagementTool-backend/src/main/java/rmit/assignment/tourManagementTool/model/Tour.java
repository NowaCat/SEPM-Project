package rmit.assignment.tourManagementTool.model;

import com.fasterxml.jackson.annotation.JsonFormat;
import com.fasterxml.jackson.annotation.JsonIgnore;

import javax.persistence.*;
import javax.swing.text.MutableAttributeSet;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.Size;
import java.sql.Time;
import java.util.*;

@Entity
public class Tour {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    @NotBlank(message = "Tour ID is required")
    @Size(max=10, message = "Maximum size allowed is 10 characters")
    @Column(updatable = false, unique = true)
    private String tourIdentifier;
    @NotBlank(message = "Tour name is required")
    private String tourName;
//    @NotBlank(message = "Tour type is required")
//    private String tourType;

    @JsonFormat(pattern = "yyyy-MM-dd")
    private Date tourDate;
    private Time minDuration;

    @JsonFormat(pattern = "yyyy-MM-dd")
    @Column(updatable = false)
    private Date created_At;
    @JsonFormat(pattern = "yyyy-MM-dd")
    private Date updated_At;

    private ArrayList<String> allAllocations = new ArrayList<>();

    @ManyToMany(cascade = CascadeType.MERGE)
    @JoinTable
    private List<Location> locations = new ArrayList<>();

    @ManyToMany(cascade = CascadeType.MERGE)
    @JoinTable
    private List<TourType> tourTypes = new ArrayList<>();

    @ManyToOne(fetch = FetchType.LAZY)
    @JsonIgnore
    private User user;

    private String tourCreator;

    public Tour() {
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getTourIdentifier() {
        return tourIdentifier;
    }

    public void setTourIdentifier(String tourIdentifier) {
        this.tourIdentifier = tourIdentifier;
    }

    public String getTourName() {
        return tourName;
    }

    public void setTourName(String tourName) {
        this.tourName = tourName;
    }

//    public String getTourType() {
//        return tourType;
//    }
//
//    public void setTourType(String tourType) {
//        this.tourType = tourType;
//    }

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

    public List<Location> getLocations() {
        return locations;
    }

    public void setLocations(List<Location> locations) {
        this.locations = locations;
    }

    public void addLocation(Location location) {
        this.getLocations().add(location);
        location.getTours().add(this);
    }

    public void removeLocation(Location location) {
        this.getLocations().remove(location);
        location.getTours().remove(this);
    }

    public User getUser() {
        return user;
    }

    public void setUser(User user) {
        this.user = user;
    }

    public String getTourCreator() {
        return tourCreator;
    }

    public void setTourCreator(String tourCreator) {
        this.tourCreator = tourCreator;
    }

    public ArrayList<String> getAllAllocations() {
        return allAllocations;
    }

    public void setAllAllocations(ArrayList<String> allAllocations) {
        this.allAllocations = allAllocations;
    }

    @PrePersist
    protected void onCreate(){
        this.created_At = new Date();
    }

    @PreUpdate
    protected void onUpdate(){
        this.updated_At = new Date();
    }

    public List<TourType> getTourTypes() {
        return tourTypes;
    }

    public void setTourTypes(List<TourType> tourTypes) {
        this.tourTypes = tourTypes;
    }
}
