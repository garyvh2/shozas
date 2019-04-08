package com.gitgud.web.rest;

import com.gitgud.domain.Review;
import com.gitgud.service.RatingsAndReviewsService;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/ratingsAndReviews")
public class RatingsAndReviewsController {

    private RatingsAndReviewsService ratingsAndReviewsService;

    public RatingsAndReviewsController(RatingsAndReviewsService ratingsAndReviewsService) {
        this.ratingsAndReviewsService = ratingsAndReviewsService;
    }

    @PostMapping("/create")
    public Review create (Review review){
        return ratingsAndReviewsService.save(review);
    }
}
