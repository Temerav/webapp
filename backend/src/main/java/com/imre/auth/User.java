package com.imre.auth;

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
    private final String firstName;

    @NotNull(message = "Lastname is mandatory")
    private final String lastName;

    @NotNull(message = "Username is mandatory")
    private final String userName;

    @NotNull(message = "Password is mandatory")
    private final String password;

    @NotNull(message = "Email Adress is mandatory")
    private final String emailAddress;

    private final String secretCode = "";

    private final boolean activated = false;

}
