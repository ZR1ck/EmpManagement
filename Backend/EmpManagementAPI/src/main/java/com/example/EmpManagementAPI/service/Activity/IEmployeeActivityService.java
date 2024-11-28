package com.example.EmpManagementAPI.service.Activity;

import com.example.EmpManagementAPI.DTO.EmpJoinActivityRequest;
import com.example.EmpManagementAPI.DTO.EmpJoinActivityResponse;
import com.example.EmpManagementAPI.exception.InvalidDataException;

public interface IEmployeeActivityService {
    EmpJoinActivityResponse joinActivity(EmpJoinActivityRequest empJoinActivityRequest) throws InvalidDataException;
}
