package com.example.EmpManagementAPI.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import com.example.EmpManagementAPI.model.Emp;
import com.example.EmpManagementAPI.repository.EmpRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.List;
import java.util.Optional;
import java.util.UUID;

@Service
public class EmpService {

    private final String AVATAR_UPLOADS_PATH = "uploads/avatar";
    private final String QR_UPLOADS_PATH = "uploads/qr/";

    @Autowired
    private EmpRepo empRepo;

    public String getEmpPositionById(String id) {
        return empRepo.getEmpPositionById(id);
    }

    public List<Emp> getAllEmp() {
        return empRepo.findAll();
    }

    public Emp getEmpById(String id) {
        Optional<Emp> emp = empRepo.findById(id);
        return emp.orElse(null);
    }

    public Emp findEmpByName(String name) {
        return empRepo.findEmpByName(name);
    }

    public Emp addEmp(Emp emp, MultipartFile avatar) throws IOException {
        String filename = UUID.randomUUID() + "_" + avatar.getOriginalFilename();
        Path filePath = Paths.get(AVATAR_UPLOADS_PATH, filename);

        Files.createDirectories(filePath.getParent());

        Files.copy(avatar.getInputStream(), filePath);

        String avatarUrl = "http://localhost:8080/images/uploads/avatar/" + filename;
        emp.setAvatarurl(avatarUrl);

        return empRepo.save(emp);
    }


}
