
package com.example.EmpManagementAPI.service.Request;

import java.util.List;

import com.example.EmpManagementAPI.service.FileService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;


import com.example.EmpManagementAPI.model.Request.WFHRequest;
import com.example.EmpManagementAPI.repository.EmpRepo;
import com.example.EmpManagementAPI.repository.Request.WFHRequestRepo;

import ch.qos.logback.core.util.StringUtil;

@Service
public class WFHRequestService {
	 @Autowired
    private EmpRepo empRepo;

	@Autowired
	private WFHRequestRepo wfhRequestRepo;

    @Autowired
    private FileService fileService;

	public ResponseEntity<?> getRequests(String managerId) {
		try {
			if (StringUtil.isNullOrEmpty(managerId)) {
				return ResponseEntity.status(401).body("Unauthorized");
			}
			List<WFHRequest> requests = wfhRequestRepo.findByManagerId(managerId);
			return ResponseEntity.ok(requests);
		} catch (Exception e) {
			return ResponseEntity.status(500).body("Internal Server Error");
		}
	}

	public ResponseEntity<?> getRequestById(int requestId) {
		try {
			WFHRequest request = wfhRequestRepo.findByRequestId(requestId);
			return new ResponseEntity<>(request, HttpStatus.OK);
		} catch (Exception e) {
			return ResponseEntity.status(500).body("Internal Server Error");
		}
	}

	public ResponseEntity<?> addRequest(WFHRequest wfhRequest, MultipartFile[] files) {
		try {
			if (wfhRequest == null) {
				return ResponseEntity.status(400).body("Bad Request");
			}
			List<String> fileUrls = fileService.addFiles(files, FileService.REQUESTS);
			wfhRequest.setAttachmentUrl(fileUrls);

			wfhRequestRepo.save(wfhRequest);
			return ResponseEntity.ok(wfhRequest);
		} catch (Exception e) {
			return ResponseEntity.status(500).body("Internal Server Error");
		}
	}

	public ResponseEntity<?> updateRequest(WFHRequest wfhRequest, MultipartFile[] files) {
		try {
			if (wfhRequest == null) {
				return ResponseEntity.status(400).body("Bad Request");
			}
			List<String> fileUrls = fileService.addFiles(files, FileService.REQUESTS);
			wfhRequest.setAttachmentUrl(fileUrls);

			wfhRequestRepo.save(wfhRequest);
			return ResponseEntity.ok(wfhRequest);
		} catch (Exception e) {
			return ResponseEntity.status(500).body("Internal Server Error");
		}
	}

	public ResponseEntity<?> deleteRequest(WFHRequest wfhRequest) {
		try {
			if (wfhRequest == null) {
				return ResponseEntity.status(400).body("Bad Request");
			}
			// Kiểm tra xem đơn xin nghỉ đã được duyệt chưa
			if ("Pending".equals(wfhRequest.getApprovalStatus())) {
				return ResponseEntity.status(400).body("Request has been approved");
			}
			wfhRequestRepo.delete(wfhRequest);
			return ResponseEntity.ok("Request Deleted");
		} catch (Exception e) {
			return ResponseEntity.status(500).body("Internal Server Error");
		}
	}

	public ResponseEntity<?> updateRequestStatus(String id, String status, String requestType) {
		if (!requestType.equals(WFHRequest.class.getSimpleName())) {
			return new ResponseEntity<>("Wrong request type", HttpStatus.BAD_REQUEST);
		}
		try {
			if (wfhRequestRepo.updateRequestStatus(id, status) > 0) {
				return new ResponseEntity<>("Success", HttpStatus.OK);
			}
			else return new ResponseEntity<>("Failed", HttpStatus.BAD_REQUEST);
		}
		catch (Exception e) {
			return new ResponseEntity<>(null, HttpStatus.INTERNAL_SERVER_ERROR);
		}
	}
}
