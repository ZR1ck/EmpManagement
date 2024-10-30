package com.example.EmpManagementAPI.repository.Request;

import com.example.EmpManagementAPI.model.Request.WFHRequest;
import org.springframework.data.jpa.repository.JpaRepository;

public interface WFHRequestRepo extends JpaRepository<WFHRequest, Integer> {
}
