package com.gitgud.service;

import com.gitgud.domain.RealState;
import com.gitgud.repository.RealStateRepository;
import org.springframework.stereotype.Service;

@Service
public class RealStateService {

    private RealStateRepository realStateRepository;

    public RealStateService(RealStateRepository realStateRepository) {
        this.realStateRepository = realStateRepository;
    }

    public RealState save (RealState realState){
        return realStateRepository.save(realState);
    }
    
}
