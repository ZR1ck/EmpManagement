package com.example.EmpManagementAPI.repository.Activity;

import com.example.EmpManagementAPI.model.Activity.ActivityApproval;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ActivityApprovalRepo extends JpaRepository<ActivityApproval, Integer> {
}
