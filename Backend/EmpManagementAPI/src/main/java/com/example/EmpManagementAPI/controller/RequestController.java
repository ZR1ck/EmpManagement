package com.example.EmpManagementAPI.controller;

import com.example.EmpManagementAPI.model.Request.*;
import com.example.EmpManagementAPI.service.Request.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RequestPart;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import com.example.EmpManagementAPI.model.LeaveTypes;
import com.example.EmpManagementAPI.service.LeaveTypesService;

@RestController
@CrossOrigin
@RequestMapping("/api")
public class RequestController {

    @Autowired
    private LeaveRequestService leaveRequestService;

	@Autowired
    private WFHRequestService wfhRequestService;

    @Autowired
    private LeaveTypesService leaveTypesService;

	@Autowired
    private TAURequestService tauRequestService;

	@Autowired
	private MultiRequestService multiRequestService;

	@Autowired
	private RequestService requestService;

	// Other Request
	@PreAuthorize("hasAuthority('Manager')")
	@GetMapping("/request")
	public ResponseEntity<?> getRequestById(@RequestParam("requestId") int Id) {
		return requestService.getRequestById(Id);
	}


	// LeaveRequests

    @PreAuthorize("hasAuthority('Manager')")
    @GetMapping("/allLeaveRequest")
	public ResponseEntity<?> getLeaveRequests(@RequestParam("managerId") String managerId) {
		return leaveRequestService.getRequests(managerId);
	}

    @PreAuthorize("hasAuthority('Manager')")
	@GetMapping("/leaveRequest")
	public ResponseEntity<?> getLeaveRequestById(@RequestParam("requestId") int Id) {
		return leaveRequestService.getRequestById(Id);
	}

	@PostMapping("/leaveRequest")
	public ResponseEntity<?> sendLeaveRequest(@RequestPart("request") LeaveRequest leaveRequest, @RequestParam("files") MultipartFile[] files) {
		return leaveRequestService.addRequest(leaveRequest, files);
	}
	
    @PutMapping("/leaveRequest")
	public ResponseEntity<?> updateLeaveRequest(@RequestPart("request") LeaveRequest leaveRequest, @RequestParam("files") MultipartFile[] files) {
		return leaveRequestService.updateRequest(leaveRequest, files);
	}
	// Nhân viên xóa đơn xin nghỉ chưa được xét duyệt
	@PreAuthorize("hasAuthority('Employee')")
	@DeleteMapping("/leaveRequest")
	public ResponseEntity<?> deleteLeaveRequest(@RequestPart("request") LeaveRequest leaveRequest) {
		return leaveRequestService.deleteRequest(leaveRequest);
	}
	
	// HalfDayLeaveRequests

	@PreAuthorize("hasAuthority('Manager')")
	@GetMapping("/allHalfDayLeaveRequest")
	public ResponseEntity<?> getHalfDayLeaveRequest(@RequestParam("managerId") String managerId) {
		try {
			return new ResponseEntity<>(leaveRequestService.getHalfDayLeaveRequests(managerId), HttpStatus.OK);
		}catch (Exception e) {
			return new ResponseEntity<>(null, HttpStatus.INTERNAL_SERVER_ERROR);
		}
	}

	@PreAuthorize("hasAuthority('Manager')")
	@GetMapping("/halfDayLeaveRequest")
	public ResponseEntity<?> getHalfDayLeaveRequestById(@RequestParam("requestId") int Id) {
		return leaveRequestService.getHalfDayLeaveRequestById(Id);
	}

    @PostMapping("/halfDayLeaveRequest")
    public ResponseEntity<?> sendHalfDayLeaveRequest(@RequestPart("request") HalfDayLeaveRequest leaveRequest, @RequestParam("files") MultipartFile[] file) {
        return leaveRequestService.addHalfDayRequest(leaveRequest, file);
    }

