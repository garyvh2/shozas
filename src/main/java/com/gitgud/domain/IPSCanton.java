package com.gitgud.domain;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.fasterxml.jackson.annotation.JsonProperty;

@JsonIgnoreProperties(ignoreUnknown = true)
public class IPSCanton {

    private String _id;
    private String Slug;
    private int CVE;
    private int Ranking;
    private String Nombre;
    private int Poblacion;
    private String Provincia;
    private int __v;
    private int [] Similar;

    @JsonProperty("_id")
    public String get_id() {
        return _id;
    }

    public void set_id(String _id) {
        this._id = _id;
    }

    @JsonProperty("Slug")
    public String getSlug() {
        return Slug;
    }

    public void setSlug(String slug) {
        Slug = slug;
    }

    @JsonProperty("CVE")
    public int getCVE() {
        return CVE;
    }

    public void setCVE(int CVE) {
        this.CVE = CVE;
    }

    @JsonProperty("Ranking")
    public int getRanking() {
        return Ranking;
    }

    public void setRanking(int ranking) {
        Ranking = ranking;
    }

    @JsonProperty("Nombre")
    public String getNombre() {
        return Nombre;
    }

    public void setNombre(String nombre) {
        Nombre = nombre;
    }

    @JsonProperty("Poblacion")
    public int getPoblacion() {
        return Poblacion;
    }

    public void setPoblacion(int poblacion) {
        Poblacion = poblacion;
    }

    @JsonProperty("Provincia")
    public String getProvincia() {
        return Provincia;
    }

    public void setProvincia(String provincia) {
        Provincia = provincia;
    }

    @JsonProperty("__v")
    public int get__v() {
        return __v;
    }

    public void set__v(int __v) {
        this.__v = __v;
    }

    @JsonProperty("Similar")
    public int[] getSimilar() {
        return Similar;
    }

    public void setSimilar(int[] similar) {
        Similar = similar;
    }
}
