package com.example.EmpManagementAPI.repository.Request;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.example.EmpManagementAPI.model.Emp;
import com.example.EmpManagementAPI.model.Request.LeaveRequest;

public interface LeaveRequestRepo extends JpaRepository<LeaveRequest, Integer> {

	List<LeaveRequest> findByManagerId(String managerId);

	LeaveRequest findByRequestIdAndManagerId(int requestId, String managerId);

}
