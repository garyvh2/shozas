package com.gitgud.repository;

    import com.gitgud.domain.Review;
    import org.springframework.data.mongodb.repository.MongoRepository;
    import org.springframework.stereotype.Repository;

    import java.util.List;
    import java.util.Optional;

@Repository
public interface RatingsAndReviewsRepository extends MongoRepository<Review, String> {

    Optional<List<Review>> findByRealStateEquals(String realStateId);
}
