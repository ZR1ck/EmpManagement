package com.example.EmpManagementAPI.repository.Request;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.example.EmpManagementAPI.model.Request.WFHRequest;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.transaction.annotation.Transactional;

public interface WFHRequestRepo extends JpaRepository<WFHRequest, Integer> {
	List<WFHRequest> findByManagerId(String managerId);

    WFHRequest findByRequestId(int requestId);

    @Modifying
    @Transactional
    @Query("update WFHRequest r set r.approvalStatus = :status where r.requestId = :id")
    int updateRequestStatus(String id, String status);
}
