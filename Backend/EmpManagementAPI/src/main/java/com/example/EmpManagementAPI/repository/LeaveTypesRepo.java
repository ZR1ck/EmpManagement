package com.example.EmpManagementAPI.repository;

import com.example.EmpManagementAPI.model.LeaveTypes;
import org.springframework.data.jpa.repository.JpaRepository;

public interface LeaveTypesRepo extends JpaRepository<LeaveTypes, Integer> {
}
