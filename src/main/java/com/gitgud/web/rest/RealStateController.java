package com.gitgud.web.rest;

import com.gitgud.domain.ApiResultModel;
import com.gitgud.domain.ApiSearchParams;
import com.gitgud.domain.RealState;
import com.gitgud.service.RealStateService;
import com.gitgud.service.util.ResultType;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.ArrayList;
import java.util.List;

@RestController
@RequestMapping("/api/realstate")
public class RealStateController extends ApiBaseController {

    private RealStateService realStateService;

    public RealStateController(RealStateService realStateService) {
        this.realStateService = realStateService;
    }

    @PostMapping("/search/homes")
    public ApiResultModel<List<RealState>> searchHomes(@RequestBody ApiSearchParams apiSearchParams){
        return GetApiResultModel(() -> realStateService.getRealStateElements(ResultType.Homes, apiSearchParams));
    }

    @PostMapping("/search/lots")
    public ApiResultModel<List<RealState>> searchLots (@RequestBody ApiSearchParams apiSearchParams){
        return GetApiResultModel(() -> realStateService.getRealStateElements(ResultType.Lots, apiSearchParams));
    }

    @PostMapping("/search/deps")
    public ApiResultModel<List<RealState>> searchDepartments(@RequestBody ApiSearchParams apiSearchParams){
        return GetApiResultModel(() -> realStateService.getRealStateElements(ResultType.Departments, apiSearchParams));
    }

    @PostMapping("/create")
    public ApiResultModel<RealState> createRealState(@RequestBody RealState realState){
        return GetApiResultModel(() ->  realStateService.save(realState));
    }


}
