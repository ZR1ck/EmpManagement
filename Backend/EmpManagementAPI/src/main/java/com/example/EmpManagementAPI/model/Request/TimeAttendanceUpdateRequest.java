package com.example.EmpManagementAPI.model.Request;

import com.example.EmpManagementAPI.model.AttendanceRecords;
import com.fasterxml.jackson.annotation.JsonManagedReference;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

/**
 * Represents a time attendance update request, extending from the BaseRequest class.
 */

@Entity
@Table(name = "timeattendanceupdaterequest")
@AllArgsConstructor
@NoArgsConstructor
@Data
public class TimeAttendanceUpdateRequest extends BaseRequest {

    @OneToOne
    @JoinColumn(name = "recordid")
    private AttendanceRecords record;
}
