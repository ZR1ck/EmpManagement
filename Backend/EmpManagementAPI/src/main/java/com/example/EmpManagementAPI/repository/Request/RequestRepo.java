package com.example.EmpManagementAPI.repository.Request;

import com.example.EmpManagementAPI.model.Request.Request;
import org.springframework.data.jpa.repository.JpaRepository;

public interface RequestRepo extends JpaRepository<Request, Integer> {
}
