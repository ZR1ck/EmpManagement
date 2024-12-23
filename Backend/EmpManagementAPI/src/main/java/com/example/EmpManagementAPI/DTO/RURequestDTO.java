package com.example.EmpManagementAPI.DTO;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.Date;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class RURequestDTO {

    private int requestId;
    private String empId;
    private String empName;
    private String managerId;
    private String approvalStatus;
    private Date createDate;
    private String reason;
    private String declinereason;

}
