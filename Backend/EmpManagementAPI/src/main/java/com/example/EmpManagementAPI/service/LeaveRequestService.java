package com.example.EmpManagementAPI.service;

import java.util.List;

import ch.qos.logback.core.util.StringUtil;
import com.example.EmpManagementAPI.model.Request.HalfDayLeaveRequest;
import com.example.EmpManagementAPI.repository.Request.HalfDayLeaveRequestRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import com.example.EmpManagementAPI.model.Request.LeaveRequest;
import com.example.EmpManagementAPI.repository.Request.LeaveRequestRepo;
import org.springframework.web.multipart.MultipartFile;


@Service
public class LeaveRequestService {
	@Autowired
    private LeaveRequestRepo requestRepo;

	@Autowired
	private HalfDayLeaveRequestRepo halfDayLeaveRequestRepo;

	@Autowired
	private FileService fileService;

	public ResponseEntity<?> getRequests(String managerId) {
		try {
			if (StringUtil.isNullOrEmpty(managerId)) {
				return ResponseEntity.status(401).body("Unauthorized");
			}
			List<LeaveRequest> requests = requestRepo.findByManagerId(managerId);
			return ResponseEntity.ok(requests);
		} catch (Exception e) {
			return ResponseEntity.status(500).body("Internal Server Error");
		}
	}

	public List<HalfDayLeaveRequest> getHalfDayLeaveRequests(String managerId) {
		return halfDayLeaveRequestRepo.findByManagerId(managerId);
	}

	public ResponseEntity<?> getRequestById(String manager, int requestId) {
		try {
			if (manager == null) {
				return ResponseEntity.status(401).body("Unauthorized");
			}
			LeaveRequest request = requestRepo.findByRequestIdAndManagerId(requestId, manager);
			if (request != null) {
				return ResponseEntity.ok(request);
			} else {
				return ResponseEntity.status(404).body("Leave Request not found");
			}
		} catch (Exception e) {
			return ResponseEntity.status(500).body("Internal Server Error");
		}
	}

	public ResponseEntity<?> addRequest(LeaveRequest leaveRequest, MultipartFile[] files) {
		try {
			if (leaveRequest == null) {
				return ResponseEntity.status(400).body("Bad Request");
			}
			List<String> fileUrls = fileService.addFiles(files, FileService.REQUESTS);
			leaveRequest.setAttachmentUrl(fileUrls);

			requestRepo.save(leaveRequest);
			return ResponseEntity.ok(leaveRequest);
		} catch (Exception e) {
			return ResponseEntity.status(500).body("Internal Server Error");
		}
	}

	public ResponseEntity<?> addHalfDayRequest(HalfDayLeaveRequest leaveRequest, MultipartFile[] files) {
		try {
			if (leaveRequest == null) {
				return ResponseEntity.status(400).body("Bad Request");
			}
			List<String> fileUrls = fileService.addFiles(files, FileService.REQUESTS);
			leaveRequest.setAttachmentUrl(fileUrls);

			halfDayLeaveRequestRepo.save(leaveRequest);
			return ResponseEntity.ok(leaveRequest);
		} catch (Exception e) {
			return ResponseEntity.status(500).body("Internal Server Error");
		}
	}
}
