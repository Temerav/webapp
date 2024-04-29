package com.imre.webapp.controller;

import com.imre.webapp.model.Item;
import com.imre.webapp.repository.ItemRepository;
import com.imre.webapp.service.ItemService;
import lombok.RequiredArgsConstructor;
import org.springframework.core.io.ClassPathResource;
import org.springframework.core.io.Resource;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.nio.file.Files;
import java.util.List;


@RequestMapping("/item")
@CrossOrigin
@RestController
@RequiredArgsConstructor
public class ItemController {

    private final ItemRepository itemRepository;
    private final ItemService itemService;

    @GetMapping("")
    public List<Item> getItems() {
        return itemService.findAllItem();
    }

    @GetMapping("/get/{id}")
    public Item getItem(
        @PathVariable final String id
    ) {
        return itemService.findItemById(Long.parseLong(id)).orElse(null);
    }

    @GetMapping("/{imagePath}")
    public ResponseEntity<byte[]> getImage(
        @PathVariable String imagePath
    ) {
        try {
            Resource resource = new ClassPathResource("item/" + imagePath);
            byte[] imageBytes = Files.readAllBytes(resource.getFile().toPath());
            return ResponseEntity.ok().contentType(MediaType.IMAGE_JPEG).body(imageBytes);
        } catch (Exception e) {
            e.printStackTrace();
            return null;
        }
    }
}
