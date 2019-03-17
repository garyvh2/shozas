package com.gitgud.web.rest;

import com.gitgud.domain.IPSCanton;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.client.RestTemplate;

@RestController
@RequestMapping("/api/financing")
public class FinancingController extends ApiBaseController {

    private String url = "https://www.toyotacr.com/rest/v2/calculator";
    private RestTemplate rest;
    private HttpHeaders headers;
    private HttpStatus status;

    @GetMapping()
    public String getTYTInfo(){

        RestTemplate restTemplate = new RestTemplate();
        return restTemplate.getForObject(url, String.class);
    }

    public HttpStatus getStatus() {
        return status;
    }

    public void setStatus(HttpStatus status) {
        this.status = status;
    }
}
