package com.example.EmpManagementAPI.repository;

import com.example.EmpManagementAPI.model.Emp;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

public interface EmpRepo extends JpaRepository<Emp, String> {
    @Query("SELECT e.position FROM Emp e WHERE e.empid = :id")
    String getEmpPositionById(String id);

    Emp findEmpByName(String name);
}
