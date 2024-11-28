package com.example.EmpManagementAPI.service.Activity;

import com.example.EmpManagementAPI.DTO.EmpJoinActivityRequest;
import com.example.EmpManagementAPI.DTO.EmpJoinActivityResponse;
import com.example.EmpManagementAPI.exception.InvalidDataException;
import com.example.EmpManagementAPI.model.Activity.Activity;
import com.example.EmpManagementAPI.model.Activity.ActivityApproval;
import com.example.EmpManagementAPI.model.Emp;
import com.example.EmpManagementAPI.repository.Activity.ActivityApprovalRepo;
import com.example.EmpManagementAPI.repository.Activity.ActivityRepo;
import com.example.EmpManagementAPI.repository.EmpRepo;
import org.springframework.stereotype.Service;

import java.util.Date;

@Service
public class EmployeeActivityService implements IEmployeeActivityService {
    private final EmpRepo empRepo;
    private final ActivityRepo activityRepo;
    private final ActivityApprovalRepo activityApprovalRepo;

    public EmployeeActivityService(EmpRepo empRepo, ActivityRepo activityRepo, ActivityApprovalRepo activityApprovalRepo) {
        this.empRepo = empRepo;
        this.activityRepo = activityRepo;
        this.activityApprovalRepo = activityApprovalRepo;
    }

    @Override
    public EmpJoinActivityResponse joinActivity(EmpJoinActivityRequest empJoinActivityRequest) throws InvalidDataException {
        if (empJoinActivityRequest.getActivityId() == null || empJoinActivityRequest.getEmployeeId() == null) {
            throw new InvalidDataException("Join activity require empId, activityId");
        }
        Activity activity = activityRepo.findById(empJoinActivityRequest.getActivityId()).orElse(null);
        if (activity == null) {
            throw new InvalidDataException("Not found activity with id " + empJoinActivityRequest.getActivityId());
        }

        Emp emp = empRepo.findById(empJoinActivityRequest.getEmployeeId()).orElse(null);
        if (emp == null) {
            throw new InvalidDataException("Not found employee with id " + empJoinActivityRequest.getEmployeeId());
        }

        if (activityApprovalRepo.findByActivityidAndEmpid(empJoinActivityRequest.getActivityId(), empJoinActivityRequest.getEmployeeId()) != null) {
            throw new InvalidDataException("Employee already join activity");
        }

        final String status = "REQUESTED";
        ActivityApproval activityApproval = ActivityApproval.builder()
                .empid(empJoinActivityRequest.getEmployeeId())
                .activityid(empJoinActivityRequest.getActivityId())
                .createdate(new Date())
                .approvalstatus(status)
                .build();
        ActivityApproval saved = activityApprovalRepo.save(activityApproval);
        return EmpJoinActivityResponse.builder()
                .approveId(saved.getId())
                .activityId(empJoinActivityRequest.getActivityId())
                .empId(empJoinActivityRequest.getEmployeeId())
                .status(status)
                .build();
    }
}
