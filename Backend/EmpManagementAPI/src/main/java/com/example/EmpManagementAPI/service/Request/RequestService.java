package com.example.EmpManagementAPI.service.Request;

import com.example.EmpManagementAPI.model.Request.Request;
import com.example.EmpManagementAPI.model.Request.TimeAttendanceUpdateRequest;
import com.example.EmpManagementAPI.repository.Request.RequestRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

@Service
public class RequestService {

    @Autowired
    private RequestRepo requestRepo;

    public ResponseEntity<?> getRequestById(int requestId) {
        try {
            if (requestId < 0) {
                return ResponseEntity.status(400).body("Bad Request");
            }
            Request request = requestRepo.findByRequestId(requestId);
            return new ResponseEntity<>(request, HttpStatus.OK);
        } catch (Exception e) {
            return ResponseEntity.status(500).body("Internal Server Error");
        }
    }

    public ResponseEntity<?> updateRequestStatus(String id, String status, String requestType) {
        if (!requestType.equals(Request.class.getSimpleName())) {
            return new ResponseEntity<>("Wrong request type", HttpStatus.BAD_REQUEST);
        }
        try {
            if (requestRepo.updateRequestStatus(id, status) > 0) {
                return new ResponseEntity<>("Success", HttpStatus.OK);
            }
            else return new ResponseEntity<>("Failed", HttpStatus.BAD_REQUEST);
        }
        catch (Exception e) {
            return new ResponseEntity<>(null, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

}
