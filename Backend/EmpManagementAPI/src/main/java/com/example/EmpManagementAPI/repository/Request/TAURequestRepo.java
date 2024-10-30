package com.example.EmpManagementAPI.repository.Request;

import com.example.EmpManagementAPI.model.Request.TimeAttendanceUpdateRequest;
import org.springframework.data.jpa.repository.JpaRepository;

public interface TAURequestRepo extends JpaRepository<TimeAttendanceUpdateRequest, Integer> {
}
