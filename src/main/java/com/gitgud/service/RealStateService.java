package com.gitgud.service;

import com.cloudinary.Cloudinary;
import com.cloudinary.utils.ObjectUtils;
import com.gitgud.api.objects.*;
import com.gitgud.domain.Image;
import com.gitgud.domain.RealState;
import com.gitgud.domain.User;
import com.gitgud.repository.RealStateRepository;
import com.gitgud.repository.UserRepository;
import com.gitgud.service.util.CloudinaryUtil;
import com.gitgud.service.util.ResultType;
import com.mongodb.DBRef;
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

@Service
public class RealStateService {

    private RealStateRepository realStateRepository;
    private UserRepository userRepository;
    private MongoTemplate mongoTemplate;
    private UserService userService;

    @Autowired
    private Datastore datastore;

    public RealStateService(RealStateRepository realStateRepository, UserRepository userRepository, MongoTemplate mongoTemplate,
            UserService userService) {
        this.realStateRepository = realStateRepository;
        this.userRepository = userRepository;
        this.mongoTemplate = mongoTemplate;
        this.userService = userService;
    }

    public RealState save (RealState realState) throws Exception, IOException {
        Optional<User> userOwner = userService.getUserByEmail(realState.getOwner().getLogin());
        if (!userOwner.isPresent()){
            throw new Exception("Usuario no existe");
        }
        String realStateTitle = realState.getRealStateType().equals("H") ? "Casa en " : realState.getRealStateType().equals("D") ? "Departamento en " : "Lote en ";
        realStateTitle = realStateTitle.concat(realState.getProvince() + " ").concat(realState.getDistrict());
        realState.setTitle(realStateTitle);

        if(realState.getImages() != null && !realState.getImages().isEmpty()){
            Cloudinary cloudinaryUploader = CloudinaryUtil.getCloudinaryInstance();
            realState.getImages().forEach(i -> {
                String source = "";
                String imageId = "";
                try {
                    Map uploadResult = cloudinaryUploader.uploader().upload(i.getSource(),ObjectUtils.emptyMap());
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

        if(realState.getImages() == null || realState.getImages().isEmpty()){
            realState.setImages(getDefaults());
        }

        realState.setDateCreated(Instant.now());
        realState.setOwner(userOwner.get());

        return realStateRepository.save(realState);
    }

    private HashSet<Image> getDefaults(){
        HashSet<Image> result = new HashSet<Image>();

        for (int i = 0; i < 3; i++){
            Image defaultImage = new Image();
            defaultImage.setSource("http://res.cloudinary.com/ucenfotec19/image/upload/v1553328159/dxtdpxwxyhav96tnklzc.png");
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

        if(resultType != ResultType.Lots){

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

    public ApiRealState toApiRealState(RealState realState) {
        ApiRealState result = new ApiRealState();
        ApiUser user = new ApiUser();
        ApiImage image = new ApiImage();
        ApiImage realStateImage = new ApiImage();

        result.setId(realState.getId());
        result.setAddr(realState.getProvince() + ", " + realState.getCity() + ", " + realState.getDistrict());
        result.setBaths(realState.getBaths());
        result.setBeds(realState.getRooms());
        result.setPrice(realState.getPrice());
        result.setSize(realState.getSize());
        result.setGar(realState.getGarage());
        result.setTitle(realState.getTitle());

        user.setName(realState.getOwner().getFirstName() + " " + realState.getOwner().getLastName());
        user.setStars(realState.getOwner().getRaiting());
        if (realState.getOwner().getImage() != null) {
            image.setSource(realState.getOwner().getImage().getSource());
        }
        user.setImage(image);
        result.setUser(user);

        realState.getImages().forEach(i -> {
            if (i.isPrimary()) {
                realStateImage.setSource(i.getSource());
                realStateImage.setPrimary(i.isPrimary());
                realStateImage.setIs360Image(i.isIs360Image());
            }
            result.setImage(realStateImage);
        });

        return result;
    }

    public RealState getRealStateDetailElement(String id) throws Exception {
        Optional<RealState> result = realStateRepository.findById(id);
        if (!result.isPresent())
            throw new Exception("El elemento solicitado ya no existe");
        return result.get();
    }


    public User addFavorite(ApiFavorite favorite) {
        // Check if realState or user are present
        Optional<RealState> presentRealState = realStateRepository.findById(favorite.getRealStateId());
        Optional<User> presentUser = userRepository.findById(favorite.getUserId());

        if(presentRealState.isPresent() && presentUser.isPresent()) {
            // Get the realState and user object
            RealState realState = presentRealState.get();
            User user = presentUser.get();

            // Add the favorite
            user.addFavorite(realState);

            return userRepository.save(user);
        }
        return null;
    }

    public User removeFavorite(ApiFavorite favorite) {
        // Check if realState or user are present
        Optional<RealState> presentRealState = realStateRepository.findById(favorite.getRealStateId());
        Optional<User> presentUser = userRepository.findById(favorite.getUserId());

        if(presentRealState.isPresent() && presentUser.isPresent()) {
            // Get the realState and user object
            RealState realState = presentRealState.get();
            User user = presentUser.get();

            // Add the favorite
            user.removeFavorite(realState);

            return userRepository.save(user);
        }
        return null;
    }
}
