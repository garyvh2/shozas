package com.gitgud.service.recommendation;


import com.cloudinary.Api;
import com.gitgud.api.objects.ApiDetailView;
import com.gitgud.api.objects.ApiImage;
import com.gitgud.api.objects.ApiRealState;
import com.gitgud.api.objects.ApiUser;
import com.gitgud.domain.RealState;
import com.gitgud.domain.User;
import com.gitgud.repository.RealStateRepository;
import com.gitgud.repository.UserRepository;
import com.gitgud.service.RealStateService;
import com.gitgud.service.UserService;
import com.gitgud.service.util.RealStateUtils;
import com.recombee.api_client.RecombeeClient;
import com.recombee.api_client.api_requests.*;
import com.recombee.api_client.bindings.RecommendationResponse;
import com.recombee.api_client.exceptions.ApiException;
import org.springframework.core.env.Environment;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.*;
import java.util.stream.Collector;
import java.util.stream.Collectors;

@Service
public class RecommendationService {
    private RecombeeClient recombeeClient;
    private Environment environment;

    /**
     * Repositories
     * */
    private UserRepository userRepository;
    private RealStateRepository realStateRepository;




    public RecommendationService(Environment environment, UserRepository userRepository, RealStateRepository realStateRepository) {
        this.environment = environment;
        this.userRepository = userRepository;
        this.realStateRepository = realStateRepository;
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
        // garage
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

    /**
     * Add a new user
     * @param user
     * @throws ApiException
     */
    @Transactional
    public void addUser(User user) throws ApiException {
        this.recombeeClient.send(new AddUser(user.getId()));
    }

    /**
     * Sync Users
     */
    @Transactional
    public void syncUsers() {
        List<User> users = this.userRepository.findAll();
        if (!users.isEmpty()) {
            users.forEach(user -> {
                try {
                    addUser(user);
                } catch (ApiException e) {
                    e.printStackTrace();
                }
            });
        }
    }

    /**
     * Add a new item
     * @param realState
     * @throws ApiException
     */
    @Transactional
    public void addItem(RealState realState) throws ApiException {
        this.recombeeClient.send(new SetItemValues(realState.getId(), getRealStateProperties(realState))
            .setCascadeCreate(true));
    }

    /**
     * Sync items
     */
    @Transactional
    public void syncItems() {
        List<RealState> realStates = this.realStateRepository.findAll();
        if (!realStates.isEmpty()) {
            realStates.forEach(realState -> {
                try {
                    addItem(realState);
                } catch (ApiException e) {
                    e.printStackTrace();
                }
            });

        }
    }

    /**
     * Get the real state properties into a Map (required for recombee format)
     * @param realState
     * @return
     */
    public Map<String, Object> getRealStateProperties(RealState realState) {
        Map<String, Object> properties = new HashMap<>();
        /**
         * Set the fields
         */
        // Specifications
        // Baths
        properties.put("baths", realState.getBaths());
        // stories
        properties.put("rooms", realState.getRooms());
        // size
        properties.put("size", realState.getSize());
        // garage
        properties.put("garage", realState.getGarage());

        // Location
        // province
        properties.put("province", realState.getProvince());
        // city
        properties.put("city", realState.getCity());
        // district
        properties.put("district", realState.getDistrict());

        // Additional Details
        // price
        properties.put("price", realState.getPrice());
        // realStateType
        properties.put("realStateType", realState.getRealStateType());
        // schools
        properties.put("schools", realState.getSchools().toArray());

        // Amenities
        // hasElectricity
        properties.put("hasElectricity", realState.isHasElectricity());
        // hasHealthServices
        properties.put("hasHealthServices", realState.isHasHealthServices());
        // hasPool
        properties.put("hasPool", realState.isHasPool());
        // hasPrivateSecurity
        properties.put("hasPrivateSecurity", realState.isHasPrivateSecurity());
        // hasWater
        properties.put("hasWater", realState.isHasWater());
        // customAmenities
        properties.put("customAmenities", realState.getCustomAmenities().stream().map(amenity -> amenity.getName()).toArray());

        // Image recognition
        properties.put("images", realState.getImages().stream().map(image -> image.getSource()).toArray());

        return properties;
    }

    /**
     * Add favorite / bookmark
     */
    @Transactional
    public void addFavorite(User user, RealState realState) throws ApiException {
        Date date = new Date();
        this.recombeeClient.send(new AddBookmark(user.getId(), realState.getId())
            .setTimestamp(date)
            .setCascadeCreate(true)
        );
    }

    /**
     * Remove favorite / bookmark
     */
    @Transactional
    public void removeFavorite(User user, RealState realState) throws ApiException {
        this.recombeeClient.send(new DeleteBookmark(user.getId(), realState.getId()));
    }

    /**
     * Sync Favoritesxxx
     */
    @Transactional
    public void syncFavorites() {
        List<User> users = this.userRepository.findAll();
        if (!users.isEmpty()) {
            users.forEach(user -> {
                user.getFavorites().forEach(realState -> {
                    try {
                        addFavorite(user, realState);;
                    } catch (ApiException e) {
                        e.printStackTrace();
                    }
                });
            });
        }
    }

    /**
     * Sync All
     */
    @Transactional
    public void syncAll() {
        syncItems();
        syncUsers();
        syncFavorites();
    }


    /**
     * Reset
     */
    @Transactional
    public void reset() throws ApiException {
        this.recombeeClient.send(new ResetDatabase());
    }

    /**
     * Recommend
     */
    @Transactional(readOnly = true)
    public HashSet<ApiRealState> userRecommendations(String userId, long count) throws ApiException {
        RecommendationResponse recommendations = this.recombeeClient.send(new RecommendItemsToUser(userId, count));

        Iterable<String> ids = Arrays.asList(recommendations.getIds());
        Set<RealState> items = new HashSet<>();
        this.realStateRepository.findAllById(ids).forEach(items::add);
        return items.stream().map(favorite -> RealStateUtils.toApiRealState(favorite))
            .collect(Collectors.toCollection(HashSet::new));
    }

    /**
     * Add view
     */
    @Transactional
    public void addView(ApiDetailView apiDetailView) throws ApiException {
        this.recombeeClient.send(new AddDetailView(apiDetailView.getUserId(), apiDetailView.getItemId())
            .setTimestamp(apiDetailView.getInTime())
            .setDuration(apiDetailView.getDuration())
        );
    }
}
