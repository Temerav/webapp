package com.imre.webapp.controller;

import com.imre.webapp.model.WorkItem;
import com.imre.webapp.service.WorkItemService;
import lombok.RequiredArgsConstructor;
import org.springframework.core.io.ClassPathResource;
import org.springframework.core.io.Resource;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.io.IOException;
import java.nio.file.Files;
import java.util.List;

@RequiredArgsConstructor
@RestController
@RequestMapping("/workitem")
public class WorkItemController {

    private final WorkItemService workItemService;

    @GetMapping("")
    public List<WorkItem> getWorkItems() {
        return workItemService.getAllWorkItems();
    }

    @GetMapping("/{imagePath}")
    public ResponseEntity<byte[]> getImage(
        @PathVariable String imagePath
    ) {
        try {
            Resource resource = new ClassPathResource("workitem/" + imagePath);
            byte[] imageBytes = Files.readAllBytes(resource.getFile().toPath());
            return ResponseEntity.ok().contentType(MediaType.IMAGE_JPEG).body(imageBytes);
        } catch (Exception e) {
            e.printStackTrace();
            return null;
        }
    }
}
