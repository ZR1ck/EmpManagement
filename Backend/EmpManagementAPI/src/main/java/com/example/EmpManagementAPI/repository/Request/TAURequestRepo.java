package com.example.EmpManagementAPI.repository.Request;

import org.springframework.data.jpa.repository.JpaRepository;

import com.example.EmpManagementAPI.model.Request.TimeAttendanceUpdateRequest;

public interface TAURequestRepo extends JpaRepository<TimeAttendanceUpdateRequest, Integer> {
}
