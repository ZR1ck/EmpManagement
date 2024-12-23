package com.example.EmpManagementAPI.repository.Request;

import com.example.EmpManagementAPI.DTO.RURequestDTO;
import com.example.EmpManagementAPI.model.Request.RecognitionUpdateRequest;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

public interface RURequestRepo extends JpaRepository<RecognitionUpdateRequest, Integer> {

    @Query("SELECT new com.example.EmpManagementAPI.DTO.RURequestDTO(r.requestId, e.empid, e.name, r.managerId, r.approvalStatus, r.createDate, r.reason, r.declinereason) " +
            "FROM RecognitionUpdateRequest r JOIN Emp e ON r.empId = e.empid " +
            "WHERE r.managerId = :managerId")
    List<RURequestDTO> findRURequestDTOByManagerId(String managerId);

    @Modifying
    @Transactional
    @Query("update RecognitionUpdateRequest r set r.approvalStatus = :status, r.declinereason = :declineReason where r.requestId = :id")
    int updateRequestStatus(String id, String status, String declineReason);
}
