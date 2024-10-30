package com.example.EmpManagementAPI.repository;

import com.example.EmpManagementAPI.model.AttendanceRecords;
import org.springframework.data.jpa.repository.JpaRepository;

public interface AttendanceRecordsRepo extends JpaRepository<AttendanceRecords, Integer> {
}
