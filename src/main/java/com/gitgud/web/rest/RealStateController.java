package com.gitgud.web.rest;

import com.gitgud.api.objects.ApiRealState;
import com.gitgud.api.objects.ApiResultModel;
import com.gitgud.api.objects.ApiSearchParams;
import com.gitgud.domain.RealState;
import com.gitgud.service.RealStateService;
import com.gitgud.service.util.ResultType;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/api/realstate")
public class RealStateController extends ApiBaseController {

    private RealStateService realStateService;

    public RealStateController(RealStateService realStateService) {
        this.realStateService = realStateService;
    }

    @PostMapping("/search/homes")
    public ApiResultModel<List<ApiRealState>> searchHomes(@RequestBody ApiSearchParams apiSearchParams){
        return GetApiResultModel(() -> realStateService.getRealStateElements(ResultType.Homes, apiSearchParams).stream().map(l -> realStateService.toApiRealState(l)).collect(Collectors.toList()));
    }

    @PostMapping("/search/lots")
    public ApiResultModel<List<ApiRealState>> searchLots (@RequestBody ApiSearchParams apiSearchParams){
        return GetApiResultModel(() -> realStateService.getRealStateElements(ResultType.Lots, apiSearchParams).stream().map(l -> realStateService.toApiRealState(l)).collect(Collectors.toList()));
    }

    @PostMapping("/search/deps")
    public ApiResultModel<List<ApiRealState>> searchDepartments(@RequestBody ApiSearchParams apiSearchParams){
        return GetApiResultModel(() -> realStateService.getRealStateElements(ResultType.Departments, apiSearchParams).stream().map(l -> realStateService.toApiRealState(l)).collect(Collectors.toList()));
    }

    @PostMapping("/create")
    public ApiResultModel<RealState> createRealState(@RequestBody RealState realState){
        return GetApiResultModel(() ->  realStateService.save(realState));
    }


}
