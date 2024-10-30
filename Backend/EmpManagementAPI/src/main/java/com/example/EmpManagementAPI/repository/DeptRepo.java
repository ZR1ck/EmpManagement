package com.example.EmpManagementAPI.repository;

import com.example.EmpManagementAPI.model.Dept;
import org.springframework.data.jpa.repository.JpaRepository;

public interface DeptRepo extends JpaRepository<Dept, Integer> {
}
