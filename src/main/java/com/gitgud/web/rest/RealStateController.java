package com.gitgud.web.rest;

import com.gitgud.api.objects.ApiRealState;
import com.gitgud.api.objects.ApiResultModel;
import com.gitgud.api.objects.ApiSearchParams;
import com.gitgud.api.objects.ApiSearchResults;
import com.gitgud.domain.RealState;
import com.gitgud.domain.User;
import com.gitgud.service.RealStateService;
import com.gitgud.service.UserService;
import com.gitgud.service.util.ResultType;
import org.springframework.web.bind.annotation.*;

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

    @PostMapping("/create")
    public ApiResultModel<RealState> createRealState(@RequestBody RealState realState) throws Exception {
        return GetApiResultModel(() ->  realStateService.save(realState));
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

}
