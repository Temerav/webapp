package com.imre.auth;

import java.util.HashSet;
import java.util.Set;

import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.validation.constraints.NotNull;

import lombok.Data;


@Data
public class User {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private final Long id;

    @NotNull(message = "Firstname is mandatory")
    private String firstName;

    @NotNull(message = "Lastname is mandatory")
    private String lastName;

    @NotNull(message = "Username is mandatory")
    private String userName;

    @NotNull(message = "Password is mandatory")
    private String password;

    @NotNull(message = "Email Adress is mandatory")
    private String emailAddress;

    private Set<String> userRoles = new HashSet<String>();

    private String secretCode = "";

    private boolean activated = false;

}
