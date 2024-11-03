package com.example.EmpManagementAPI.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import com.example.EmpManagementAPI.model.Emp;
import com.example.EmpManagementAPI.repository.EmpRepo;

@Service
public class EmpService {

    @Autowired
    private EmpRepo empRepo;

    public String getEmpPositionById(String id) {
        return empRepo.getEmpPositionById(id);
    }

    public ResponseEntity<?> getAllEmps() {
        try {
            List<Emp> emps = empRepo.findAll();
            return ResponseEntity.ok(emps);
        } catch (Exception e) {
            return ResponseEntity.status(500).body("Internal Server Error");
        }
    }
}
