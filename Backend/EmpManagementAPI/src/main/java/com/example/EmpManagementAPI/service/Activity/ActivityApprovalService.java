/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */

package com.example.EmpManagementAPI.service.Activity;

import java.io.IOException;

import org.springframework.beans.factory.annotation.Autowired;
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
}
