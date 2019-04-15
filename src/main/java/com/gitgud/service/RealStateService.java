package com.gitgud.service;

import com.cloudinary.Cloudinary;
import com.cloudinary.utils.ObjectUtils;
import com.gitgud.api.objects.*;
import com.gitgud.domain.Image;
import com.gitgud.domain.RealState;
import com.gitgud.domain.User;
import com.gitgud.repository.RealStateRepository;
import com.gitgud.repository.UserRepository;
import com.gitgud.service.recommendation.RecommendationService;
import com.gitgud.service.util.CloudinaryUtil;
import com.gitgud.service.util.RealStateUtils;
import com.gitgud.service.util.ResultType;
import com.mongodb.DBRef;
import com.recombee.api_client.exceptions.ApiException;
import dev.morphia.Datastore;
import dev.morphia.query.Criteria;
import dev.morphia.query.FindOptions;
import dev.morphia.query.Query;
import org.bson.types.ObjectId;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.mongodb.core.MongoTemplate;
import org.springframework.stereotype.Service;

import java.io.IOException;
import java.time.Instant;
import java.util.*;
import java.util.stream.Collectors;

@Service
public class RealStateService {

    private RealStateRepository realStateRepository;
    private UserRepository userRepository;
    private MongoTemplate mongoTemplate;
    private UserService userService;
    private RecommendationService recommendationService;

    @Autowired
    private Datastore datastore;

    public RealStateService(RealStateRepository realStateRepository, UserRepository userRepository,
            MongoTemplate mongoTemplate, UserService userService, RecommendationService recommendationService) {
        this.realStateRepository = realStateRepository;
        this.userRepository = userRepository;
        this.mongoTemplate = mongoTemplate;
        this.userService = userService;
        this.recommendationService = recommendationService;
    }

    public RealState save(RealState realState) throws Exception, IOException {
        Optional<User> userOwner = userService.getUserByEmail(realState.getOwner().getLogin());
        if (!userOwner.isPresent()) {
            throw new Exception("Usuario no existe");
        }
        String realStateTitle = realState.getRealStateType().equals("H") ? "Casa en "
                : realState.getRealStateType().equals("D") ? "Departamento en " : "Lote en ";
        realStateTitle = realStateTitle.concat(realState.getProvince() + " ").concat(realState.getDistrict());
        realState.setTitle(realStateTitle);

        if (realState.getImages() != null && !realState.getImages().isEmpty()) {
            Cloudinary cloudinaryUploader = CloudinaryUtil.getCloudinaryInstance();
            realState.getImages().forEach(i -> {
                String source = "";
                String imageId = "";
                try {
                    Map uploadResult = cloudinaryUploader.uploader().upload(i.getSource(), ObjectUtils.emptyMap());
                    source = uploadResult.get("url").toString();
                    imageId = uploadResult.get("public_id").toString();
                } catch (IOException e) {
                    source = "http://res.cloudinary.com/ucenfotec19/image/upload/v1553328159/dxtdpxwxyhav96tnklzc.png";
                    imageId = "0";
                }
                i.setImageId(imageId);
                i.setSource(source);
            });
        }

        if (realState.getImages() == null || realState.getImages().isEmpty()) {
            realState.setImages(getDefaults());
        }

        User user = userOwner.get();
        user.setFavorites(null);
        realState.setDateCreated(Instant.now());
        realState.setOwner(user);

        RealState savedRealState = realStateRepository.save(realState);
        this.recommendationService.addItem(savedRealState);
        return savedRealState;
    }

    private HashSet<Image> getDefaults() {
        HashSet<Image> result = new HashSet<Image>();

        for (int i = 0; i < 3; i++) {
            Image defaultImage = new Image();
            defaultImage.setSource(
                    "http://res.cloudinary.com/ucenfotec19/image/upload/v1553328159/dxtdpxwxyhav96tnklzc.png");
            defaultImage.setImageId("0");

            if (i == 0)
                defaultImage.setIsPrimary(true);

            result.add(defaultImage);
        }

        return result;
    }

