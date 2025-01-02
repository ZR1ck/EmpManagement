package com.example.EmpManagementAPI.controller;

import com.example.EmpManagementAPI.model.AttendanceRecords;
import com.example.EmpManagementAPI.service.AttendanceService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@CrossOrigin
@RequestMapping("/api/attendance")
public class AttendanceController {

    @Autowired
    AttendanceService attendanceService;

    @GetMapping("/today/{empId}")
    public ResponseEntity<AttendanceRecords> findCurrentAttendanceRecord(@PathVariable String empId) {
        return attendanceService.findCurrentAttendanceRecord(empId);
    }

    @GetMapping("/working-days/{empId}")
    public ResponseEntity<Integer> countAttendanceRecords(@PathVariable String empId) {
        return attendanceService.countAttendanceRecords(empId, false);
    }

    @GetMapping("/absent-days/{empId}")
    public ResponseEntity<Integer> countAbsentRecords(@PathVariable String empId) {
        return attendanceService.countAttendanceRecords(empId, true);
    }

    @GetMapping("/working/{managerId}")
    public ResponseEntity<Integer> countTeamPresent(@PathVariable String managerId) {
        return attendanceService.countTeamPresent(managerId, false);
    }

    @GetMapping("/absent/{managerId}")
    public ResponseEntity<Integer> countTeamAbsent(@PathVariable String managerId) {
        return attendanceService.countTeamPresent(managerId, true);
    }

}
