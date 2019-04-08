package com.gitgud.service;

import com.gitgud.domain.Review;
import com.gitgud.repository.RatingsAndReviewsRepository;
import org.springframework.stereotype.Service;

@Service
public class RatingsAndReviewsService {

    private RatingsAndReviewsRepository ratingsAndReviewsRepository;

    public RatingsAndReviewsService(RatingsAndReviewsRepository ratingsAndReviewsRepository) {
        this.ratingsAndReviewsRepository = ratingsAndReviewsRepository;
    }

    public Review save(Review review){
        return ratingsAndReviewsRepository.save(review);
    }
}
