package com.gitgud.service;

import com.gitgud.api.objects.ApiImage;
import com.gitgud.api.objects.ApiReview;
import com.gitgud.api.objects.ApiUser;
import com.gitgud.domain.RealState;
import com.gitgud.domain.Review;
import com.gitgud.domain.User;
import com.gitgud.repository.RatingsAndReviewsRepository;
import com.gitgud.repository.RealStateRepository;
import com.gitgud.repository.UserRepository;
import com.gitgud.service.recommendation.RecommendationService;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.HashSet;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
public class RatingsAndReviewsService {

    private RatingsAndReviewsRepository ratingsAndReviewsRepository;
    private MailService mailService;
    private UserRepository userRepository;
    private RealStateRepository realStateRepository;
    private RecommendationService recommendationService;

    public RatingsAndReviewsService(RatingsAndReviewsRepository ratingsAndReviewsRepository, MailService mailService, UserRepository userRepository, RealStateRepository realStateRepository, RecommendationService recommendationService) {
        this.ratingsAndReviewsRepository = ratingsAndReviewsRepository;
        this.mailService = mailService;
        this.userRepository = userRepository;
        this.realStateRepository = realStateRepository;
        this.recommendationService = recommendationService;
    }

    public Review save(Review review) throws Exception {

        Optional<RealState> realStateOptional = realStateRepository.findById(review.getRealState().getId());
        Optional<User> userOptional = userRepository.findOneByLogin( review.getUserShopper().getLogin());

        if(!realStateOptional.isPresent())
            throw new Exception("El elemento a calificar no existe");

        if(!userOptional.isPresent())
            throw new Exception("El usuario aun no esta registrado");

        RealState realStateToEvaluate = realStateOptional.get();
        realStateToEvaluate.getOwner().setFavorites(null);

        User userToCheck = realStateToEvaluate.getOwner();

        double numberOfReviews = userToCheck.getReviews().size() + 1;

        double maxCualification = numberOfReviews * 5;

        double currentCualifcation = userToCheck.getReviews().stream().mapToInt(r -> (int)r.getRating()).sum() + review.getRating();

        double numberOfStars = (currentCualifcation/maxCualification) * 5;

        review.setUserShopper(userOptional.get());
        review = ratingsAndReviewsRepository.save(review);

        HashSet<Review> reviews = userToCheck.getReviews();
        reviews.add(review);

        userToCheck.setRaiting(numberOfStars);
        userToCheck.setReviews(reviews);

        userRepository.save(userToCheck);

        review.getUserShopper().setFavorites(null);

        this.recommendationService.addRating(review.getUserShopper().getId(), review.getRealState().getId(), review.getRating());

        return  review;
    }

    public boolean generateReview( Review review ) throws Exception {

        Optional<RealState> realStateOptional = realStateRepository.findById(review.getRealState().getId());

        if(!realStateOptional.isPresent())
            throw new Exception("El elemento a calificar no existe");

        RealState realState = realStateOptional.get();

        realState.getOwner().setFavorites(null);
        realState.getOwner().setReviews(null);
        realState.setSold(true);

        realStateRepository.save(realState);
        try {
            if (!review.isUserUnKnown())
            {
                Optional<User> userOptional = userRepository.findOneByLogin( review.getUserShopper().getLogin());
                boolean isRegistred  = userOptional.isPresent();

                if (userOptional.isPresent()) {
                    this.recommendationService.addPurchase(userOptional.get().getId(), realState.getId());
                }
                mailService.sendEmailReview(review.getUserShopper().getLogin(), isRegistred, review.getRealState().getId());
            }
        }
        catch (Exception e){
            return false;
        }
        return true;
    }

    public List<Review> getReviews(String realstateId) {

        Optional<List<Review>> reviews = ratingsAndReviewsRepository.findByRealStateEquals(realstateId);

        if (!reviews.isPresent())
            return new ArrayList<>();

        reviews.get().forEach(review -> {
            review.getUserShopper().setFavorites(null);
            review.getUserShopper().setReviews(null);
            review.getRealState().getOwner().setFavorites(null);
            review.getRealState().getOwner().setReviews(null);
        });

        return  reviews.get();

//        return reviews.get().stream().map(reviews1 -> toApiReview(reviews1)).collect(Collectors.toList());
    }

    private ApiReview toApiReview(Review review){
        ApiReview apiReview = new ApiReview();
        ApiUser apiUser = new ApiUser();
        ApiImage apiImage = new ApiImage();

        apiReview.setComment(review.getComment());
        apiReview.setStars(review.getRating());
        apiUser.setName(review.getUserShopper().getFirstName() + " " + review.getUserShopper().getLastName());
        apiUser.setStars(review.getUserShopper().getRaiting());
        apiImage.setSource(review.getUserShopper().getImage().getSource());
        apiUser.setImage(apiImage);
        apiReview.setUser(apiUser);

        return apiReview;
    }

}
