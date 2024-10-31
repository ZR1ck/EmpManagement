package com.example.EmpManagementAPI.model.Request;

import io.hypersistence.utils.hibernate.type.array.ListArrayType;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.Type;

import java.util.Date;
import java.util.List;

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
    private int requestid;
    private Date createdate;
    private String approvalstatus;
    private String notes;

    @Type(ListArrayType.class)
    @Column(name = "attachmenturl", columnDefinition = "text[]")
    private List<String> attachmenturl;

    private String empid;
    private String managerid;
}
