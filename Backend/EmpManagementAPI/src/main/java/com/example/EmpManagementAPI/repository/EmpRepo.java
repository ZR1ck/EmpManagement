package com.example.EmpManagementAPI.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.example.EmpManagementAPI.model.Emp;

public interface EmpRepo extends JpaRepository<Emp, String> {
    @Query("SELECT e.position FROM Emp e WHERE e.empid = :id")
    String getEmpPositionById(@Param("id") String id);

}
