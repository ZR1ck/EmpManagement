package com.example.EmpManagementAPI.controller;

import com.example.EmpManagementAPI.model.Emp;
import com.example.EmpManagementAPI.model.Request.LeaveRequest;
import com.example.EmpManagementAPI.service.EmpService;
import com.example.EmpManagementAPI.service.LeaveRequestService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;
import java.util.List;
import java.util.UUID;

@RestController
@CrossOrigin
@RequestMapping("/api")
public class EmpController {

    @Autowired
    private EmpService empService;

    @Autowired
    private LeaveRequestService requestService;

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

    @PreAuthorize("hasAuthority('Manager')")
    @GetMapping("/leaveRequest")
	public ResponseEntity<?> getLeaveRequests(@RequestPart("managerId") String managerId) {
		return requestService.getRequests(managerId);
	}

    @PreAuthorize("hasAuthority('Manager')")
	@GetMapping("/leaveRequest/{Id}")
	public ResponseEntity<?> getLeaveRequestById(@RequestPart("managerId") String managerId, @PathVariable int Id) {
		return requestService.getRequestById(managerId, Id);
	}
	
	@PostMapping("/leaveRequest")
	public ResponseEntity<?> sendLeaveRequest(@RequestBody LeaveRequest leaveRequest) {
		return requestService.addRequest(leaveRequest);
	}
    
}
