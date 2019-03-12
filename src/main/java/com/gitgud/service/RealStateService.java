package com.gitgud.service;

import com.gitgud.domain.ApiSearchParams;
import com.gitgud.domain.RealState;
import com.gitgud.domain.User;
import com.gitgud.repository.RealStateRepository;
import com.gitgud.service.util.ResultType;
import com.mongodb.DBRef;
import dev.morphia.Datastore;
import dev.morphia.Key;
import dev.morphia.query.FindOptions;
import dev.morphia.query.Query;
import org.bson.types.ObjectId;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.mongodb.core.MongoTemplate;
import org.springframework.stereotype.Service;

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

        return realStateRepository.save(realState);
    }

    public List<RealState> getRealStateElements (ResultType resultType, ApiSearchParams parameters) throws Exception {

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
           realStates.and(realStates.criteria("province").equal(parameters.getProvince()),
                          realStates.criteria("city").equal(parameters.getCity()),
                          realStates.criteria("district").equal(parameters.getDistrict()));
       }
       else if(parameters.getProvince() != null &&!parameters.getProvince().isEmpty() && parameters.getCity()!= null && !parameters.getCity().isEmpty() ){
           realStates.and(realStates.criteria("province").equal(parameters.getProvince()),
                          realStates.criteria("city").equal(parameters.getCity()));
       }
       else if(parameters.getProvince() != null &&!parameters.getProvince().isEmpty() ){
           realStates.and(realStates.criteria("province").equal(parameters.getProvince()));
       }

       if(parameters.getBaths() != 0){
           realStates.and(realStates.criteria("baths").equal(parameters.getBaths()));
       }

       if(parameters.getBeds() != 0){
          realStates.and(realStates.criteria("rooms").equal(parameters.getBeds()));
       }

       if(parameters.getGarages() != 0){
          realStates.and(realStates.criteria("garage").equal(parameters.getGarages()));
       }

       if(parameters.getStories() != 0){
          realStates.and(realStates.criteria("stories").equal(parameters.getStories()));
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
           realStates.disableValidation().field("owner").equal(new DBRef("jhi_user", new ObjectId(u.getId())));
       }

        return realStates.asList(new FindOptions().skip(page).limit(pageSize));
    }


}