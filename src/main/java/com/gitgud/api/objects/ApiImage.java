package com.gitgud.api.objects;

public class ApiImage {
    private boolean isPrimary;

    private boolean is360Image;

    private String source;

    public boolean isPrimary() {
        return isPrimary;
    }

    public void setPrimary(boolean primary) {
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
}
