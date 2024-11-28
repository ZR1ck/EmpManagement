package com.example.EmpManagementAPI.controller;

import com.example.EmpManagementAPI.DTO.EmpJoinActivityRequest;
import com.example.EmpManagementAPI.DTO.EmpJoinActivityResponse;
import com.example.EmpManagementAPI.service.Activity.EmployeeActivityService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api")
@CrossOrigin
public class EmployeeActivityController {
    private final EmployeeActivityService employeeActivityService;

    public EmployeeActivityController(EmployeeActivityService employeeActivityService) {
        this.employeeActivityService = employeeActivityService;
    }

    @PostMapping("/employee/activity")
    public ResponseEntity<?> joinActivity(@RequestBody EmpJoinActivityRequest requestToJoin) {
        try {
            return new ResponseEntity<>(employeeActivityService.joinActivity(requestToJoin), HttpStatus.OK);
        }
        catch (Exception e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }
}
