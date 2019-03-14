package com.gitgud.config;

import com.mongodb.MongoClient;
import dev.morphia.Datastore;
import dev.morphia.Morphia;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
public class MorphiaAutoConfiguration {

    @Autowired
    private MongoClient mongoClient;

    @Bean
    public Datastore datastore() {
        Morphia morphia = new Morphia();
        morphia.mapPackage("com.gitgud.domain");

        return morphia.createDatastore(mongoClient, "shozas"); // "dataStoreInstanceId" may come from properties?
    }
}
