package com.imre.repository;


import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import com.imre.model.User;

@Repository
public interface UserRepository extends
    JpaRepository<User, Long>{

    @Query("{email :?0}")
    User findByEmail(String email);
}
