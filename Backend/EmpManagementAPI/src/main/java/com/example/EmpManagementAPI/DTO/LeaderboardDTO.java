package com.example.EmpManagementAPI.DTO;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class LeaderboardDTO {

    private String empId;
    private String empName;
    private String deptName;
    private int deptNo;
    private String avatarUrl;
    private int activityId;
    private int score;
    private int rank;

}
