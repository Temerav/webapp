package com.imre.webapp.service;

import com.imre.webapp.model.User;

import java.util.List;


public interface UserService {


    public List<User> getAllUser();

    public User findUserProfileByJwt(String jwt);

    public User findUserByEmail(String email);

    public User findUserById(Long userId);

    public List<User> findAllUsers();


}