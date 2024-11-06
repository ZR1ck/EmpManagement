package com.example.EmpManagementAPI.repository.Request;

import org.springframework.data.jpa.repository.JpaRepository;

import com.example.EmpManagementAPI.model.Request.Request;

public interface RequestRepo extends JpaRepository<Request, String> {
}