    public List<RealState> getRealStateElements(ResultType resultType, ApiSearchParams parameters,
            ApiSearchResults results) throws Exception {

        Query<RealState> realStates = datastore.createQuery(RealState.class);

        int pageSize = parameters.getPageSize() != 0 ? parameters.getPageSize() : 16;
        int page = parameters.getPage() == 1 ? 0 : pageSize * (parameters.getPage() - 1);

        switch (resultType) {
        case Lots:
            realStates = realStates.field("realStateType").equal("L");
            break;
        case Homes:
            realStates = realStates.field("realStateType").equal("H");
            break;
        case Departments:
            realStates = realStates.field("realStateType").equal("D");
            break;
        }

        realStates.and(realStates.criteria("isSold").equal(parameters.isSold()));

        if (parameters.isRented())
            realStates.and(realStates.criteria("isRented").equal(parameters.isRented()));

        if(parameters.isSimilarTo()){
            List<RealState> realStateList = getSimilarElements(realStates, parameters);
            results.setAveragePrice(realStateList.stream().mapToLong(RealState::getPrice).sum() / realStateList.size());
            return realStateList.stream().limit(10).collect(Collectors.toList());
        }

        if (parameters.getProvince() != null && !parameters.getProvince().isEmpty() && parameters.getCity() != null
                && !parameters.getCity().isEmpty() && parameters.getDistrict() != null
                && !parameters.getDistrict().isEmpty()) {
            realStates.and(realStates.criteria("province").endsWithIgnoreCase(parameters.getProvince()),
                    realStates.criteria("city").endsWithIgnoreCase(parameters.getCity()),
                    realStates.criteria("district").endsWithIgnoreCase(parameters.getDistrict()));
        } else if (parameters.getProvince() != null && !parameters.getProvince().isEmpty()
                && parameters.getCity() != null && !parameters.getCity().isEmpty()) {
            realStates.and(realStates.criteria("province").endsWithIgnoreCase(parameters.getProvince()),
                    realStates.criteria("city").endsWithIgnoreCase(parameters.getCity()));
        } else if (parameters.getProvince() != null && !parameters.getProvince().isEmpty()) {
            realStates.and(realStates.criteria("province").endsWithIgnoreCase(parameters.getProvince()));
        }

        if (resultType != ResultType.Lots) {

            if (parameters.getBaths() != 0) {
                realStates.and(realStates.criteria("baths").greaterThanOrEq(parameters.getBaths()));
            }

            if (parameters.getBeds() != 0) {
                realStates.and(realStates.criteria("rooms").greaterThanOrEq(parameters.getBeds()));
            }

            if (parameters.getGarages() != 0) {
                realStates.and(realStates.criteria("garage").greaterThanOrEq(parameters.getGarages()));
            }

            if (parameters.getStories() != 0) {
                realStates.and(realStates.criteria("stories").greaterThanOrEq(parameters.getStories()));
            }
        }

        if (parameters.getZip() != 0) {
            realStates.and(realStates.criteria("postalCode").equal(parameters.getZip()));
        }

        if (parameters.getPrLow() != 0 && parameters.getPrHigh() != 0) {
            realStates.field("price").greaterThan(parameters.getPrLow()).field("price")
                    .lessThanOrEq(parameters.getPrHigh());
        }

        if (parameters.getSizeLow() != 0 && parameters.getSizeHigh() != 0) {
            realStates.field("size").greaterThan(parameters.getSizeLow()).field("size")
                    .lessThanOrEq(parameters.getSizeHigh());
        }

        if (parameters.getUser() != null && !parameters.getUser().isEmpty()) {
            Optional<User> user = userService.getUserByEmail(parameters.getUser());
            if (!user.isPresent())
                throw new Exception("El usuario no existe");
            User u = user.get();
            realStates.disableValidation().field("owner")
                    .equal(new DBRef("jhi_user", new ObjectId(user.get().getId())));
        }

        if (parameters.getRaiting() != 0) {
            List<User> raitingUsers = userService.getUsersByRaiting(parameters.getRaiting());
            if (!raitingUsers.isEmpty()) {
                Criteria[] criterias = new Criteria[raitingUsers.size()];
                int count = 0;
                for (User userToFind : raitingUsers) {
                    criterias[count] = (realStates.criteria("owner")
                            .equal(new DBRef("jhi_user", new ObjectId(userToFind.getId()))));
                    count++;
                }
                realStates.disableValidation().or(criterias);
            }
        }

        if (results != null) {
            try {

                Query<RealState> maxPrice = realStates;
                results.setMaxPrice(maxPrice.order("-price").asList(new FindOptions().limit(1)).get(0).getPrice());
                Query<RealState> minPrice = realStates;
                results.setMinPrice(minPrice.order("price").asList(new FindOptions().limit(1)).get(0).getPrice());

                Query<RealState> minSize = realStates;
                results.setMinSize(minSize.order("size").asList(new FindOptions().limit(1)).get(0).getSize());
                Query<RealState> maxSize = realStates;
                results.setMaxSize(maxSize.order("-size").asList(new FindOptions().limit(1)).get(0).getSize());
            } catch (Exception e) {
                return new ArrayList<RealState>();
            }
        }

        return realStates.asList(new FindOptions().skip(page).limit(pageSize));
    }

