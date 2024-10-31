package com.example.EmpManagementAPI.model.Activity;

import com.example.EmpManagementAPI.model.Emp;
import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonManagedReference;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.Date;

@Entity
@Table(name = "activityapproval")
@AllArgsConstructor
@NoArgsConstructor
@Data
public class ActivityApproval {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;
    private Date createdate;
    private String approvalstatus;
    private int activityid;
    private String empid;
    private String managerid;

//    @ManyToOne
//    @JoinColumn(name = "empid")
//    @JsonManagedReference
//    private Emp emp;

//    @ManyToOne
//    @JoinColumn(name = "activityid")
//    @JsonBackReference
//    private Activity activity;
}
