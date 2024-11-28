package com.example.EmpManagementAPI.repository.Request;

import com.example.EmpManagementAPI.model.Request.LeaveRequest;
import org.springframework.data.jpa.repository.JpaRepository;

import com.example.EmpManagementAPI.model.Request.HalfDayLeaveRequest;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

public interface HalfDayLeaveRequestRepo extends JpaRepository<HalfDayLeaveRequest, Integer> {
    List<HalfDayLeaveRequest> findByManagerId(String managerId);

    HalfDayLeaveRequest findByRequestId(int requestId);

    @Modifying
    @Transactional
    @Query("update HalfDayLeaveRequest r set r.approvalStatus = :status where r.requestId = :id")
    int updateRequestStatus(String id, String status);
}
