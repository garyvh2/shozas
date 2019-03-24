package com.gitgud.domain;

import dev.morphia.annotations.Embedded;
import dev.morphia.annotations.Entity;
import dev.morphia.annotations.Reference;
import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.DBRef;
import org.springframework.data.mongodb.core.mapping.Document;
import org.springframework.data.mongodb.core.mapping.Field;

import java.time.Instant;
import java.util.Date;
import java.util.HashSet;
import java.util.Objects;

@Document
@Entity("realState")
public class RealState {

    @Id
    @dev.morphia.annotations.Id
    private String id;

    private double latitude;

    private double longitude;

    private String province;

    private String city;

    private String district;

    private int price;

    private String description;

    private int stories;

    private int baths;

    private int rooms;

    private double size;

    private int garage;

    private int postalCode;

    private String realStateType;

    private boolean hasPool;

    private boolean hasWater;

    private boolean hasElectricity;

    private String title;

    private boolean hasPrivateSecurity;

    private boolean hasHealthServices;

    private boolean isSold;

    private Instant dateCreated;

    @Field
    @Embedded
    private HashSet<Image> images  = new HashSet<>();;

    @Field
    @Embedded
    private HashSet<String> schools = new HashSet<>();;

    @Field
    @Embedded
    private HashSet<Services> services = new HashSet<>();;

    @Field
    @Embedded
    private HashSet<CustomAmenity> customAmenities = new HashSet<>();;

    @DBRef
    @Field
    @Reference
    private User owner;

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public double getLatitude() {
        return latitude;
    }

    public void setLatitude(double latitude) {
        this.latitude = latitude;
    }

    public double getLongitude() {
        return longitude;
    }

    public void setLongitude(double longitude) {
        this.longitude = longitude;
    }

    public String getProvince() {
        return province;
    }

    public void setProvince(String province) {
        this.province = province;
    }

    public String getCity() {
        return city;
    }

    public void setCity(String city) {
        this.city = city;
    }

    public String getDistrict() {
        return district;
    }

    public void setDistrict(String district) {
        this.district = district;
    }

    public int getPrice() {
        return price;
    }

    public void setPrice(int price) {
        this.price = price;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public int getStories() {
        return stories;
    }

    public void setStories(int stories) {
        this.stories = stories;
    }

    public int getBaths() {
        return baths;
    }

    public void setBaths(int baths) {
        this.baths = baths;
    }

    public int getRooms() {
        return rooms;
    }

    public void setRooms(int rooms) {
        this.rooms = rooms;
    }

    public double getSize() {
        return size;
    }

    public void setSize(double size) {
        this.size = size;
    }

    public int getGarage() {
        return garage;
    }

    public void setGarage(int garage) {
        this.garage = garage;
    }

    public int getPostalCode() {
        return postalCode;
    }

    public void setPostalCode(int postalCode) {
        this.postalCode = postalCode;
    }

    public String getRealStateType() {
        return realStateType;
    }

    public void setRealStateType(String realStateType) {
        this.realStateType = realStateType;
    }

    public boolean isHasPool() {
        return hasPool;
    }

    public void setHasPool(boolean hasPool) {
        this.hasPool = hasPool;
    }

    public boolean isHasWater() {
        return hasWater;
    }

    public void setHasWater(boolean hasWater) {
        this.hasWater = hasWater;
    }

    public boolean isHasElectricity() {
        return hasElectricity;
    }

    public void setHasElectricity(boolean hasElectricity) {
        this.hasElectricity = hasElectricity;
    }

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public boolean isHasPrivateSecurity() {
        return hasPrivateSecurity;
    }

    public void setHasPrivateSecurity(boolean hasPrivateSecurity) {
        this.hasPrivateSecurity = hasPrivateSecurity;
    }

    public boolean isHasHealthServices() {
        return hasHealthServices;
    }

    public void setHasHealthServices(boolean hasHealthServices) {
        this.hasHealthServices = hasHealthServices;
    }

    public boolean isSold() {
        return isSold;
    }

    public void setSold(boolean sold) {
        isSold = sold;
    }

    public HashSet<Image> getImages() {
        return images;
    }

    public void setImages(HashSet<Image> images) {
        this.images = images;
    }

    public HashSet<String> getSchools() {
        return schools;
    }

    public void setSchools(HashSet<String> schools) {
        this.schools = schools;
    }

    public HashSet<Services> getServices() {
        return services;
    }

    public void setServices(HashSet<Services> services) {
        this.services = services;
    }

    public HashSet<CustomAmenity> getCustomAmenities() {
        return customAmenities;
    }

    public void setCustomAmenities(HashSet<CustomAmenity> customAmenities) {
        this.customAmenities = customAmenities;
    }

    public User getOwner() {
        return owner;
    }

    public void setOwner(User owner) {
        this.owner = owner;
    }

    public Instant getDateCreated() {
        return dateCreated;
    }

    public void setDateCreated(Instant dateCreated) {
        this.dateCreated = dateCreated;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (o == null || getClass() != o.getClass()) {
            return false;
        }

        RealState realState = (RealState) o;
        return !(realState.getId() == null || getId() == null) && Objects.equals(getId(), realState.getId());
    }

    @Override
    public int hashCode() {
        return id.hashCode();
    }

}
