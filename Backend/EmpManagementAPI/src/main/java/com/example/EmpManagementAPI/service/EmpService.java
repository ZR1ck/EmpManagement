package com.example.EmpManagementAPI.service;

import java.io.IOException;
import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import com.example.EmpManagementAPI.model.Emp;
import com.example.EmpManagementAPI.repository.EmpRepo;

@Service
public class EmpService {

    @Autowired
    private EmpRepo empRepo;

    @Autowired
    private FileService fileService;

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

    public List<Emp> findEmpsByDept(int deptno) {
        return empRepo.findByDeptDeptno(deptno);
    }

    public Emp addEmp(Emp emp, MultipartFile avatar) throws IOException {
        String avatarUrl = fileService.addFile(avatar, FileService.AVATAR);
        emp.setAvatarurl(avatarUrl);

        return empRepo.save(emp);
    }
}
