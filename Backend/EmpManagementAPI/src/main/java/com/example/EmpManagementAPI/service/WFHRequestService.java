
package com.example.EmpManagementAPI.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
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

	public ResponseEntity<?> getRequestById(String managerId, int requestId) {
		try {
			if (StringUtil.isNullOrEmpty(managerId)) {
				return ResponseEntity.status(401).body("Unauthorized");
			}
			List<WFHRequest> requests = wfhRequestRepo.findByRequestIdAndManagerId(requestId, managerId);
			return ResponseEntity.ok(requests);
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
}
