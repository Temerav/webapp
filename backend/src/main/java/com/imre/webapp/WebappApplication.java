package com.imre.webapp;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.autoconfigure.domain.EntityScan;
import org.springframework.context.annotation.ComponentScan;
import org.springframework.data.jpa.repository.config.EnableJpaRepositories;


@SpringBootApplication
@ComponentScan(basePackages = { "com.imre.webapp.*" })
@EntityScan("com.imre.webapp.*")
@EnableJpaRepositories("com.imre.webapp.*")
public class WebappApplication {


    public static void main(
        final String[] args
    ) {
        SpringApplication.run(WebappApplication.class, args);
    }

}
