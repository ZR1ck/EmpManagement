package com.example.EmpManagementAPI.controller;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import com.example.EmpManagementAPI.model.Emp;
import com.example.EmpManagementAPI.model.Request.LeaveRequest;
import com.example.EmpManagementAPI.service.EmpService;
import com.example.EmpManagementAPI.service.LeaveRequestService;



@RestController
@CrossOrigin
public class EmpController {
	@Autowired
	LeaveRequestService requestService;
	@Autowired
	EmpService empService;

	@GetMapping("/emp")
	public ResponseEntity<?> getAllEmps() {
		return empService.getAllEmps();
	}

	
	@GetMapping("/leaveRequest")
	public ResponseEntity<?> getLeaveRequests(@RequestBody Emp manager) {
		return requestService.getRequests(manager);
	}

	@GetMapping("/leaveRequest/{Id}")
	public ResponseEntity<?> getLeaveRequestById(@RequestBody Emp manager, @PathVariable("Id") String id) {
		return requestService.getRequestById(manager, id);
	}
	
	@PostMapping("/leaveRequest")
	public ResponseEntity<?> sendLeaveRequest(@RequestBody LeaveRequest leaveRequest) {
		return requestService.addRequest(leaveRequest);
	}
}
