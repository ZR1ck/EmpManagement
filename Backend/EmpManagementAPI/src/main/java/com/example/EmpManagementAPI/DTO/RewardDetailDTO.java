package com.example.EmpManagementAPI.DTO;

import com.example.EmpManagementAPI.model.Reward.Reward;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.Date;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class RewardDetailDTO {

    private String empId;
    private String empName;
    private int deptNo;
    private String deptName;
    private Reward reward;
    private Date DateAwarded;

}
