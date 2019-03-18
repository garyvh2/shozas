package com.gitgud.service;

import com.cloudinary.Api;
import com.gitgud.api.objects.*;
import com.gitgud.domain.RealState;
import com.gitgud.domain.User;
import com.gitgud.repository.RealStateRepository;
import com.gitgud.service.util.ResultType;
import com.mongodb.DBRef;
import dev.morphia.Datastore;
import dev.morphia.Key;
import dev.morphia.query.Criteria;
import dev.morphia.query.FindOptions;
import dev.morphia.query.Query;
import org.bson.types.ObjectId;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.mongodb.core.MongoTemplate;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;
import java.util.Optional;

@Service
public class RealStateService {

    private RealStateRepository realStateRepository;
    private MongoTemplate mongoTemplate;
    private UserService userService;

    @Autowired
    private Datastore datastore;

    public RealStateService(RealStateRepository realStateRepository, MongoTemplate mongoTemplate, UserService userService) {
        this.realStateRepository = realStateRepository;
        this.mongoTemplate = mongoTemplate;
        this.userService = userService;
    }

    public RealState save (RealState realState) throws Exception {
        Optional<User> userOwner = userService.getUserByEmail(realState.getOwner().getEmail());
        if (!userOwner.isPresent()){
            throw new Exception("Usuario no existe");
        }
        realState.setOwner(userOwner.get());
        realState.setDateCreated(new Date());
        return realStateRepository.save(realState);
    }

    public List<RealState> getRealStateElements (ResultType resultType, ApiSearchParams parameters, ApiSearchResults results) throws Exception {

       Query<RealState> realStates = datastore.createQuery(RealState.class);

       int pageSize = parameters.getPageSize() != 0 ? parameters.getPageSize() : 16;
       int page = parameters.getPage() == 1 ? 0 : pageSize * (parameters.getPage() - 1);

       switch (resultType){
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

       if(parameters.getProvince() != null &&!parameters.getProvince().isEmpty() && parameters.getCity()!= null && !parameters.getCity().isEmpty() && parameters.getDistrict()!= null && !parameters.getDistrict().isEmpty()){
           realStates.and(realStates.criteria("province").endsWithIgnoreCase(parameters.getProvince()),
                          realStates.criteria("city").endsWithIgnoreCase(parameters.getCity()),
                          realStates.criteria("district").endsWithIgnoreCase(parameters.getDistrict()));
       }
       else if(parameters.getProvince() != null &&!parameters.getProvince().isEmpty() && parameters.getCity()!= null && !parameters.getCity().isEmpty() ){
           realStates.and(realStates.criteria("province").endsWithIgnoreCase(parameters.getProvince()),
                          realStates.criteria("city").endsWithIgnoreCase(parameters.getCity()));
       }
       else if(parameters.getProvince() != null &&!parameters.getProvince().isEmpty() ){
           realStates.and(realStates.criteria("province").endsWithIgnoreCase(parameters.getProvince()));
       }

       if(parameters.getBaths() != 0){
           realStates.and(realStates.criteria("baths").greaterThanOrEq(parameters.getBaths()));
       }

       if(parameters.getBeds() != 0){
          realStates.and(realStates.criteria("rooms").greaterThanOrEq(parameters.getBeds()));
       }

       if(parameters.getGarages() != 0){
          realStates.and(realStates.criteria("garage").greaterThanOrEq(parameters.getGarages()));
       }

       if(parameters.getStories() != 0){
          realStates.and(realStates.criteria("stories").greaterThanOrEq(parameters.getStories()));
       }

       if(parameters.getZip() != 0){
          realStates.and(realStates.criteria("postalCode").equal(parameters.getZip()));
       }

       if(parameters.getPrLow()!=0 && parameters.getPrHigh() != 0){
           realStates.field("price").greaterThan(parameters.getPrLow())
                     .field("price").lessThanOrEq(parameters.getPrHigh());
       }

       if(parameters.getSizeLow()!=0 && parameters.getSizeHigh() != 0){
            realStates.field("size").greaterThan(parameters.getSizeLow())
                .field("size").lessThanOrEq(parameters.getSizeHigh());
       }

       if(parameters.getUser() != null && !parameters.getUser().isEmpty()){
           Optional<User> user = userService.getUserByEmail(parameters.getUser());
           if(!user.isPresent())
               throw new Exception("El usuario no existe");
            User u = user.get();
           realStates.disableValidation().field("owner").equal(new DBRef("jhi_user", new ObjectId(user.get().getId())));
       }

       if(parameters.getRaiting()!= 0){
            List<User> raitingUsers = userService.getUsersByRaiting(parameters.getRaiting());
            if (!raitingUsers.isEmpty()){
                Criteria[] criterias = new Criteria[raitingUsers.size()];
                int count = 0;
                for (User userToFind : raitingUsers ) {
                    criterias[count] = (realStates.criteria("owner").equal(new DBRef("jhi_user", new ObjectId(userToFind.getId()))));
                    count++;
                }
                realStates.disableValidation().or(criterias);
            }
       }

       if(realStates.asList().size() > 0 && results != null){
           Query<RealState> maxPrice = realStates;
           results.setMaxPrice(maxPrice.order("-price").asList(new FindOptions().limit(1)).get(0).getPrice());
           Query<RealState> minPrice = realStates;
           results.setMinPrice(minPrice.order("price").asList(new FindOptions().limit(1)).get(0).getPrice());

           Query<RealState> minSize = realStates;
           results.setMinSize(minSize.order("size").asList(new FindOptions().limit(1)).get(0).getSize());
           Query<RealState> maxSize = realStates;
           results.setMaxSize(maxSize.order("-size").asList(new FindOptions().limit(1)).get(0).getSize());
       }


        return realStates.asList(new FindOptions().skip(page).limit(pageSize));
    }

    public ApiRealState toApiRealState (RealState realState){
        ApiRealState result = new ApiRealState();
        ApiUser user = new ApiUser();
        ApiImage image = new ApiImage();
        ApiImage realStateImage = new ApiImage();

        result.setId(realState.getId());
        result.setAddr(realState.getProvince()+", " + realState.getCity() +", " +realState.getDistrict());
        result.setBaths(realState.getBaths());
        result.setBeds(realState.getRooms());
        result.setPrice(realState.getPrice());
        result.setSize(realState.getSize());
        result.setGar(realState.getGarage());
        result.setTitle(realState.getTitle());

        user.setName(realState.getOwner().getFirstName() +" " +realState.getOwner().getLastName());
        user.setStars(realState.getOwner().getRaiting());
        if(realState.getOwner().getImage() != null){
            image.setSource(realState.getOwner().getImage().getSource());
        }
        user.setImage(image);
        result.setUser(user);

        realState.getImages().forEach(i -> {
            if(i.isPrimary()){
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

}
