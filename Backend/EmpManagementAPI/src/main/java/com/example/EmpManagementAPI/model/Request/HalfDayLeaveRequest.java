package com.example.EmpManagementAPI.model.Request;

import jakarta.persistence.Entity;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.NoArgsConstructor;

import java.time.LocalTime;

/**
 * Represents a half day request, extending from the BaseLeaveRequest class.
 */
@EqualsAndHashCode(callSuper = true)
@Entity
@Table(name = "halfdayleaverequest")
@AllArgsConstructor
@NoArgsConstructor
@Data
public class HalfDayLeaveRequest extends BaseLeaveRequest {

    private LocalTime starthour;
    private LocalTime endhour;

}
