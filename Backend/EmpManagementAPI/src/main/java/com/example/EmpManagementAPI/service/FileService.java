package com.example.EmpManagementAPI.service;

import lombok.extern.slf4j.Slf4j;
import org.apache.commons.io.FileUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.*;
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

    private final String HOST = "http://localhost:8080/";

    private final String AVATAR_PATH = "uploads/avatar/";
    private final String ACTIVITY_UPLOADS_PATH = "uploads/activities/";
    private final String REQUEST_UPLOADS_PATH = "uploads/requests/";
    private final String QR_UPLOADS_PATH = "uploads/qr/";
    private final String OTHERS_UPLOADS_PATH = "uploads/others/";

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
            default -> OTHERS_UPLOADS_PATH + filename;
        };
    }

    private String getFileParentPath(String type) {
        return switch (type) {
            case "avatar" -> AVATAR_PATH;
            case "activities" -> ACTIVITY_UPLOADS_PATH;
            case "requests" -> REQUEST_UPLOADS_PATH;
            case "qr" -> QR_UPLOADS_PATH;
            default -> OTHERS_UPLOADS_PATH;
        };
    }

    public String addFile(MultipartFile file, String type) throws IOException {
        try {
            String filename = UUID.randomUUID() + "_" + file.getOriginalFilename();
            String uploadPath = getFileParentPath(type);
            Path filePath = Paths.get(uploadPath, filename);

            Files.createDirectories(filePath.getParent());

            Files.copy(file.getInputStream(), filePath);

            return "uploads/" + type + "/" + filename;
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

                String imgUrl = "uploads/" + type + "/" + filename;
                listFiles.add(imgUrl);
            }
            return listFiles;
        }
        catch (Exception e) {
            log.error("e: ", e);
            return null;
        }
    }

    public ResponseEntity<byte[]> getFile(String type, String filename) {
        String filePath = getFilePath(type, filename);
        byte[] fileContent;

        try {
            File file = new File(filePath);

            fileContent = FileUtils.readFileToByteArray(file);

            String contentType = Files.probeContentType(file.toPath());
            if (contentType == null) {
                contentType = "application/octet-stream";
            }

            HttpHeaders headers = new HttpHeaders();
            headers.setContentType(MediaType.parseMediaType(contentType));
            headers.setContentDisposition(ContentDisposition.builder("attachment").filename(filename).build());

            return ResponseEntity.ok().headers(headers).body(fileContent);
        } catch (IOException e) {
            System.out.println("File loading error: " + e);
            return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
        }
    }
}
