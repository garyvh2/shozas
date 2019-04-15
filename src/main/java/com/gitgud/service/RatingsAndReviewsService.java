package com.gitgud.service;

import com.gitgud.domain.RealState;
import com.gitgud.domain.Review;
import com.gitgud.domain.User;
import com.gitgud.repository.RatingsAndReviewsRepository;
import com.gitgud.repository.RealStateRepository;
import com.gitgud.repository.UserRepository;
import org.springframework.stereotype.Service;

import java.util.HashSet;
import java.util.Optional;

@Service
public class RatingsAndReviewsService {

    private RatingsAndReviewsRepository ratingsAndReviewsRepository;
    private MailService mailService;
    private UserRepository userRepository;
    private RealStateRepository realStateRepository;

    public RatingsAndReviewsService(RatingsAndReviewsRepository ratingsAndReviewsRepository, MailService mailService, UserRepository userRepository, RealStateRepository realStateRepository) {
        this.ratingsAndReviewsRepository = ratingsAndReviewsRepository;
        this.mailService = mailService;
        this.userRepository = userRepository;
        this.realStateRepository = realStateRepository;
    }

    public Review save(Review review) throws Exception {

        Optional<RealState> realStateOptional = realStateRepository.findById(review.getRealState().getId());

        if(!realStateOptional.isPresent())
            throw new Exception("El elemento a calificar no existe");

        RealState realStateToEvaluate = realStateOptional.get();
        realStateToEvaluate.getOwner().setFavorites(null);

        User userToCheck = realStateToEvaluate.getOwner();

        double numberOfReviews = userToCheck.getReviews().size() + 1;

        double maxCualification = numberOfReviews * 5;

        double currentCualifcation = userToCheck.getReviews().stream().mapToInt(r -> (int)r.getRating()).sum() + review.getRating();

        double numberOfStars = (currentCualifcation/maxCualification) * 5;

        HashSet<Review> reviews = userToCheck.getReviews();
        reviews.add(review);
        userToCheck.setRaiting(numberOfStars);
        userToCheck.setReviews(reviews);

        userRepository.save(userToCheck);
        return ratingsAndReviewsRepository.save(review);
    }

    public boolean generateReview( Review review ) throws Exception {

        Optional<User> userOptional = userRepository.findOneByLogin( review.getUserShopper().getLogin());
        Optional<RealState> realStateOptional = realStateRepository.findById(review.getRealState().getId());
        boolean isRegistred  = userOptional.isPresent();

        if(!realStateOptional.isPresent())
            throw new Exception("El elemento a calificar no existe");

        try {
            mailService.sendEmailReview(review.getUserShopper().getLogin(), isRegistred, review.getRealState().getId());
        }
        catch (Exception e){
            return false;
        }
        return true;
    }
}
