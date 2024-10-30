package com.example.EmpManagementAPI.repository.Request;

import com.example.EmpManagementAPI.model.Request.LeaveRequest;
import org.springframework.data.jpa.repository.JpaRepository;

public interface LeaveRequestRepo extends JpaRepository<LeaveRequest, Integer> {
}
