package com.example.EmpManagementAPI.repository;

import com.example.EmpManagementAPI.model.Emp;
import org.springframework.data.jpa.repository.JpaRepository;

public interface EmpRepo extends JpaRepository<Emp, String> {
}
