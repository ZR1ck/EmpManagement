package com.example.EmpManagementAPI.service;

import com.example.EmpManagementAPI.model.LeaveTypes;
import com.example.EmpManagementAPI.repository.LeaveTypesRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.Date;

@Service
public class LeaveTypesService {

    @Autowired
    private LeaveTypesRepo leaveTypesRepo;

    public LeaveTypes getLeaveTypeByEmpIdAndYear(String empId, int year) {
        return leaveTypesRepo.findByEmpidAndYear(empId, year);
    }

    public LeaveTypes updateLeaveType(LeaveTypes leaveType, String emdId) {
        LeaveTypes leaveType1 = leaveTypesRepo.findByEmpidAndYear(emdId, LocalDate.now().getYear());
        leaveType1.setAnnual(leaveType.getAnnual());
        leaveType1.setSick(leaveType.getSick());
        leaveType1.setFuneral(leaveType.getFuneral());
        leaveType1.setMarriage(leaveType.getMarriage());
        return leaveTypesRepo.save(leaveType);
    }
}
