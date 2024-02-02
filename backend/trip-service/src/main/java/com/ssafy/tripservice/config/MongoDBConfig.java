package com.ssafy.tripservice.config;

import com.mongodb.MongoClientSettings;
import com.mongodb.client.MongoClient;
import com.mongodb.client.MongoClients;
import org.bson.UuidRepresentation;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.data.mongodb.core.MongoAdmin;
import org.springframework.data.mongodb.core.MongoTemplate;

@Configuration
public class MongoDBConfig {

    @Bean
    MongoClientSettings mongoClientSettings() {
        return MongoClientSettings.builder().uuidRepresentation(UuidRepresentation.STANDARD).build();
    }

    @Bean
    public MongoClient mongoClient() {
        return MongoClients.create("mongodb://mongo-container:27017");
    }

    @Bean
    public MongoTemplate mongoTemplate() {
        return new MongoTemplate(mongoClient(), "mongo-narang");
    }
}
