/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */

package com.example.EmpManagementAPI.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestPart;
import org.springframework.web.bind.annotation.RestController;

import com.example.EmpManagementAPI.model.Activity.ActivityApproval;
import com.example.EmpManagementAPI.service.Activity.ActivityApprovalService;

@RestController
@CrossOrigin
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
}
