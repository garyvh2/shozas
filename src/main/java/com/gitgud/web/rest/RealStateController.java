package com.gitgud.web.rest;

import com.gitgud.api.objects.*;
import com.gitgud.domain.RealState;
import com.gitgud.domain.User;
import com.gitgud.service.RealStateService;
import com.gitgud.service.UserService;
import com.gitgud.service.util.ResultType;
import org.springframework.web.bind.annotation.*;

import java.util.HashSet;
import java.util.List;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/api/realstate")
public class RealStateController extends ApiBaseController {

    private RealStateService realStateService;
    private final UserService userService;

    public RealStateController(RealStateService realStateService, UserService userService) {
        this.realStateService = realStateService;
        this.userService = userService;

    }

    @PostMapping("/search/homes")
    public ApiResultModel<ApiSearchResults> searchHomes(@RequestBody ApiSearchParams apiSearchParams) throws Exception {
        return GetApiResultModel(() ->{
            ApiSearchResults results = new ApiSearchResults();
            results.setElements(realStateService.getRealStateElements(ResultType.Homes, apiSearchParams, results).stream().map(l -> realStateService.toApiRealState(l)).collect(Collectors.toList()));
            return results;
        } );
    }

    @PostMapping("/search/lots")
    public ApiResultModel<ApiSearchResults> searchLots (@RequestBody ApiSearchParams apiSearchParams) throws Exception {
        return GetApiResultModel(() ->{
            ApiSearchResults results = new ApiSearchResults();
            results.setElements(realStateService.getRealStateElements(ResultType.Lots, apiSearchParams, results).stream().map(l -> realStateService.toApiRealState(l)).collect(Collectors.toList()));
            return results;
        } );
    }

    @PostMapping("/search/deps")
    public ApiResultModel<ApiSearchResults> searchDepartments(@RequestBody ApiSearchParams apiSearchParams) throws Exception {
        return GetApiResultModel(() ->{
            ApiSearchResults results = new ApiSearchResults();
            results.setElements(realStateService.getRealStateElements(ResultType.Departments, apiSearchParams, results).stream().map(l -> realStateService.toApiRealState(l)).collect(Collectors.toList()));
            return results;
        } );
    }

    @PostMapping("/search/all")
    public ApiResultModel<List<RealState>> searchAllTypes(@RequestBody ApiSearchParams apiSearchParams) throws Exception {
        return GetApiResultModel(() -> {
            List<RealState> result = realStateService.getRealStateElements(ResultType.All, apiSearchParams, new ApiSearchResults());
            result.forEach(r ->{
                r.getOwner().setFavorites(null);
                r.getOwner().setReviews(null);
            });
            return result;
        } );
    }

    @PostMapping("/create")
    public ApiResultModel<RealState> createRealState(@RequestBody RealState realState) throws Exception {
        return GetApiResultModel(() ->  realStateService.save(realState));
    }

    @PutMapping("/update")
    public ApiResultModel<RealState> updateRealState(@RequestBody RealState realState) throws Exception {
        return GetApiResultModel(() ->  realStateService.update(realState));
    }

    @GetMapping("/detail")
    public ApiResultModel<RealState> detailRealState(@RequestParam String id) throws Exception {
        return GetApiResultModel(() ->  realStateService.getRealStateDetailElement(id));
    }


    @PostMapping("/contact-owner")
    public User sendEmail(@RequestBody RealState rs) throws Exception  {

        RealState tempRS = realStateService.getRealStateDetailElement(rs.getId());

        return userService.sendEmailToOwner(tempRS);
    }

    @GetMapping("/get-favorites/{userId}")
    public ApiResultModel<HashSet<ApiRealState>> getFavorites(@PathVariable String userId) throws Exception {
        return GetApiResultModel(() -> realStateService.getFavorites(userId));
    }

    @PostMapping("/add-favorite")
    public ApiResultModel<User> addFavorite(@RequestBody ApiFavorite favorite) throws Exception {
        return GetApiResultModel(() -> realStateService.addFavorite(favorite));
    }

    @PostMapping("/remove-favorite")
    public ApiResultModel<User> removeFavorite(@RequestBody ApiFavorite favorite) throws Exception {
        return GetApiResultModel(() -> realStateService.removeFavorite(favorite));
    }

}
