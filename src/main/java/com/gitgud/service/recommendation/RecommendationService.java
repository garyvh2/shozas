package com.gitgud.service.recommendation;


import com.recombee.api_client.RecombeeClient;
import com.recombee.api_client.api_requests.AddItemProperty;
import com.recombee.api_client.exceptions.ApiException;
import org.springframework.core.env.Environment;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
public class RecommendationService {
    private RecombeeClient recombeeClient;
    private Environment environment;


    public RecommendationService(Environment environment) {
        this.environment = environment;
        this.recombeeClient = new RecombeeClient(this.environment.getProperty("recombee-db", "shozas-develop"),this.environment.getProperty("recombee-api", "LYXCo8hSVwhuo7vEMqgwFyMQkPTH2JsRsH4A2ui1pyWLov9Nrc19ZmjmfW1U2WaB"));
    }

    @Transactional
    public void configureItemFields() throws ApiException {
        // Specifications
        // Baths
        this.recombeeClient.send(new AddItemProperty("baths", "int"));
        // Rooms
        this.recombeeClient.send(new AddItemProperty("rooms", "int"));
        // stories
        this.recombeeClient.send(new AddItemProperty("size", "double"));
        // size
        this.recombeeClient.send(new AddItemProperty("garage", "int"));

        // Location
        // province
        this.recombeeClient.send(new AddItemProperty("province", "string"));
        // city
        this.recombeeClient.send(new AddItemProperty("city", "string"));
        // district
        this.recombeeClient.send(new AddItemProperty("district", "string"));

        // Additional Details
        // price
        this.recombeeClient.send(new AddItemProperty("price", "double"));
        // realStateType
        this.recombeeClient.send(new AddItemProperty("realStateType", "string"));
        // schools
        this.recombeeClient.send(new AddItemProperty("schools", "set"));


        // Amenities
        // hasElectricity
        this.recombeeClient.send(new AddItemProperty("hasElectricity", "boolean"));
        // hasHealthServices
        this.recombeeClient.send(new AddItemProperty("hasHealthServices", "boolean"));
        // hasPool
        this.recombeeClient.send(new AddItemProperty("hasPool", "boolean"));
        // hasPrivateSecurity
        this.recombeeClient.send(new AddItemProperty("hasPrivateSecurity", "boolean"));
        // hasWater
        this.recombeeClient.send(new AddItemProperty("hasWater", "boolean"));
        // customAmenities
        this.recombeeClient.send(new AddItemProperty("customAmenities", "set"));

        // Image recognition
        this.recombeeClient.send(new AddItemProperty("images", "imageList"));
    }



}
