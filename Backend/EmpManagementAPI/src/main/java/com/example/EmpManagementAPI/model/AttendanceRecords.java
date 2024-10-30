package com.example.EmpManagementAPI.model;

import com.example.EmpManagementAPI.model.Request.TimeAttendanceUpdateRequest;
import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.OneToOne;
import jakarta.persistence.Table;
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
    private int recordid;
    private Date attendancedate;
    private LocalTime checkintime;
    private LocalTime checkouttime;
    private String status;
    private String empid;

    @OneToOne(mappedBy = "record")
    @JsonIgnore
    private TimeAttendanceUpdateRequest request;
}
