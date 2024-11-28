package com.example.EmpManagementAPI;

import com.example.EmpManagementAPI.DTO.EmpJoinActivityRequest;
import com.example.EmpManagementAPI.DTO.EmpJoinActivityResponse;
import com.example.EmpManagementAPI.exception.InvalidDataException;
import com.example.EmpManagementAPI.model.Activity.Activity;
import com.example.EmpManagementAPI.model.Activity.ActivityApproval;
import com.example.EmpManagementAPI.model.Emp;
import com.example.EmpManagementAPI.repository.Activity.ActivityApprovalRepo;
import com.example.EmpManagementAPI.repository.Activity.ActivityRepo;
import com.example.EmpManagementAPI.repository.EmpRepo;
import com.example.EmpManagementAPI.service.Activity.EmployeeActivityService;
import org.junit.jupiter.api.Assertions;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;

import java.util.Optional;

import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.when;

public class EmployeeActivityServiceTest {

    private EmployeeActivityService employeeActivityService;

    @Mock
    private EmpRepo empRepo;

    @Mock
    private ActivityRepo activityRepo;

    @Mock
    private ActivityApprovalRepo activityApprovalRepo;

    @BeforeEach
    public void setUp() {
        MockitoAnnotations.openMocks(this);

        employeeActivityService = new EmployeeActivityService(empRepo, activityRepo, activityApprovalRepo);
    }

    @Test
    public void testJoinActivitySuccess() throws InvalidDataException {
        EmpJoinActivityRequest empJoinActivityRequest = EmpJoinActivityRequest.builder()
                .activityId(1)
                .employeeId("EMP1")
                .build();

        Activity activity = new Activity();
        activity.setActivityid(empJoinActivityRequest.getActivityId());

        when(activityRepo.findById(empJoinActivityRequest.getActivityId()))
                .thenReturn(Optional.of(activity));

        Emp emp = new Emp();
        emp.setEmpid(empJoinActivityRequest.getEmployeeId());

        when(empRepo.findById(empJoinActivityRequest.getEmployeeId()))
                .thenReturn(Optional.of(emp));

        when(activityApprovalRepo.findByActivityidAndEmpid(empJoinActivityRequest.getActivityId(), empJoinActivityRequest.getEmployeeId()))
                .thenReturn(null);

        when(activityApprovalRepo.save(any()))
                .thenReturn(ActivityApproval.builder().id(1).activityid(1).build());

        EmpJoinActivityResponse response = employeeActivityService.joinActivity(empJoinActivityRequest);

        Assertions.assertEquals(empJoinActivityRequest.getActivityId(), response.getActivityId());
        Assertions.assertEquals(empJoinActivityRequest.getEmployeeId(), response.getEmpId());
        Assertions.assertEquals(1, response.getApproveId());
    }

    @Test
    public void testJoinActivityWhenNotFoundActivityThenThrowException() throws InvalidDataException {
        EmpJoinActivityRequest empJoinActivityRequest = EmpJoinActivityRequest.builder()
                .activityId(1)
                .employeeId("EMP1")
                .build();

        Activity activity = new Activity();
        activity.setActivityid(empJoinActivityRequest.getActivityId());

        when(activityRepo.findById(empJoinActivityRequest.getActivityId()))
                .thenReturn(Optional.ofNullable(null));


        Assertions.assertThrows(InvalidDataException.class, () -> employeeActivityService.joinActivity(empJoinActivityRequest));

    }

    @Test
    public void testJoinActivityWhenNotFoundEmployeeThenThrowException() throws InvalidDataException {
        EmpJoinActivityRequest empJoinActivityRequest = EmpJoinActivityRequest.builder()
                .activityId(1)
                .employeeId("EMP1")
                .build();

        Activity activity = new Activity();
        activity.setActivityid(empJoinActivityRequest.getActivityId());

        when(activityRepo.findById(empJoinActivityRequest.getActivityId()))
                .thenReturn(Optional.of(activity));

        Emp emp = new Emp();
        emp.setEmpid(empJoinActivityRequest.getEmployeeId());

        when(empRepo.findById(empJoinActivityRequest.getEmployeeId()))
                .thenReturn(Optional.ofNullable(null));

        when(activityApprovalRepo.findByActivityidAndEmpid(empJoinActivityRequest.getActivityId(), empJoinActivityRequest.getEmployeeId()))
                .thenReturn(null);

        Assertions.assertThrows(InvalidDataException.class, () -> employeeActivityService.joinActivity(empJoinActivityRequest));

    }
}
