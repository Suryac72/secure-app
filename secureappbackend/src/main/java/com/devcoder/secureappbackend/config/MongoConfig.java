package com.devcoder.secureappbackend.config;

@Configuration
@EnableMongoAuditing
public class MongoConfig {

    @Bean
    public MongoClientSettings mongoClientSettings() {
        ConnectionString connectionString = 
            new ConnectionString("mongodb://localhost:27017/secureapp");
        
        return MongoClientSettings.builder()
            .applyConnectionString(connectionString)
            .applyToConnectionPoolSettings(builder -> 
                builder.maxSize(100)
                       .minSize(10)
                       .maxWaitTime(2, TimeUnit.SECONDS))
            .build();
    }

    @Bean
    public MongoCustomConversions customConversions() {
        return new MongoCustomConversions(Arrays.asList(
            new LocalDateTimeToDateConverter(),
            new DateToLocalDateTimeConverter()
        ));
    }
}