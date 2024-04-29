package com.imre.webapp.service;

import org.springframework.stereotype.Service;

import com.imre.webapp.model.Item;
import com.imre.webapp.repository.ItemRepository;

import lombok.RequiredArgsConstructor;

import java.util.List;
import java.util.Optional;


@RequiredArgsConstructor
@Service
public class ItemService {

    private final ItemRepository itemRepository;
    public Optional<Item> findItemById(
        final Long id
    ){
        return itemRepository.findItemById(id);
    }


    public void save(
        final Item newItem
    ) throws Exception {
        var saveItem = new Item();
        var dbItem = itemRepository.findItemByItemName(newItem.getItemName());

        if(!dbItem.isPresent()) {
            saveItem.setItemName(newItem.getItemName());
            saveItem.setItemCost(newItem.getItemCost());
            saveItem.setItemDetails(newItem.getItemDetails());
            saveItem.setPicturePath(newItem.getPicturePath());

            itemRepository.save(saveItem);
        } else {
            throw new Exception("Item with name: " + newItem.getItemName() +  " not exist");
        }
    }

    public void updateItem(
        final Long id,
        final Item updateItem
    ) throws Exception {
        try {
            var dbItem = itemRepository.findItemById(id).orElse(null);

            if(dbItem != null) {
                dbItem.setItemName(updateItem.getItemName());
                dbItem.setItemCost(updateItem.getItemCost());
                dbItem.setItemDetails(updateItem.getItemDetails());
                dbItem.setPicturePath(updateItem.getPicturePath());

                itemRepository.save(dbItem);
            }

        } catch(Exception ex) {
            throw new Exception("Item with id: " + id + " not exist", ex);
        }
    }

    public void deleteItem(
        final Long id
    ) throws Exception {
        try {
            itemRepository.findItemById(id).ifPresent(itemRepository::delete);
        } catch(Exception ex) {
            throw new Exception("Item with id: " + id + " not exist", ex);
        }
    }

    public List<Item> findAllItem() {
        return itemRepository.findAll();
    }
}
