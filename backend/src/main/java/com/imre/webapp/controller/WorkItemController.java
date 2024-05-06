package com.imre.webapp.controller;

import com.imre.webapp.model.WorkItem;
import com.imre.webapp.service.WorkItemService;
import lombok.RequiredArgsConstructor;
import org.springframework.core.io.ClassPathResource;
import org.springframework.core.io.Resource;
import org.springframework.core.io.ResourceLoader;
import org.springframework.core.io.support.ResourcePatternUtils;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.io.IOException;
import java.nio.file.Files;
import java.util.Arrays;
import java.util.List;
import java.util.stream.Collectors;


@RequiredArgsConstructor
@RestController
@RequestMapping("/workitem")
public class WorkItemController {

    private final WorkItemService workItemService;
    private final ResourceLoader resourceLoader;

    @GetMapping("")
    public List<WorkItem> getWorkItems () {
        return workItemService.getAllWorkItems();
    }

    @PostMapping("")
    public void addItem (
        @RequestBody final WorkItem newWorkItem
    ) throws Exception {
        workItemService.saveItem(newWorkItem);
    }

    @GetMapping("/get/{id}")
    public WorkItem getWorkItem (
        @PathVariable final String id
    ) {
        return workItemService.getWorkItemById(Long.parseLong(id));
    }

    @PutMapping("/update/{id}")
    public void updateWorkItem (
        @PathVariable final String id,
        @RequestBody final WorkItem newWorkItem
    ) throws Exception {
        workItemService.updateWorkItem(Long.parseLong(id), newWorkItem);
    }

    @DeleteMapping("/delete/{id}")
    public void deleteWorkItem (
        @PathVariable final String id
    ) throws Exception {
        workItemService.deleteWorkItem(Long.parseLong(id));
    }

    @GetMapping("/{imagePath}")
    public ResponseEntity<byte[]> getImage (
        @PathVariable String imagePath
    ) {
        try {
            Resource resource = new ClassPathResource("workitem/" + imagePath);
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
    public List<String> getFileNames () throws IOException {
        Resource[] resources = ResourcePatternUtils
            .getResourcePatternResolver(resourceLoader)
            .getResources("classpath:/workitem/*");

        return Arrays
            .stream(resources)
            .map(Resource::getFilename)
            .collect(Collectors.toList());
    }

}
