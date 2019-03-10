package com.gitgud.domain;

public class ApiSearchParams {

    private String province;
    private String city;
    private String district;
    private int prLow;
    private int prHigh;
    private int beds;
    private int baths;
    private int garages;
    private int stories;
    private int zip;
    private String user;
    private String similarTo;

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

    public int getPrLow() {
        return prLow;
    }

    public void setPrLow(int prLow) {
        this.prLow = prLow;
    }

    public int getPrHigh() {
        return prHigh;
    }

    public void setPrHigh(int prHigh) {
        this.prHigh = prHigh;
    }

    public int getBeds() {
        return beds;
    }

    public void setBeds(int beds) {
        this.beds = beds;
    }

    public int getBaths() {
        return baths;
    }

    public void setBaths(int baths) {
        this.baths = baths;
    }

    public int getGarages() {
        return garages;
    }

    public void setGarages(int garages) {
        this.garages = garages;
    }

    public int getStories() {
        return stories;
    }

    public void setStories(int stories) {
        this.stories = stories;
    }

    public int getZip() {
        return zip;
    }

    public void setZip(int zip) {
        this.zip = zip;
    }

    public String getUser() {
        return user;
    }

    public void setUser(String user) {
        this.user = user;
    }

    public String getSimilarTo() {
        return similarTo;
    }

    public void setSimilarTo(String similarTo) {
        this.similarTo = similarTo;
    }
}
