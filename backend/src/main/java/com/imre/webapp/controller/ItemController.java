package com.imre.webapp.controller;

import com.imre.webapp.model.Item;
import com.imre.webapp.repository.ItemRepository;
import com.imre.webapp.service.ItemService;
import lombok.RequiredArgsConstructor;
import org.springframework.core.io.ClassPathResource;
import org.springframework.core.io.Resource;
import org.springframework.core.io.ResourceLoader;
import org.springframework.core.io.support.ResourcePatternUtils;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.io.IOException;
import java.nio.file.Files;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;
import java.util.stream.Collectors;


@RequestMapping("/item")
@CrossOrigin
@RestController
@RequiredArgsConstructor
public class ItemController {

    private final ItemRepository itemRepository;
    private final ItemService itemService;
    private final ResourceLoader resourceLoader;

    @GetMapping("")
    public List<Item> getItems () {
        return itemService.findAllItem();
    }

    @GetMapping("/get/{id}")
    public Item getItem (
        @PathVariable final String id
    ) {
        return itemService.findItemById(Long.parseLong(id)).orElse(null);
    }

    @PutMapping("/update/{id}")
    public void updateItem (
        @PathVariable final String id,
        @RequestBody final Item newItem
    )
        throws Exception {
        itemService.updateItem(Long.parseLong(id), newItem);
    }

    @PostMapping("")
    public void addItem (
        @RequestBody final Item newItem
    ) {
        itemService.saveItem(newItem);
    }

    @DeleteMapping("/delete/{id}")
    public void deleteItem (
        @PathVariable final String id
    )
        throws Exception {
        itemService.deleteItem(Long.parseLong(id));
    }

    @GetMapping("/{imagePath}")
    public ResponseEntity<byte[]> getImage (
        @PathVariable String imagePath
    ) {
        try {
            Resource resource = new ClassPathResource("item/" + imagePath);
            byte[] imageBytes = Files.readAllBytes(resource.getFile().toPath());
            return ResponseEntity
                .ok()
                .contentType(MediaType.IMAGE_JPEG)
                .body(imageBytes);
        } catch (Exception e) {
            e.printStackTrace();
            return null;
        }
    }

    @GetMapping("/paths")
    public List<String> getFileNames() throws IOException {
        Resource[] resources = ResourcePatternUtils
            .getResourcePatternResolver(resourceLoader)
            .getResources("classpath:/item/*");

        return Arrays.stream(resources)
            .map(Resource::getFilename)
            .collect(Collectors.toList());
    }

}
