package com.example.EmpManagementAPI.repository.Request;

import com.example.EmpManagementAPI.model.Request.LeaveRequest;
import org.springframework.data.jpa.repository.JpaRepository;

import com.example.EmpManagementAPI.model.Request.HalfDayLeaveRequest;

import java.util.List;

public interface HalfDayLeaveRequestRepo extends JpaRepository<HalfDayLeaveRequest, Integer> {
    List<HalfDayLeaveRequest> findByManagerId(String managerId);
}
