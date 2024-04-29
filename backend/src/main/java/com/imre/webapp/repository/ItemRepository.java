package com.imre.webapp.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.imre.webapp.model.Item;

@Repository
public interface ItemRepository extends
    JpaRepository<Item, Long>{

    Optional<Item> findItemByItemName(String itemName);

    Optional<Item> findItemById(Long id);
}
