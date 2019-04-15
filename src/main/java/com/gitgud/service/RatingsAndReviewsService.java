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
        return  review;
    }

    public boolean generateReview( Review review ) throws Exception {

        Optional<RealState> realStateOptional = realStateRepository.findById(review.getRealState().getId());

        if(!realStateOptional.isPresent())
            throw new Exception("El elemento a calificar no existe");

        RealState realState = realStateOptional.get();

        realState.setRented(review.isRented());
        realState.setSold(review.isSold());

        realStateRepository.save(realState);
        try {
            if (!review.isUserUnKnown())
            {
                Optional<User> userOptional = userRepository.findOneByLogin( review.getUserShopper().getLogin());
                boolean isRegistred  = userOptional.isPresent();
                mailService.sendEmailReview(review.getUserShopper().getLogin(), isRegistred, review.getRealState().getId());
            }
        }
        catch (Exception e){
            return false;
        }
        return true;
    }
}
