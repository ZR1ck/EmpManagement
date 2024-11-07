package com.example.EmpManagementAPI.service;

import lombok.extern.slf4j.Slf4j;
import org.apache.commons.io.FileUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.ArrayList;
import java.util.List;
import java.util.UUID;

@Slf4j
@Service
public class FileService {

    private final String AVATAR_PATH = "uploads/avatar/";
    private final String ACTIVITY_UPLOADS_PATH = "uploads/activities";
    private final String REQUEST_UPLOADS_PATH = "uploads/requests";
    private final String QR_UPLOADS_PATH = "uploads/qr/";

    public static final String ACTIVITIES = "activities";
    public static final String REQUESTS = "requests";
    public static final String AVATAR = "avatar";
    public static final String QR = "qr";

    public ResponseEntity<byte[]> getImage(String type, String filename) {
        String filePath = getFilePath(type, filename);
        byte[] image;
        try {
            image = FileUtils.readFileToByteArray(new File(filePath));
        } catch (IOException e) {
            System.out.println("Image loading error: " + e);
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }

        return ResponseEntity.ok().contentType(MediaType.IMAGE_JPEG).body(image);
    }

    private String getFilePath(String type, String filename) {
        return switch (type) {
            case "avatar" -> AVATAR_PATH + filename;
            case "activities" -> ACTIVITY_UPLOADS_PATH + filename;
            case "requests" -> REQUEST_UPLOADS_PATH + filename;
            case "qr" -> QR_UPLOADS_PATH + filename;
            default -> "others" + filename;
        };
    }

    private String getFileParentPath(String type) {
        return switch (type) {
            case "avatar" -> AVATAR_PATH;
            case "activities" -> ACTIVITY_UPLOADS_PATH;
            case "requests" -> REQUEST_UPLOADS_PATH;
            case "qr" -> QR_UPLOADS_PATH;
            default -> "others";
        };
    }

    public String addFile(MultipartFile file, String type) throws IOException {
        try {
            String filename = UUID.randomUUID() + "_" + file.getOriginalFilename();
            String uploadPath = getFileParentPath(type);
            Path filePath = Paths.get(uploadPath, filename);

            Files.createDirectories(filePath.getParent());

            Files.copy(file.getInputStream(), filePath);

            return "http://localhost:8080/images/uploads/" + type + "/" + filename;
        }
        catch (Exception e) {
            log.error("e: ", e);
            return null;
        }
    }

    public List<String> addFiles(MultipartFile[] files, String type) throws IOException {
        try {
            List<String> listFiles = new ArrayList<>();
            for (MultipartFile file : files) {
                String filename = UUID.randomUUID() + "_" + file.getOriginalFilename();
                String uploadPath = getFileParentPath(type);
                Path filePath = Paths.get(uploadPath, filename);

                Files.createDirectories(filePath.getParent());

                Files.copy(file.getInputStream(), filePath);

                String imgUrl = "http://localhost:8080/images/uploads/" + type + "/" + filename;
                listFiles.add(imgUrl);
            }
            return listFiles;
        }
        catch (Exception e) {
            log.error("e: ", e);
            return null;
        }
    }
}
