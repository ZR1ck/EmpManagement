package com.example.EmpManagementAPI.repository.Request;

import com.example.EmpManagementAPI.model.Request.HalfDayLeaveRequest;
import org.springframework.data.jpa.repository.JpaRepository;

public interface HalfDayLeaveRequestRepo extends JpaRepository<HalfDayLeaveRequest, Integer> {
}
