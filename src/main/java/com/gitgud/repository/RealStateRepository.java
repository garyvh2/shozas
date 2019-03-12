package com.gitgud.repository;

import com.gitgud.domain.RealState;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface RealStateRepository extends MongoRepository<RealState, String> {
}
