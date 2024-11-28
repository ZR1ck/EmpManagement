package com.example.EmpManagementAPI.DTO;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.Date;

@AllArgsConstructor
@NoArgsConstructor
@Data
public class ActivityApprovalDTO {

    private int id;

    private String empId;
    private String empName;
    private int empDeptNo;
    private String empDeptName;

    private int activityId;
    private String activityName;

    private Date createDate;
    private String approvalStatus;
}
