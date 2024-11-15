package com.example.EmpManagementAPI.repository.Request;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.example.EmpManagementAPI.model.Request.TimeAttendanceUpdateRequest;

public interface TAURequestRepo extends JpaRepository<TimeAttendanceUpdateRequest, Integer> {

    List<TimeAttendanceUpdateRequest> findByEmpId(String empId);

	List<TimeAttendanceUpdateRequest> findByRequestId(int requestId);
}
