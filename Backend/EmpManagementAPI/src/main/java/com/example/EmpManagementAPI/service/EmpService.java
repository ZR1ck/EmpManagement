package com.example.EmpManagementAPI.service;

import java.io.IOException;
import java.time.Duration;
import java.time.Instant;
import java.util.Date;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

import com.example.EmpManagementAPI.DTO.EmpDTO;
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

    public List<EmpDTO> findEmpDTOByDept(int deptno) {
        List<Object[]> results = empRepo.findEmpDTOByDept(deptno);

        return results.stream().map(result -> {
            String empid = (String) result[0];
            String name = (String) result[1];
            List<String> personalemail = (List<String>) result[2];
            String position = (String) result[3];
            Boolean isActive = (Boolean) result[4];
            Date lastLogin = (Date) result[5];

            Date timeDifference = null;
            if (lastLogin != null) {
                Instant now = Instant.now();
                Instant lastLoginInstant = lastLogin.toInstant();
                Duration duration = Duration.between(lastLoginInstant, now);

                timeDifference = Date.from(now.minus(duration));
            }

            return new EmpDTO(empid, name, personalemail != null && !personalemail.isEmpty() ? personalemail.getFirst() : null, position, isActive, timeDifference);
        }).toList();
    }
}
