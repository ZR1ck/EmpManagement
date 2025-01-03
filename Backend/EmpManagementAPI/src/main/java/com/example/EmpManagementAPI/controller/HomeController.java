package com.example.EmpManagementAPI.controller;

import com.example.EmpManagementAPI.service.EmpService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class HomeController {

    @Autowired
    private EmpService empService;

    @GetMapping("/test")
    public ResponseEntity<?> func() {
        try {
            return new ResponseEntity<>(empService.getAllEmp(), HttpStatus.OK);
        }
        catch (Exception e) {
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
}
