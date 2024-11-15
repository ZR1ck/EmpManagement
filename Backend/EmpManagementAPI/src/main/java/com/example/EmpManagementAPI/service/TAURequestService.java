
package com.example.EmpManagementAPI.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
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
			List<TimeAttendanceUpdateRequest> requests = tauRequestRepo.findByRequestId(requestId);
			return ResponseEntity.ok(requests);
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

			tauRequestRepo.save(request);
			return ResponseEntity.ok(request);
		} catch (Exception e) {
			return ResponseEntity.status(500).body("Internal Server Error");
		}
	}
}
