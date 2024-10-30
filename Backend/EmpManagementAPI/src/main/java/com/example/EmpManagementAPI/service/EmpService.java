package com.example.EmpManagementAPI.service;

import com.example.EmpManagementAPI.model.Emp;
import com.example.EmpManagementAPI.repository.EmpRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class EmpService {

    @Autowired
    private EmpRepo empRepo;

    public String getEmpPositionById(String id) {
        return empRepo.getEmpPositionById(id);
    }

    public List<Emp> getAllEmp() {
        return empRepo.findAll();
    }

    public Emp getEmpById(String id) {
        Optional<Emp> emp = empRepo.findById(id);
        return emp.orElse(null);
    }

    public Emp findEmpByName(String name) {
        return empRepo.findEmpByName(name);
    }
}
