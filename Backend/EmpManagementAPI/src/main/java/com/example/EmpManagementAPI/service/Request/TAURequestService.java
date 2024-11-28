
package com.example.EmpManagementAPI.service.Request;

import java.util.List;

import com.example.EmpManagementAPI.model.Request.HalfDayLeaveRequest;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import com.example.EmpManagementAPI.model.Request.TimeAttendanceUpdateRequest;
import com.example.EmpManagementAPI.repository.EmpRepo;
import com.example.EmpManagementAPI.repository.Request.TAURequestRepo;

import ch.qos.logback.core.util.StringUtil;

@Service
public class TAURequestService {
	 @Autowired
    private EmpRepo empRepo;

	@Autowired
	private TAURequestRepo tauRequestRepo;

	public ResponseEntity<?> getRequestsByEmpId(String empId) {
		try {
			if (StringUtil.isNullOrEmpty(empId)) {
				return ResponseEntity.status(401).body("Unauthorized");
			}
			List<TimeAttendanceUpdateRequest> requests = tauRequestRepo.findByEmpId(empId);
			return ResponseEntity.ok(requests);
		} catch (Exception e) {
			return ResponseEntity.status(500).body("Internal Server Error");
		}
	}

	public ResponseEntity<?> getRequestById(int requestId) {
		try {
			if (requestId < 0) {
				return ResponseEntity.status(400).body("Bad Request");
			}
			TimeAttendanceUpdateRequest request = tauRequestRepo.findByRequestId(requestId);
			return new ResponseEntity<>(request, HttpStatus.OK);
		} catch (Exception e) {
			return ResponseEntity.status(500).body("Internal Server Error");
		}
	}

	public ResponseEntity<?> addRequest(TimeAttendanceUpdateRequest request) {
		try {
			if (request == null) {
				return ResponseEntity.status(400).body("Bad Request");
			}

			tauRequestRepo.save(request);
			return ResponseEntity.ok(request);
		} catch (Exception e) {
			return ResponseEntity.status(500).body("Internal Server Error");
		}
	}

	public ResponseEntity<?> updateRequest(TimeAttendanceUpdateRequest request) {
		try {
			if (request == null) {
				return ResponseEntity.status(400).body("Bad Request");
			}
			// Kiểm tra xem đơn xin nghỉ đã được duyệt chưa
			if ("Pending".equals(request.getApprovalStatus())) {
				return ResponseEntity.status(400).body("Request has been approved");
			}
			tauRequestRepo.save(request);
			return ResponseEntity.ok(request);
		} catch (Exception e) {
			return ResponseEntity.status(500).body("Internal Server Error");
		}
	}



	public ResponseEntity<?> updateRequestStatus(String id, String status, String requestType) {
		if (!requestType.equals(TimeAttendanceUpdateRequest.class.getSimpleName())) {
			return new ResponseEntity<>("Wrong request type", HttpStatus.BAD_REQUEST);
		}
		try {
			if (tauRequestRepo.updateRequestStatus(id, status) > 0) {
				return new ResponseEntity<>("Success", HttpStatus.OK);
			}
			else return new ResponseEntity<>("Failed", HttpStatus.BAD_REQUEST);
		}
		catch (Exception e) {
			return new ResponseEntity<>(null, HttpStatus.INTERNAL_SERVER_ERROR);
		}
	}
}
