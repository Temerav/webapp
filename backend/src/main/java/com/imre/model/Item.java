package com.imre.model;

import org.hibernate.annotations.GenericGenerator;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
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
public class Item {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotNull(message = "Item name mandatory")
    private String itemName;

    @NotNull(message = "Item cost mandatory")
    private int itemCost;

    @NotNull(message = "Item details mandatory")
    private String itemDetails;

    @NotNull(message = "Item picture mandatory")
    private String picturePath;

}
