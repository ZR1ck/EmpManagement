package com.example.EmpManagementAPI.controller;

import com.example.EmpManagementAPI.model.Emp;
import com.example.EmpManagementAPI.service.EmpService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@CrossOrigin
@RequestMapping("/api")
public class EmpController {

    @Autowired
    private EmpService empService;

//    @PreAuthorize("hasAuthority('Manager')")
    @GetMapping("/employees")
    public ResponseEntity<List<Emp>> getAllEmployees() {
        try {
            return new ResponseEntity<>(empService.getAllEmp(), HttpStatus.OK);
        }
        catch (Exception e) {
            return new ResponseEntity<>(null, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

//    @PreAuthorize("hasAuthority('Employee')")
    @GetMapping("/employee/{id}")
    public ResponseEntity<Emp> getEmpById(@PathVariable String id) {
        try {
            Emp emp = empService.getEmpById(id);
            if (emp != null) {
                return new ResponseEntity<>(emp, HttpStatus.OK);
            }
            return new ResponseEntity<>(null, HttpStatus.NOT_FOUND);
        }
        catch (Exception e) {
            return new ResponseEntity<>(null, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

}
