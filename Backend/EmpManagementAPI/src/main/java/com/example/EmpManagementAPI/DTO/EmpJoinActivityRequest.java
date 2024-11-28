package com.example.EmpManagementAPI.DTO;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@AllArgsConstructor
@NoArgsConstructor
@Builder
@Data
public class EmpJoinActivityRequest {
    private Integer activityId;
    private String employeeId;
}
