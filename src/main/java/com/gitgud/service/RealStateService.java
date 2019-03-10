package com.gitgud.service;

import com.gitgud.domain.RealState;
import com.gitgud.domain.User;
import com.gitgud.repository.RealStateRepository;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class RealStateService {

    private RealStateRepository realStateRepository;

    private UserService userService;

    public RealStateService(RealStateRepository realStateRepository, UserService userService) {
        this.realStateRepository = realStateRepository;
        this.userService = userService;
    }

    public RealState save (RealState realState) throws Exception {
        Optional<User> userOwner = userService.getUserByEmail(realState.getOwner().getEmail());
        if (!userOwner.isPresent()){
            throw new Exception("Usuario no existe");
        }
        realState.setOwner(userOwner.get());

        return realStateRepository.save(realState);
    }

}
