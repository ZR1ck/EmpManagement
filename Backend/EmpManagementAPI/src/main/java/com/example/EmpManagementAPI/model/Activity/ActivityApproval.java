package com.example.EmpManagementAPI.model.Activity;

import java.util.Date;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

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

//    @ManyToOne
//    @JoinColumn(name = "empid")
//    @JsonManagedReference
//    private Emp emp;

//    @ManyToOne
//    @JoinColumn(name = "activityid")
//    @JsonBackReference
//    private Activity activity;
}
