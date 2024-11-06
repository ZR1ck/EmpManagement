package com.example.EmpManagementAPI.controller;

import lombok.extern.slf4j.Slf4j;
import org.apache.commons.io.FileUtils;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.io.File;
import java.io.IOException;

@Slf4j
@RestController
@CrossOrigin
@RequestMapping("/images")
public class FileController {

    private String AVATAR_PATH = "uploads/avatar/";
    private final String ACTIVITY_UPLOADS_PATH = "uploads/activities";

    @GetMapping("/uploads/{type}/{filename}")
    public ResponseEntity<byte[]> getImage(@PathVariable String type, @PathVariable String filename) {
        String filePath = getFilePath(type, filename);

        if (filePath == null) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }

        byte[] image;
        try {
            image = FileUtils.readFileToByteArray(new File(filePath));
        } catch (IOException e) {
            log.error("Image loading error: ", e);
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }

        return ResponseEntity.ok().contentType(MediaType.IMAGE_JPEG).body(image);
    }

    private String getFilePath(String type, String filename) {
        return switch (type) {
            case "avatar" -> AVATAR_PATH + filename;
            case "activities" -> ACTIVITY_UPLOADS_PATH + filename;
            default -> null;
        };
    }

}
