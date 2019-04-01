package com.gitgud.api.objects;

public class ApiRealState{
    private String id;
    private String title;
    private String addr;
    private ApiImage image;
    private int beds;
    private int baths;
    private int gar;
    private double size;
    private long price;
    private ApiUser user;

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public String getAddr() {
        return addr;
    }

    public void setAddr(String addr) {
        this.addr = addr;
    }

    public ApiImage getImage() {
        return image;
    }

    public void setImage(ApiImage image) {
        this.image = image;
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

    public int getGar() {
        return gar;
    }

    public void setGar(int gar) {
        this.gar = gar;
    }

    public double getSize() {
        return size;
    }

    public void setSize(double size) {
        this.size = size;
    }

    public long getPrice() {
        return price;
    }

    public void setPrice(long price) {
        this.price = price;
    }

    public ApiUser getUser() {
        return user;
    }

    public void setUser(ApiUser user) {
        this.user = user;
    }
}
