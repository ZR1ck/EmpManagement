/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */

package com.example.EmpManagementAPI.service.Activity;

import java.util.Date;
import java.util.List;

import com.example.EmpManagementAPI.DTO.ActivityApprovalDTO;
import com.example.EmpManagementAPI.repository.Activity.ActivityRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.scheduling.annotation.Async;
import org.springframework.stereotype.Service;

import com.example.EmpManagementAPI.model.Activity.ActivityApproval;
import com.example.EmpManagementAPI.repository.Activity.ActivityApprovalRepo;


@Service
public class ActivityApprovalService {
	
	@Autowired
    private ActivityApprovalRepo activityApprovalRepo;
    @Autowired
    private ActivityRepo activityRepo;

    public ActivityApproval updateActivityApproval(ActivityApproval activityApproval) {
        return activityApprovalRepo.save(activityApproval);
    }

    public ResponseEntity<?> updateActivityApprovalStatus(int id, String status) {
        try {
            if (activityApprovalRepo.updateActivityApprovalStatus(id, status) > 0) {
                increaseParticipants(id);
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

    public ResponseEntity<ActivityApproval> addActivityApproval(ActivityApproval activityApproval) {
        try {
            ActivityApproval existed = activityApprovalRepo.findActivityApprovalByActivityidAndEmpid(activityApproval.getActivityid(), activityApproval.getEmpid());
            if (existed != null) {
                return new ResponseEntity<>(existed, HttpStatus.CONFLICT);
            }
            else {
                activityApproval.setCreatedate(new Date());
                activityApproval.setApprovalstatus("Pending");
                return new ResponseEntity<>(activityApprovalRepo.save(activityApproval), HttpStatus.CREATED);
            }
        }
        catch (Exception e) {
            return new ResponseEntity<>(null, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @Async
    public void increaseParticipants(int activityApprovalId) {
        ActivityApproval activityApproval = activityApprovalRepo.findById(activityApprovalId).orElseThrow();
        activityRepo.increaseParticipantsNum(activityApproval.getActivityid());
    }
}
