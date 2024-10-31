package com.example.EmpManagementAPI.model;

import com.example.EmpManagementAPI.model.Request.TimeAttendanceUpdateRequest;
import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalTime;
import java.util.Date;

@Entity
@Table(name = "attendancerecords")
@AllArgsConstructor
@NoArgsConstructor
@Data
public class AttendanceRecords {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int recordid;
    private Date attendancedate;
    private LocalTime checkintime;
    private LocalTime checkouttime;
    private String status;
    private String empid;
}
