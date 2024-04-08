package com.imre.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.imre.model.Item;
import com.imre.repository.ItemRepository;
import com.imre.service.ItemService;

import lombok.RequiredArgsConstructor;


@RequestMapping("/v1/item")
@CrossOrigin
@RestController
public class ItemController {

    private final ItemRepository itemRepository;
    private final ItemService itemService;

    public ItemController(
        final ItemRepository itemRepository,
        final ItemService itemService
    ) {
      this.itemRepository = itemRepository;
      this.itemService = itemService;
    }

    @GetMapping("")
    public List<Item> getItems() {
        return itemRepository.findAll();
    }

    @PostMapping("")
    public void addItem(
        @RequestBody final Item newItem
    ) throws Exception {
        itemService.save(newItem);
    }

    @GetMapping("/{id}")
    public Item getItem(
        @PathVariable final Long id
    ) throws Exception {
        var item = itemRepository.findItemById(id);
        if(item != null){
            return item;
        } else {
            throw new Exception(
                "Item with id: " + id + " not exist"
            );
        }
    }

    @PutMapping("/{id}")
    public void updateItem(
        @PathVariable final Long id,
        @RequestBody final Item updateItem
    ) throws Exception {
        itemService.updateItem(
            id,
            updateItem
        );
    }

    @DeleteMapping("/{id}")
    public void deleteItem(
        @PathVariable final Long id
    ) throws Exception {
        itemService.deleteItem(id);
    }

}
