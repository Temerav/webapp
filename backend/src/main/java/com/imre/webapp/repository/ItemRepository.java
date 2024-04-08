package com.imre.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.imre.model.Item;

@Repository
public interface ItemRepository extends
    JpaRepository<Item, Long>{

    Optional<Item> findItemByItemName(String itemName);

    Item findItemById(Long id);

}
