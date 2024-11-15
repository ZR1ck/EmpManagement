package com.example.EmpManagementAPI.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RequestPart;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import com.example.EmpManagementAPI.model.LeaveTypes;
import com.example.EmpManagementAPI.model.Request.HalfDayLeaveRequest;
import com.example.EmpManagementAPI.model.Request.LeaveRequest;
import com.example.EmpManagementAPI.model.Request.TimeAttendanceUpdateRequest;
import com.example.EmpManagementAPI.model.Request.WFHRequest;
import com.example.EmpManagementAPI.service.EmpService;
import com.example.EmpManagementAPI.service.LeaveRequestService;
import com.example.EmpManagementAPI.service.LeaveTypesService;
import com.example.EmpManagementAPI.service.TAURequestService;
import com.example.EmpManagementAPI.service.WFHRequestService;

@RestController
@CrossOrigin
@RequestMapping("/api")
public class RequestController {

    @Autowired
    private EmpService empService;

    @Autowired
    private LeaveRequestService requestService;

	@Autowired
    private WFHRequestService wfhRequestService;

    @Autowired
    LeaveTypesService leaveTypesService;

	@Autowired
    private TAURequestService tauRequestService;


    // LeaveRequests

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
	public ResponseEntity<?> sendLeaveRequest(@RequestPart("request") LeaveRequest leaveRequest, @RequestParam("files") MultipartFile[] files) {
		return requestService.addRequest(leaveRequest, files);
	}
	
    @PutMapping("/leaveRequest")
	public ResponseEntity<?> updateLeaveRequest(@RequestPart("request") LeaveRequest leaveRequest, @RequestParam("files") MultipartFile[] files) {
		return requestService.updateRequest(leaveRequest, files);
	}
	
	// HalfDayLeaveRequests

	@PreAuthorize("hasAuthority('Manager')")
	@GetMapping("/halfDayLeaveRequest")
	public ResponseEntity<?> getHalfDayLeaveRequest(@RequestPart("managerId") String managerId) {
		try {
			return new ResponseEntity<>(requestService.getHalfDayLeaveRequests(managerId), HttpStatus.OK);
		}catch (Exception e) {
			return new ResponseEntity<>(null, HttpStatus.INTERNAL_SERVER_ERROR);
		}
	}

    @PostMapping("/halfDayLeaveRequest")
    public ResponseEntity<?> sendHalfDayLeaveRequest(@RequestPart("request") HalfDayLeaveRequest leaveRequest, @RequestParam("files") MultipartFile[] file) {
        return requestService.addHalfDayRequest(leaveRequest, file);
    }

    @PutMapping("/halfDayLeaveRequest")
    public ResponseEntity<?> updateHalfDayLeaveRequest(@RequestPart("request") HalfDayLeaveRequest leaveRequest, @RequestParam("files") MultipartFile[] file) {
        return requestService.updateHalfDayRequest(leaveRequest, file);
    }

	// LeaveTypes

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

	// WFHRequests

    @PreAuthorize("hasAuthority('Manager')")
    @GetMapping("WFHRequests")
    public ResponseEntity<?> getWFHRequests(@RequestPart("managerId") String managerId) {
		return wfhRequestService.getRequests(managerId);
	}

    @PreAuthorize("hasAuthority('Manager')")
    @GetMapping("WFHRequest/{requestId}")
    public ResponseEntity<?> getWFHRequestsById(@RequestPart("managerId") String managerId, @PathVariable int requestId) {
		return wfhRequestService.getRequests(managerId);
	}

	@PostMapping("/WFHRequest")
	public ResponseEntity<?> addWFHRequest(@RequestPart("request") WFHRequest wfhRequest, @RequestParam("files") MultipartFile[] files) {
		return wfhRequestService.addRequest(wfhRequest, files);
	}

    @PutMapping("/WFHRequest")
	public ResponseEntity<?> updateWFHRequest(@RequestPart("request") WFHRequest wfhRequest, @RequestParam("files") MultipartFile[] files) {
		return wfhRequestService.updateRequest(wfhRequest, files);
	}
    
	// Attendance

	@GetMapping("attendance/{empId}")
	public ResponseEntity<?> getTAURequests(@PathVariable String empId) {
		return tauRequestService.getRequestsByEmpId(empId);
	}

	@PostMapping("attendance")
	public ResponseEntity<?> addTAURequest(@RequestPart("request") TimeAttendanceUpdateRequest request) {
		return tauRequestService.addRequest(request);
	}

	@PutMapping("attendance")
	public ResponseEntity<?> updateTAURequest(@RequestPart("request") TimeAttendanceUpdateRequest request) {
		return tauRequestService.updateRequest(request);
	}
}
