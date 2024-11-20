package com.example.EmpManagementAPI.repository.Request;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.example.EmpManagementAPI.model.Request.WFHRequest;

public interface WFHRequestRepo extends JpaRepository<WFHRequest, Integer> {
	List<WFHRequest> findByManagerId(String managerId);

    List<WFHRequest> findByRequestIdAndManagerId(int requestId, String managerId);

}
