package com.gitgud.domain;

public class Image {

    private String imageId;

    private boolean isPrimary;

    private boolean is360Image;

    private String source;

    public boolean isPrimary() {
        return isPrimary;
    }

    public void setIsPrimary(boolean primary) {
        isPrimary = primary;
    }

    public boolean isIs360Image() {
        return is360Image;
    }

    public void setIs360Image(boolean is360Image) {
        this.is360Image = is360Image;
    }

    public String getSource() {
        return source;
    }

    public void setSource(String source) {
        this.source = source;
    }

    public String getImageId() {
        return imageId;
    }

    public void setImageId(String imageId) {
        this.imageId = imageId;
    }
}
