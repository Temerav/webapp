package com.imre.webapp.model;

import jakarta.persistence.*;
import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Table(name = "email")
public class Email {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotNull(message = "firstName cannot be null")
    private String firstName;

    @NotNull(message = "lastName cannot be null")
    private String lastName;

    @NotNull(message = "from cannot be null")
    @Column(name = "from_email")
    private String from;

    @NotNull(message = "to cannot be null")
    @Column(name = "to_email")
    private String to;

    @NotNull(message = "cc cannot be null")
    private String cc;

    @NotNull(message = "subject cannot be null")
    private String subject;

    @NotNull(message = "text cannot be null")
    private String text;

}
