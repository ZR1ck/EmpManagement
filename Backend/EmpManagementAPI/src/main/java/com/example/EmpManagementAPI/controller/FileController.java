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

    @GetMapping("/uploads/avatar/{filename}")
    public ResponseEntity<byte[]> getImage(@PathVariable String filename) {
        byte[] image;
        try {
            image = FileUtils.readFileToByteArray(new File(AVATAR_PATH + filename));
        } catch (IOException e) {
            log.error("Image loading error: ", e);
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
        return ResponseEntity.ok().contentType(MediaType.IMAGE_JPEG).body(image);
    }
}
