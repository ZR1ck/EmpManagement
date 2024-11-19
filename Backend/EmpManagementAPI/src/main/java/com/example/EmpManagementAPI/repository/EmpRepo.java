package com.example.EmpManagementAPI.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import com.example.EmpManagementAPI.model.Emp;
import org.springframework.data.repository.query.Param;

public interface EmpRepo extends JpaRepository<Emp, String> {
    @Query("SELECT e.position FROM Emp e WHERE e.empid = :id")
    String getEmpPositionById(String id);

    Emp findEmpByName(String name);
    
    List<Emp> findByDeptDeptno(int deptno);

    @Query("SELECT (e.empid, e.name, e.personalemail, e.position, a.isactive, a.lastlogin) " +
            "FROM Emp e LEFT JOIN Account a ON e.empid = a.empid " +
            "WHERE e.dept.deptno = :dept")
    List<Object[]> findEmpDTOByDept(@Param("dept") int dept);

}
