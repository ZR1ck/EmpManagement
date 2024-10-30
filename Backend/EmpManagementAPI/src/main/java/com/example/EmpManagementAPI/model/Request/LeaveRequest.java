package com.example.EmpManagementAPI.model.Request;

import jakarta.persistence.Entity;
import jakarta.persistence.Table;
import lombok.Data;
import lombok.EqualsAndHashCode;

/**
 * Represents a generic leave request, extending from the BaseLeaveRequest class.
 * This class serves as a base for all specific types of leave requests.
 */

@EqualsAndHashCode(callSuper = true)
@Entity
@Data
@Table(name = "leaverequest")
public class LeaveRequest extends BaseLeaveRequest {
}
