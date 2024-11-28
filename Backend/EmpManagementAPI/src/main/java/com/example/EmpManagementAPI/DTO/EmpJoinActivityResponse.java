package com.example.EmpManagementAPI.DTO;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@AllArgsConstructor
@NoArgsConstructor
@Data
@Builder
public class EmpJoinActivityResponse {
    private Integer approveId;
    private String empId;
    private Integer activityId;
    private String status;
}
