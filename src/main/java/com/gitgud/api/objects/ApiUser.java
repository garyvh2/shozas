package com.gitgud.api.objects;

public class ApiUser {

      private String name;
      private ApiImage image;
      private double stars;

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public ApiImage getImage() {
        return image;
    }

    public void setImage(ApiImage image) {
        this.image = image;
    }

    public double getStars() {
        return stars;
    }

    public void setStars(double stars) {
        this.stars = stars;
    }
}