    @PutMapping("/halfDayLeaveRequest")
    public ResponseEntity<?> updateHalfDayLeaveRequest(@RequestPart("request") HalfDayLeaveRequest leaveRequest, @RequestParam("files") MultipartFile[] file) {
        return leaveRequestService.updateHalfDayRequest(leaveRequest, file);
    }
	// Nhân viên xóa đơn xin nghỉ chưa được xét duyệt
	@PreAuthorize("hasAuthority('Employee')")
	@DeleteMapping("/halfDayLeaveRequest")
	public ResponseEntity<?> deleteLeaveRequest(@RequestPart("request") HalfDayLeaveRequest leaveRequest) {
		return leaveRequestService.deleteHalfDayRequest(leaveRequest);
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
    @GetMapping("/WFHRequest")
    public ResponseEntity<?> getWFHRequestById(@RequestParam("requestId") int requestId) {
		return wfhRequestService.getRequestById(requestId);
	}

	@PostMapping("/WFHRequest")
	public ResponseEntity<?> addWFHRequest(@RequestPart("request") WFHRequest wfhRequest, @RequestParam("files") MultipartFile[] files) {
		return wfhRequestService.addRequest(wfhRequest, files);
	}

    @PutMapping("/WFHRequest")
	public ResponseEntity<?> updateWFHRequest(@RequestPart("request") WFHRequest wfhRequest, @RequestParam("files") MultipartFile[] files) {
		return wfhRequestService.updateRequest(wfhRequest, files);
	}

	// Nhân viên xóa đơn xin nghỉ chưa được xét duyệt
	@PreAuthorize("hasAuthority('Employee')")
	@DeleteMapping("/WFHRequest")
	public ResponseEntity<?> deleteWFHRequest(@RequestPart("request") WFHRequest wfhRequest) {
		return wfhRequestService.deleteRequest(wfhRequest);
	}
    
	// Attendance

	@GetMapping("attendance/{empId}")
	public ResponseEntity<?> getTAURequests(@PathVariable String empId) {
		return tauRequestService.getRequestsByEmpId(empId);
	}

	@GetMapping("/TAURequest")
	public ResponseEntity<?> getTAURequestById(@RequestParam("requestId") int requestId) {
		return tauRequestService.getRequestById(requestId);
	}

	@PostMapping("attendance")
	public ResponseEntity<?> addTAURequest(@RequestPart("request") TimeAttendanceUpdateRequest request) {
		return tauRequestService.addRequest(request);
	}

	@PutMapping("attendance")
	public ResponseEntity<?> updateTAURequest(@RequestPart("request") TimeAttendanceUpdateRequest request) {
		return tauRequestService.updateRequest(request);
	}

	// Get all types of request
	@PreAuthorize("hasAuthority('Manager')")
	@GetMapping("/requests/all")
	public ResponseEntity<?> getAllRequests(@RequestParam("managerId") String managerId) {
		return multiRequestService.getAllRequests(managerId);
	}

	/**
	 * Controllers from here down perform actions to update the status of the requests
	 * */
	// For base requests
	@PreAuthorize("hasAuthority('Manager')")
	@PostMapping("/request/approve")
	public ResponseEntity<?> approveRequest(@RequestPart("requestId") String id, @RequestPart("status") String status, @RequestPart("requestType") String requestType) {
		return requestService.updateRequestStatus(id, status, requestType);
	}

	// For leave requests
	@PreAuthorize("hasAuthority('Manager')")
	@PostMapping("/leaveRequest/approve")
	public ResponseEntity<?> approveLeaveRequest(@RequestPart("requestId") String id, @RequestPart("status") String status, @RequestPart("requestType") String requestType) {
		return leaveRequestService.updateRequestStatus(id, status, requestType);
	}

	// For half day leave requests
	@PreAuthorize("hasAuthority('Manager')")
	@PostMapping("/halfDayLeaveRequest/approve")
	public ResponseEntity<?> approveHalfDayLeaveRequest(@RequestPart("requestId") String id, @RequestPart("status") String status, @RequestPart("requestType") String requestType) {
		return leaveRequestService.updateHalfDayRequestStatus(id, status, requestType);
	}

	// For time attendance update requests
	@PreAuthorize("hasAuthority('Manager')")
	@PostMapping("/TAURequest/approve")
	public ResponseEntity<?> approveTAURequest(@RequestPart("requestId") String id, @RequestPart("status") String status, @RequestPart("requestType") String requestType) {
		return tauRequestService.updateRequestStatus(id, status, requestType);
	}

	// For WFH requests
	@PreAuthorize("hasAuthority('Manager')")
	@PostMapping("/WFHRequest/approve")
	public ResponseEntity<?> approveWFHRequest(@RequestPart("requestId") String id, @RequestPart("status") String status, @RequestPart("requestType") String requestType) {
		return wfhRequestService.updateRequestStatus(id, status, requestType);
	}
}
