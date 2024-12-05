/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */

package com.example.EmpManagementAPI.controller;

import com.example.EmpManagementAPI.DTO.ActivityApprovalDTO;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import com.example.EmpManagementAPI.model.Activity.ActivityApproval;
import com.example.EmpManagementAPI.service.Activity.ActivityApprovalService;

import java.util.List;

@RestController
@CrossOrigin
@RequestMapping("/api")
public class ActivityApprovalController {
	@Autowired
	private ActivityApprovalService activityApprovalService;

    @PutMapping("/update-approval")
    public ResponseEntity<ActivityApproval> updateActivityApproval(@RequestPart("activityApproval") ActivityApproval activityApproval) {
        try {
            return new ResponseEntity<>(activityApprovalService.updateActivityApproval(activityApproval), HttpStatus.OK);
        }
        catch (Exception e) {
            return new ResponseEntity<>(null, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @PreAuthorize("hasAuthority('Manager')")
    @GetMapping("/activity/approval")
    public ResponseEntity<List<ActivityApprovalDTO>> getActivityApproval(@RequestParam("managerId") String id) {
        return activityApprovalService.getActivityApprovalDTO(id);
    }

    @PreAuthorize("hasAuthority('Manager')")
    @PostMapping("/activity/update")
    public ResponseEntity<?> updateActivityApprovalStatus(@RequestPart("activityApprovalId") String id, @RequestPart("status") String status) {
        return activityApprovalService.updateActivityApprovalStatus(Integer.parseInt(id), status);
    }

    @PostMapping("/activity/approvalRequest")
    public ResponseEntity<?> addActivityApproval(@RequestPart("activityApproval") ActivityApproval activityApproval) {
        return activityApprovalService.addActivityApproval(activityApproval);
    }
}
