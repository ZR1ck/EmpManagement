package com.example.EmpManagementAPI.DTO;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.Date;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class RewardDTO {

    private int id;
    private String empId;
    private int rewardId;
    private String empName;
    private Date dateAwarded;

}
