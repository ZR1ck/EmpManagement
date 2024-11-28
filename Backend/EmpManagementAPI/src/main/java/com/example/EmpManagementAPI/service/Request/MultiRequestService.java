package com.example.EmpManagementAPI.service.Request;

import com.example.EmpManagementAPI.DTO.BaseRequestDTO;
import com.example.EmpManagementAPI.repository.Request.BaseRequestRepo;
import com.example.EmpManagementAPI.repository.Request.RequestRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.util.*;

@Service
public class MultiRequestService {

    @Autowired
    private BaseRequestRepo baseRequestRepo;

    public ResponseEntity<?> getAllRequests(String managerId) {
        try {
            List<Object[]> results = baseRequestRepo.findAllRequests(managerId);
            List<BaseRequestDTO> res = new ArrayList<>();

            for (Object[] result : results) {
                int requestId = (Integer) result[0];
                String empId = result[1].toString();
                String empName = result[2].toString();
                String manager = result[3].toString();
                String approvalStatus = result[4].toString();
                Date createDate = (Date) result[5];
                String source = result[6].toString();

                BaseRequestDTO dto = new BaseRequestDTO(requestId, empId, empName, manager, approvalStatus, createDate, source);
                res.add(dto);
            }
            return new ResponseEntity<>(res, HttpStatus.OK);
        } catch (Exception e) {
            return new ResponseEntity<>(null, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
}
