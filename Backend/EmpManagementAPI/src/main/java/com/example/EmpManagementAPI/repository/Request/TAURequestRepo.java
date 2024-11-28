package com.example.EmpManagementAPI.repository.Request;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.example.EmpManagementAPI.model.Request.TimeAttendanceUpdateRequest;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.transaction.annotation.Transactional;

public interface TAURequestRepo extends JpaRepository<TimeAttendanceUpdateRequest, Integer> {

    List<TimeAttendanceUpdateRequest> findByEmpId(String empId);

	TimeAttendanceUpdateRequest findByRequestId(int requestId);

    @Modifying
    @Transactional
    @Query("update TimeAttendanceUpdateRequest r set r.approvalStatus = :status where r.requestId = :id")
    int updateRequestStatus(String id, String status);
}
