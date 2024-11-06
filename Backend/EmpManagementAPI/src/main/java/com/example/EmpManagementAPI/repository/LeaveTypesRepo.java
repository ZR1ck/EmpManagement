package com.example.EmpManagementAPI.repository;

import com.example.EmpManagementAPI.model.LeaveTypes;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface LeaveTypesRepo extends JpaRepository<LeaveTypes, Integer> {
    List<LeaveTypes> findByEmpid(String id);
    LeaveTypes findByEmpidAndYear(String empid, int year);
}
