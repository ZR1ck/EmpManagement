package com.example.EmpManagementAPI.repository.Request;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.example.EmpManagementAPI.model.Emp;
import com.example.EmpManagementAPI.model.Request.LeaveRequest;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.transaction.annotation.Transactional;

public interface LeaveRequestRepo extends JpaRepository<LeaveRequest, Integer> {

	List<LeaveRequest> findByManagerId(String managerId);

	LeaveRequest findByRequestId(int requestId);

	@Modifying
	@Transactional
	@Query("update LeaveRequest r set r.approvalStatus = :status where r.requestId = :id")
    int updateRequestStatus(String id, String status);
}
