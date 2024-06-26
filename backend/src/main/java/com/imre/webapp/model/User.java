package com.imre.webapp.model;

import com.fasterxml.jackson.annotation.JsonProperty;
import jakarta.persistence.*;
import jakarta.validation.constraints.NotNull;
import lombok.*;

@Entity
@Getter
@Setter
@RequiredArgsConstructor
@Table(name="User", schema = "public")
public class User {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotNull(message = "Name is mandatory")
    private String fullName;

    @NotNull(message = "Email is mandatory")
    private String email;

    @JsonProperty(access = JsonProperty.Access.WRITE_ONLY)
    @NotNull(message = "Password is mandatory")
    private String password;

    @NotNull(message = "Role is mandatory")
    private String role = "ROLE_CUSTOMER";

    @NotNull(message = "Mobile is mandatory")
    private String mobile;

}
