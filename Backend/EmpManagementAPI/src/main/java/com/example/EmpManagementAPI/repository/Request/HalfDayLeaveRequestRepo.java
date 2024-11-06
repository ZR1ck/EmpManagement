package com.example.EmpManagementAPI.repository.Request;

import org.springframework.data.jpa.repository.JpaRepository;

import com.example.EmpManagementAPI.model.Request.HalfDayLeaveRequest;

public interface HalfDayLeaveRequestRepo extends JpaRepository<HalfDayLeaveRequest, String> {
}
