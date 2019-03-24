package com.gitgud.web.rest;

import com.gitgud.domain.IPSCanton;
import org.springframework.boot.configurationprocessor.json.JSONObject;
import org.springframework.http.*;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.client.RestTemplate;

import java.util.List;

@RestController
@RequestMapping("/api/ips")
public class IPSController extends ApiBaseController {

    private String crpCantones = "http://www.costaricapropone.go.cr/api/cantones/slug/";
    private String crpIPS = "http://www.costaricapropone.go.cr/api/ips/cve/";
    private RestTemplate rest;
    private HttpHeaders headers;
    private HttpStatus status;

    @GetMapping("/{cantonName}")
    public String getCRPData(@PathVariable String cantonName){

        cantonName = cantonName.replace(' ', '-').toLowerCase();

        if (cantonName.equals("central")) {
            cantonName = "san-jose";
        }

        try {
            RestTemplate restTemplate = new RestTemplate();
            IPSCanton canton = restTemplate.getForObject(crpCantones + cantonName, IPSCanton.class);

            return restTemplate.getForObject(crpIPS + canton.getCVE(), String.class);
        } catch (Exception ex) {
            return null;
        }
    }

    public HttpStatus getStatus() {
        return status;
    }

    public void setStatus(HttpStatus status) {
        this.status = status;
    }
}
