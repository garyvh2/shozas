package com.gitgud.web.rest;

import com.gitgud.domain.ApiResultModel;
import com.gitgud.domain.ApiSearchParams;
import com.gitgud.domain.RealState;
import com.gitgud.service.RealStateService;
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

    @PostMapping("/search")
    public ApiResultModel<List<RealState>> searchRealStateElements(@RequestBody ApiSearchParams apiSearchParams){
        return GetApiResultModel(() ->{

            return new ArrayList<RealState>();
        });
    }

    @PostMapping("/create")
    public ApiResultModel<RealState> createRealState(@RequestBody RealState realState){
        return GetApiResultModel(() ->{

            return realStateService.save(realState);
        });
    }


}
