package com.imre.webapp.auth;

import lombok.Data;

@Data
public class AuthResponse {
    private String jwt;
    private String message;
    private Boolean status;
    private String email;
    private String fullName;
    private String role;
}
