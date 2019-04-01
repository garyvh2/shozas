package com.gitgud.api.objects;

import java.util.List;

public class ApiSearchResults {

    private long maxPrice;
    private long minPrice;
    private double maxSize;
    private double minSize;
    private List<ApiRealState> elements;

    public long getMaxPrice() {
        return maxPrice;
    }

    public void setMaxPrice(long maxPrice) {
        this.maxPrice = maxPrice;
    }

    public long getMinPrice() {
        return minPrice;
    }

    public void setMinPrice(long minPrice) {
        this.minPrice = minPrice;
    }

    public double getMaxSize() {
        return maxSize;
    }

    public void setMaxSize(double maxSize) {
        this.maxSize = maxSize;
    }

    public double getMinSize() {
        return minSize;
    }

    public void setMinSize(double minSize) {
        this.minSize = minSize;
    }

    public List<ApiRealState> getElements() {
        return elements;
    }

    public void setElements(List<ApiRealState> elements) {
        this.elements = elements;
    }
}
