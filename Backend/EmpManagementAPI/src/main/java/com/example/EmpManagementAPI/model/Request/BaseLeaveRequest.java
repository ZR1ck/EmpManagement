package com.example.EmpManagementAPI.model.Request;

import jakarta.persistence.Entity;
import jakarta.persistence.Inheritance;
import jakarta.persistence.InheritanceType;
import jakarta.persistence.MappedSuperclass;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.NoArgsConstructor;

import java.util.Date;

/**
 * This class is the highest node in the leave request hierarchy
 * Its children include LeaveRequest, HalfDayLeaveRequest
 * But this class is not a separate entity and is not directly mapped to a table in the database.
 * Instead, the properties and methods of this class will be inherited by subclasses marked as entities
 */

@EqualsAndHashCode(callSuper = true)
@AllArgsConstructor
@NoArgsConstructor
@Data
@MappedSuperclass
public abstract class BaseLeaveRequest extends BaseRequest {

    private Date startdate;
    private Date enddate;
    private String reason;
    private String leavetype;

}
