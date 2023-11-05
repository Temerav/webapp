package com.imre.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.imre.model.Item;

public interface ItemRepository extends
    JpaRepository<Item, Long>{

    Optional<Item> findItemByName(String itemName);

    Item findItemById(Long id);

}
