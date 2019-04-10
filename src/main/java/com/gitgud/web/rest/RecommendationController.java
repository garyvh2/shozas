package com.gitgud.web.rest;

import com.gitgud.api.objects.ApiRealState;
import com.gitgud.api.objects.ApiResultModel;
import com.gitgud.domain.RealState;
import com.gitgud.service.recommendation.RecommendationService;
import com.recombee.api_client.exceptions.ApiException;
import org.springframework.web.bind.annotation.*;

import java.util.HashSet;
import java.util.Set;

@RestController
@RequestMapping("/api/recommendations")
public class RecommendationController extends ApiBaseController {

    private RecommendationService recommendationService;

    public RecommendationController (RecommendationService recommendationService) {
        this.recommendationService = recommendationService;
    }

    @GetMapping("/reset")
    public void reset() throws Exception {
        this.recommendationService.reset();
    }

    @GetMapping("/configure")
    public void configure() throws Exception {
        this.recommendationService.configureItemFields();
    }

    @GetMapping("/sync")
    public void sync() {
        this.recommendationService.syncAll();
    }

    @GetMapping("/sync/users")
    public void syncUsers() {
        this.recommendationService.syncUsers();
    }

    @GetMapping("/sync/items")
    public void syncItems() {
        this.recommendationService.syncItems();
    }

    @GetMapping("/sync/favorites")
    public void syncFavorites() {
        this.recommendationService.syncFavorites();
    }

    @GetMapping("/user/{userId}")
    public ApiResultModel<HashSet<ApiRealState>> userRecommendations (@PathVariable String userId, @RequestParam(required = false, defaultValue = "10") long count) throws Exception {
        return GetApiResultModel(() -> recommendationService.userRecommendations(userId, count));
    }
}
