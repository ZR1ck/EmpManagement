package com.example.EmpManagementAPI.repository.Request;

import org.springframework.data.jpa.repository.JpaRepository;

import com.example.EmpManagementAPI.model.Request.Request;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.transaction.annotation.Transactional;

public interface RequestRepo extends JpaRepository<Request, Integer> {

    Request findByRequestId(int requestId);

    @Modifying
    @Transactional
    @Query("update Request r set r.approvalStatus = :status where r.requestId = :id")
    int updateRequestStatus(String id, String status);

}