    private List<RealState> getSimilarElements(Query<RealState> realStateQuery, ApiSearchParams searchParams){
        Criteria[] criterias = new Criteria[5];

        criterias[0] = realStateQuery.criteria("baths").equal(searchParams.getBaths());
        criterias[1] = realStateQuery.criteria("rooms").equal(searchParams.getBeds());
        criterias[2] = realStateQuery.criteria("size").greaterThanOrEq(searchParams.getSizeLow());
        criterias[3] = realStateQuery.criteria("garage").equal(searchParams.getGarages());
        criterias[4] = realStateQuery.criteria("stories").equal(searchParams.getStories());
        realStateQuery.or(criterias);

        return realStateQuery.asList();
    }

    public RealState getRealStateDetailElement(String id) throws Exception {
        Optional<RealState> result = realStateRepository.findById(id);
        if (!result.isPresent())
            throw new Exception("El elemento solicitado ya no existe");
        return result.get();
    }

    public RealState update(RealState updateElement) throws Exception {
        Optional<RealState> elementToUpdate = realStateRepository.findById(updateElement.getId());
        if (!elementToUpdate.isPresent())
            throw new Exception("El elemento a actualizar no existe");

        RealState elementInDB = elementToUpdate.get();
        elementInDB.getOwner().setFavorites(null);

        if (updateElement.getProvince() != null || updateElement.getDistrict() != null) {
            String realStateTitle = updateElement.getRealStateType().equals("H") ? "Casa en "
                    : updateElement.getRealStateType().equals("D") ? "Departamento en " : "Lote en ";
            realStateTitle = realStateTitle.concat(updateElement.getProvince() + " ")
                    .concat(updateElement.getDistrict());
            elementInDB.setTitle(realStateTitle);
        }

        elementInDB.setProvince(
                updateElement.getProvince() == null ? elementInDB.getProvince() : updateElement.getProvince());
        elementInDB.setCity(updateElement.getCity() == null ? elementInDB.getCity() : updateElement.getCity());
        elementInDB.setDistrict(
                updateElement.getDistrict() == null ? elementInDB.getDistrict() : updateElement.getDistrict());
        elementInDB.setDescription(
                updateElement.getDescription() == null ? elementInDB.getDescription() : updateElement.getDescription());
        elementInDB.setBaths(updateElement.getBaths() == 0 ? elementInDB.getBaths() : updateElement.getBaths());
        elementInDB.setRooms(updateElement.getRooms() == 0 ? elementInDB.getRooms() : updateElement.getRooms());
        elementInDB.setPrice(updateElement.getPrice() == 0 ? elementInDB.getPrice() : updateElement.getPrice());
        elementInDB.setGarage(updateElement.getGarage() == 0 ? elementInDB.getGarage() : updateElement.getGarage());
        elementInDB.setHasElectricity(updateElement.isHasElectricity());
        elementInDB.setHasHealthServices(updateElement.isHasHealthServices());
        elementInDB.setHasPool(updateElement.isHasPool());
        elementInDB.setHasPrivateSecurity(updateElement.isHasPrivateSecurity());
        elementInDB.setHasWater(updateElement.isHasWater());
        elementInDB.setLatitude(
                updateElement.getLatitude() == 0.0d ? elementInDB.getLatitude() : updateElement.getLatitude());
        elementInDB.setLongitude(
                updateElement.getLongitude() == 0.0d ? elementInDB.getLongitude() : updateElement.getLongitude());
        elementInDB.setPostalCode(
                updateElement.getPostalCode() == 0 ? elementInDB.getPostalCode() : updateElement.getPostalCode());
        elementInDB.setRealStateType(updateElement.getRealStateType() == null ? elementInDB.getRealStateType()
                : updateElement.getRealStateType());
        elementInDB.setSize(updateElement.getSize() == 0.0d ? elementInDB.getSize() : updateElement.getSize());
        elementInDB.setStories(updateElement.getStories() == 0 ? elementInDB.getStories() : updateElement.getStories());
        elementInDB.setSold(updateElement.isSold());
        elementInDB.setServices(
                updateElement.getServices() == null ? elementInDB.getServices() : updateElement.getServices());
        elementInDB
                .setSchools(updateElement.getSchools() == null ? elementInDB.getSchools() : updateElement.getSchools());
        elementInDB.setCustomAmenities(updateElement.getCustomAmenities() == null ? elementInDB.getCustomAmenities()
                : updateElement.getCustomAmenities());

        elementInDB.setImages(updateElement.getImages() == null || updateElement.getImages().isEmpty() ? elementInDB.getImages()
                : getUpdatedImage(updateElement.getImages(), elementInDB.getImages()));
        elementInDB.setRented(updateElement.isRented());

        RealState savedRealState = realStateRepository.save(elementInDB);
        this.recommendationService.addItem(savedRealState);
        return savedRealState;
    }

