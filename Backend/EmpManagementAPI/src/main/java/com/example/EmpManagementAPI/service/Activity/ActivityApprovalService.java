/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */

package com.example.EmpManagementAPI.service.Activity;

import java.io.IOException;
import java.util.List;

import com.example.EmpManagementAPI.DTO.ActivityApprovalDTO;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import com.example.EmpManagementAPI.model.Activity.ActivityApproval;
import com.example.EmpManagementAPI.repository.Activity.ActivityApprovalRepo;


@Service
public class ActivityApprovalService {
	
	@Autowired
    private ActivityApprovalRepo activityApprovalRepo;

	public ActivityApproval updateActivityApproval(ActivityApproval activityApproval) throws IOException {
        return activityApprovalRepo.save(activityApproval);
    }

    public ResponseEntity<?> updateActivityApprovalStatus(int id, String status) {
        try {
            if (activityApprovalRepo.updateActivityApprovalStatus(id, status) > 0) {
                return new ResponseEntity<>("Success", HttpStatus.OK);
            }
            else {
                return new ResponseEntity<>("Fail", HttpStatus.BAD_REQUEST);
            }
        } catch (Exception e) {
            return new ResponseEntity<>("Error", HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    public ResponseEntity<List<ActivityApprovalDTO>> getActivityApprovalDTO(String managerId) {
        try {
            return new ResponseEntity<>(activityApprovalRepo.getActivityApprovalDTO(managerId), HttpStatus.OK);
        }
        catch (Exception e) {
            return new ResponseEntity<>(null, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
}
