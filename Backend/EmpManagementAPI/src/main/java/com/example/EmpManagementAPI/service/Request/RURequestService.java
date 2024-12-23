package com.example.EmpManagementAPI.service.Request;

import com.example.EmpManagementAPI.DTO.RURequestDTO;
import com.example.EmpManagementAPI.model.Request.WFHRequest;
import com.example.EmpManagementAPI.repository.Request.RURequestRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class RURequestService {

    @Autowired
    private RURequestRepo ruRequestRepo;

    public ResponseEntity<List<RURequestDTO>> getAllRequests(String managerId) {
        try {
            return new ResponseEntity<>(ruRequestRepo.findRURequestDTOByManagerId(managerId), HttpStatus.OK);
        }
        catch (Exception e) {
            return new ResponseEntity<>(null, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    public ResponseEntity<?> updateRequestStatus(String id, String status, String declineReason) {
        try {
            if (ruRequestRepo.updateRequestStatus(id, status, declineReason) > 0) {
                return new ResponseEntity<>("Success", HttpStatus.OK);
            }
            else return new ResponseEntity<>("Failed", HttpStatus.BAD_REQUEST);
        }
        catch (Exception e) {
            return new ResponseEntity<>(null, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
}
