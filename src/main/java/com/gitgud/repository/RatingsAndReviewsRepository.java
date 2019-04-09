package com.gitgud.repository;

    import com.gitgud.domain.Review;
    import org.springframework.data.mongodb.repository.MongoRepository;
    import org.springframework.stereotype.Repository;

@Repository
public interface RatingsAndReviewsRepository extends MongoRepository<Review, String> {
}
