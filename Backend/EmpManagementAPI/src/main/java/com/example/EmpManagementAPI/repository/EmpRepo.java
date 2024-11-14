package com.example.EmpManagementAPI.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import com.example.EmpManagementAPI.model.Emp;

public interface EmpRepo extends JpaRepository<Emp, String> {
    @Query("SELECT e.position FROM Emp e WHERE e.empid = :id")
    String getEmpPositionById(String id);

    Emp findEmpByName(String name);
    
    List<Emp> findByDeptDeptno(int deptno);
}
