package com.example.EmpManagementAPI.repository;

import com.example.EmpManagementAPI.model.AttendanceRecords;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.Date;

public interface AttendanceRecordsRepo extends JpaRepository<AttendanceRecords, Integer> {

    AttendanceRecords findAttendanceRecordsByAttendancedateAndAndEmpid(Date date, String empId);

    @Query("SELECT COUNT(a.recordid) FROM AttendanceRecords a " +
            "WHERE MONTH(a.attendancedate) = :month AND YEAR(a.attendancedate) = :year AND a.empid = :empId " +
            "AND a.status = 'Present'")
    int countAttendanceRecord(int month, int year, String empId);

    @Query("SELECT COUNT(a.recordid) FROM AttendanceRecords a " +
            "WHERE MONTH(a.attendancedate) = :month AND YEAR(a.attendancedate) = :year AND a.empid = :empId " +
            "AND a.status = 'Absent'")
    int countAbsent(int month, int year, String empId);

    @Query("SELECT COUNT(a.recordid) FROM Emp e JOIN AttendanceRecords a ON a.empid = e.empid " +
            "WHERE e.dept.managerid = :managerId AND a.attendancedate = :date AND a.status = 'Present'")
    int countTeamPresent(String managerId, Date date);

    @Query("SELECT COUNT(a.recordid) FROM Emp e JOIN AttendanceRecords a ON a.empid = e.empid " +
            "WHERE e.dept.managerid = :managerId AND a.attendancedate = :date AND a.status = 'Absent'")
    int countTeamAbsent(String managerId, Date date);

}
