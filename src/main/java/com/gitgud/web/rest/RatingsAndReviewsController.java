package com.gitgud.web.rest;

import com.gitgud.api.objects.ApiResultModel;
import com.gitgud.api.objects.ApiReview;
import com.gitgud.domain.Review;
import com.gitgud.service.RatingsAndReviewsService;
import org.apiguardian.api.API;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/ratingsAndReviews")
public class RatingsAndReviewsController extends ApiBaseController {

    private RatingsAndReviewsService ratingsAndReviewsService;

    public RatingsAndReviewsController(RatingsAndReviewsService ratingsAndReviewsService) {
        this.ratingsAndReviewsService = ratingsAndReviewsService;
    }

    @PostMapping("/create")
    public ApiResultModel<Review> create (@RequestBody Review review) throws Exception {
        return GetApiResultModel(() -> ratingsAndReviewsService.save(review));
    }

    @PostMapping("/generate")
    public ApiResultModel<Boolean> generate (@RequestBody Review review) throws Exception {
        return GetApiResultModel(() -> ratingsAndReviewsService.generateReview(review));
    }

    @GetMapping("/get-reviews")
    public ApiResultModel<List<Review>> getReviews (@RequestParam String realStateId) throws Exception {
        return GetApiResultModel(() -> ratingsAndReviewsService.getReviews(realStateId));
    }
}
