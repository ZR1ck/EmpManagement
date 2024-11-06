package com.example.EmpManagementAPI.model.Request;

import java.util.Date;
import java.util.List;

import org.hibernate.annotations.Type;

import com.example.EmpManagementAPI.model.Emp;

import io.hypersistence.utils.hibernate.type.array.ListArrayType;
import jakarta.persistence.Column;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.MappedSuperclass;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

/**
 * This class is the highest node in the request hierarchy
 * Its children include Request, WFHRequest, TimeAttendanceUpdateRequest, BaseLeaveRequest
 * But this class is not a separate entity and is not directly mapped to a table in the database.
 * Instead, the properties and methods of this class will be inherited by subclasses marked as entities
 */

@AllArgsConstructor
@NoArgsConstructor
@Data
@MappedSuperclass
public abstract class BaseRequest {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "requestid") // Ensure this matches the column name in the database
    private int requestId;
    @Column(name = "createdate") // Ensure this matches the column name in the database
    private Date createDate;
    @Column(name = "approvalstatus") // Ensure this matches the column name in the database
    private String approvalStatus;
    @Column(name = "notes") // Ensure this matches the column name in the database
    private String notes;

    @Type(ListArrayType.class)
    @Column(name = "attachmenturl", columnDefinition = "text[]")
    private List<String> attachmentUrl;

    @Column(name = "empid")
    private String empId;

    @Column(name = "managerid")
    private String managerId;
}
