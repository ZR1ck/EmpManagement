package com.example.EmpManagementAPI.controller;

import com.example.EmpManagementAPI.service.FileService;
import lombok.extern.slf4j.Slf4j;
import org.apache.commons.io.FileUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.io.File;
import java.io.IOException;

@Slf4j
@RestController
@CrossOrigin
public class FileController {

    @Autowired
    private FileService fileService;

    @GetMapping("/uploads/{type}/{filename}")
    public ResponseEntity<byte[]> getImage(@PathVariable String type, @PathVariable String filename) {
        return fileService.getImage(type, filename);
    }

    @GetMapping("file/uploads/{type}/{filename}")
    public ResponseEntity<byte[]> getFile(@PathVariable String type, @PathVariable String filename) {
        return fileService.getFile(type, filename);
    }

}
