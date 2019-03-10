package com.gitgud.web.rest;

import com.gitgud.domain.ApiResultModel;
import com.gitgud.domain.ApiSearchParams;
import com.gitgud.domain.RealState;
import com.gitgud.service.RealStateService;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api")
public class RealStateController extends ApiBaseController {

    private RealStateService realStateService;

    public RealStateController(RealStateService realStateService) {
        this.realStateService = realStateService;
    }

    @PostMapping("/search/realstate")
    public ApiResultModel<RealState> searchRealStateElements(@RequestBody ApiSearchParams apiSearchParams){
        return GetApiResultModel(() ->{

            return new RealState();
        });
    }


}
