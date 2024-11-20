package com.example.EmpManagementAPI.controller;

import java.util.List;

import com.example.EmpManagementAPI.DTO.EmpDTO;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RequestPart;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import com.example.EmpManagementAPI.model.Emp;
import com.example.EmpManagementAPI.model.LeaveTypes;
import com.example.EmpManagementAPI.model.Request.HalfDayLeaveRequest;
import com.example.EmpManagementAPI.model.Request.LeaveRequest;
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

    @PreAuthorize("hasAnyAuthority('Manager', 'HR')")
    @GetMapping("/employees/department/{deptno}")
    public ResponseEntity<List<Emp>> getEmpByDept(@PathVariable int deptno) {
        try {
            return new ResponseEntity<>(empService.findEmpsByDept(deptno), HttpStatus.OK);
        }
        catch (Exception e) {
            return new ResponseEntity<>(null, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @PreAuthorize("hasAnyAuthority('Manager', 'HR')")
    @GetMapping("/employees/dept/{deptno}")
    public ResponseEntity<List<EmpDTO>> getEmpDTOByDept(@PathVariable int deptno) {
        try {
            return new ResponseEntity<>(empService.findEmpDTOByDept(deptno), HttpStatus.OK);
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

    @PreAuthorize("hasAuthority('Manager')")
    @GetMapping("/halfDayLeaveRequest")
    public ResponseEntity<?> getHalfDayLeaveRequest(@RequestPart("managerId") String managerId) {
        try {
            return new ResponseEntity<>(requestService.getHalfDayLeaveRequests(managerId), HttpStatus.OK);
        }catch (Exception e) {
            return new ResponseEntity<>(null, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
	
	@PostMapping("/leaveRequest")
	public ResponseEntity<?> sendLeaveRequest(@RequestPart("request") LeaveRequest leaveRequest, @RequestParam("files") MultipartFile[] files) {
		return requestService.addRequest(leaveRequest, files);
	}

    @PostMapping("/halfDayLeaveRequest")
    public ResponseEntity<?> sendHalfDayLeaveRequest(@RequestPart("request") HalfDayLeaveRequest leaveRequest, @RequestParam("files") MultipartFile[] file) {
        return requestService.addHalfDayRequest(leaveRequest, file);
    }

    @GetMapping("leaveTypes/{empId}/{year}")
    public ResponseEntity<?> getLeaveType(@PathVariable String empId, @PathVariable int year) {
        try {
            return new ResponseEntity<>(leaveTypesService.getLeaveTypeByEmpIdAndYear(empId, year), HttpStatus.OK);
        }
        catch (Exception e) {
            return new ResponseEntity<>(null, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @PostMapping("updateLeaveTypes/{empId}")
    public ResponseEntity<?> updateLeaveType(@RequestBody LeaveTypes leaveTypes, @PathVariable String empId) {
        try {
            return new ResponseEntity<>(leaveTypesService.updateLeaveType(leaveTypes, empId), HttpStatus.OK);
        }
        catch (Exception e) {
            return new ResponseEntity<>(null, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
}