    private HashSet<Image> getUpdatedImage(HashSet<Image> updatedImages, HashSet<Image> imagesOnDb) {
        Cloudinary cloudinaryUploader = CloudinaryUtil.getCloudinaryInstance();
        updatedImages.forEach(i ->{
            imagesOnDb.forEach(im -> {
                if(i.getImageId().equalsIgnoreCase(im.getImageId())){
                    if (!i.getSource().equalsIgnoreCase(im.getSource())){
                        try {
                            if (!i.getImageId().equals("0"))
                                cloudinaryUploader.uploader().destroy(i.getImageId(), ObjectUtils.emptyMap());

                            Map uploadResult = cloudinaryUploader.uploader().upload(i.getSource(), ObjectUtils.emptyMap());
                            i.setImageId(uploadResult.get("public_id").toString());
                            i.setSource(uploadResult.get("url").toString());
                        } catch (IOException e) {
                            i.setSource(
                                "http://res.cloudinary.com/ucenfotec19/image/upload/v1553328159/dxtdpxwxyhav96tnklzc.png");
                            i.setImageId("0");
                        }
                    }
                }
            });
        });

        return updatedImages;
    }

    public User addFavorite(ApiFavorite favorite) throws ApiException {
        // Check if realState or user are present
        Optional<RealState> presentRealState = realStateRepository.findById(favorite.getRealStateId());
        Optional<User> presentUser = userRepository.findById(favorite.getUserId());

        if (presentRealState.isPresent() && presentUser.isPresent()) {
            // Get the realState and user object
            RealState realState = presentRealState.get();
            realState.setOwner(null);
            User user = presentUser.get();

            // Add the favorite
            user.addFavorite(realState);

            User userSaved = userRepository.save(user);
            this.recommendationService.addFavorite(userSaved, realState);
            return userSaved;
        }
        return null;
    }

    public User removeFavorite(ApiFavorite favorite) throws ApiException {
        // Check if realState or user are present
        Optional<RealState> presentRealState = realStateRepository.findById(favorite.getRealStateId());
        Optional<User> presentUser = userRepository.findById(favorite.getUserId());

        if (presentRealState.isPresent() && presentUser.isPresent()) {
            // Get the realState and user object
            RealState realState = presentRealState.get();
            User user = presentUser.get();

            // Add the favorite
            user.removeFavorite(realState);

            User userSaved = userRepository.save(user);
            this.recommendationService.removeFavorite(userSaved, realState);
            return userSaved;
        }
        return null;
    }

    public HashSet<ApiRealState> getFavorites(String userId) {
        Optional<User> presentUser = userRepository.findById(userId);
        if (presentUser.isPresent()) {
            User user = presentUser.get();
            return user.getFavorites().stream().map(favorite -> RealStateUtils.toApiRealState(favorite))
                    .collect(Collectors.toCollection(HashSet::new));
        }
        return null;
    }
}
