package com.example.EmpManagementAPI.model.Request;

import jakarta.persistence.Entity;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.NoArgsConstructor;

import java.util.Date;

/**
 * Represents a work from home request, extending from the BaseRequest class.
 */
@EqualsAndHashCode(callSuper = true)
@Entity
@Table(name = "wfhrequest")
@AllArgsConstructor
@NoArgsConstructor
@Data
public class WFHRequest extends BaseRequest {
    private Date startdate;
    private Date enddate;
    private String reason;
}
