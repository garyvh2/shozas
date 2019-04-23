package com.gitgud.domain;

import dev.morphia.annotations.Reference;
import dev.morphia.annotations.Transient;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.DBRef;
import org.springframework.data.mongodb.core.mapping.Document;
import org.springframework.data.mongodb.core.mapping.Field;

@Document
public class Review {

    @Id
    @dev.morphia.annotations.Id
    private String id;

    @DBRef
    @Field
    @Reference
    private User userShopper;

    private double rating;

    private String comment;

    private boolean isSold;

    private boolean isRented;

    private boolean isUserUnKnown;

    @DBRef
    @Field
    @Reference
    private RealState realState;

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public User getUserShopper() {
        return userShopper;
    }

    public void setUserShopper(User userShopper) {
        this.userShopper = userShopper;
    }

    public double getRating() {
        return rating;
    }

    public void setRating(double rating) {
        this.rating = rating;
    }

    public String getComment() {
        return comment;
    }

    public void setComment(String comment) {
        this.comment = comment;
    }

    public RealState getRealState() {
        return realState;
    }

    public void setRealState(RealState realState) {
        this.realState = realState;
    }

    public boolean isSold() {
        return isSold;
    }

    public void setSold(boolean sold) {
        isSold = sold;
    }

    public boolean isRented() {
        return isRented;
    }

    public void setRented(boolean rented) {
        isRented = rented;
    }

    public boolean isUserUnKnown() {
        return isUserUnKnown;
    }

    public void setUserUnKnown(boolean userUnKnown) {
        isUserUnKnown = userUnKnown;
    }
}
