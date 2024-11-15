package com.example.EmpManagementAPI.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestPart;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import com.example.EmpManagementAPI.model.Emp;
import com.example.EmpManagementAPI.repository.Request.HalfDayLeaveRequestRepo;
import com.example.EmpManagementAPI.service.EmpService;
import com.example.EmpManagementAPI.service.LeaveRequestService;
import com.example.EmpManagementAPI.service.LeaveTypesService;

@RestController
@CrossOrigin
@RequestMapping("/api")
public class EmpController {

    @Autowired
    private EmpService empService;

    @Autowired
    private LeaveRequestService requestService;

    @Autowired
    LeaveTypesService leaveTypesService;
    private HalfDayLeaveRequestRepo halfDayLeaveRequestRepo;

    //    @PreAuthorize("hasAnyAuthority('Manager', 'HR')")
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

//    @PreAuthorize("hasAnyAuthority('HR', 'Manager')")
    @PostMapping("/employee")
    public ResponseEntity<Emp> addEmp(@RequestPart("emp") Emp emp, @RequestPart("avatar") MultipartFile avatar) {
        try {
            return new ResponseEntity<>(empService.addEmp(emp, avatar), HttpStatus.CREATED);
        }
        catch (Exception e) {
            return new ResponseEntity<>(null, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
}
