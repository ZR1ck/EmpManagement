package com.example.EmpManagementAPI.service;

import com.example.EmpManagementAPI.model.AttendanceRecords;
import com.example.EmpManagementAPI.repository.AttendanceRecordsRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.Date;

@Service
public class AttendanceService {

    @Autowired
    private AttendanceRecordsRepo attendanceRecordsRepo;

    public ResponseEntity<AttendanceRecords> findCurrentAttendanceRecord(String empId) {
        try {
            Date currentDate = new Date();
            AttendanceRecords attendanceRecord = attendanceRecordsRepo.findAttendanceRecordsByAttendancedateAndAndEmpid(currentDate, empId);
            if (attendanceRecord == null) {
                return new ResponseEntity<>(null, HttpStatus.NOT_FOUND);
            }
            return new ResponseEntity<>(attendanceRecord, HttpStatus.OK);
        }
        catch (Exception e) {
            return new ResponseEntity<>(null, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    public ResponseEntity<Integer> countAttendanceRecords(String empId, boolean isAbsent) {
        LocalDate currentDate = LocalDate.now();
        int month = currentDate.getMonthValue();
        int year = currentDate.getYear();

        try {
            int count;
            if (!isAbsent) {
                count = attendanceRecordsRepo.countAttendanceRecord(month, year, empId);
            }
            else {
                count = attendanceRecordsRepo.countAbsent(month, year, empId);
            }
            if (count == 0) {
                return new ResponseEntity<>(0, HttpStatus.NOT_FOUND);
            }
            return new ResponseEntity<>(count, HttpStatus.OK);
        }
        catch (Exception e) {
            return new ResponseEntity<>(0, HttpStatus.INTERNAL_SERVER_ERROR);
        }

    }

    public ResponseEntity<Integer> countTeamPresent(String managerId, boolean isAbsent) {
        try {
            Date currentDate = new Date();
            try {
                int count;
                if (!isAbsent) {
                    count = attendanceRecordsRepo.countTeamPresent(managerId, currentDate);
                }
                else {
                    count = attendanceRecordsRepo.countTeamAbsent(managerId, currentDate);
                }
                if (count == 0) {
                    return new ResponseEntity<>(0, HttpStatus.NOT_FOUND);
                }
                return new ResponseEntity<>(count, HttpStatus.OK);
            }
            catch (Exception e) {
                return new ResponseEntity<>(0, HttpStatus.INTERNAL_SERVER_ERROR);
            }
        }
        catch (Exception e) {
            return new ResponseEntity<>(0, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

}
