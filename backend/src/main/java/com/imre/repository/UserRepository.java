package com.imre.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.imre.auth.User;


public interface UserRepository extends
    JpaRepository<User, Long>{

    User findByEmail(
        final String name
    );

}
