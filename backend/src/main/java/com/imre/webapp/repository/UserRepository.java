package com.imre.webapp.repository;


import org.springframework.data.jpa.repository.JpaRepository;

import com.imre.webapp.model.User;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface UserRepository extends JpaRepository<User, Long> {

    Optional<User> findUserByEmail(String email);
}
