package com.imre.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.imre.auth.User;


public interface UserRepository extends
    JpaRepository<User, Long>{

    User findByEmail(
        final String name
    );

    User findByUserName(String username);

    User findBySecretCode(String code);

    Optional<User> findUserByUserName(String userName);

    Optional<User> findUserByEmailAddress(String emailAddress);

    boolean findUserById(Long userId);

    void deleteUserById(Long userId);

    boolean existsUserByUserName(String username);

    boolean existsUserByFirstName(String firstname);

    boolean existsUserByLastName(String lastname);

    boolean existsUserByEmailAddress(String email);

}
