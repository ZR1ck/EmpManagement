package com.example.EmpManagementAPI.repository.Request;

import org.springframework.data.jpa.repository.JpaRepository;

import com.example.EmpManagementAPI.model.Request.WFHRequest;

public interface WFHRequestRepo extends JpaRepository<WFHRequest, String> {
}
