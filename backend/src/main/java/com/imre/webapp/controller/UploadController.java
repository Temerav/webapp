package com.imre.webapp.controller;

import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;

@RestController
@RequestMapping("/upload")
public class UploadController {

    public static String UPLOAD_DIRECTORY_WORKITEM = STR."\{System.getProperty("user.dir")}/src/main/resources/workitem";

    @PostMapping("/workitem")
    public void uploadImage(
        @RequestParam("image") MultipartFile file
    ) throws IOException {
        Path fileNameAndPath = Paths.get(UPLOAD_DIRECTORY_WORKITEM, file.getOriginalFilename());
        Files.write(fileNameAndPath, file.getBytes());
    }
}