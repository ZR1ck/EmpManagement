package com.example.EmpManagementAPI.model;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Table(name = "leavetypes")
@Data
@AllArgsConstructor
@NoArgsConstructor
public class LeaveTypes {
    @Id
    private int id;
    private int year;
    private int annual;
    private int marriage;
    private int funeral;
    private int sick;
    private int unpaid;


    private String empid;

//    @ManyToOne(fetch = FetchType.LAZY, optional = false)
//    @JoinColumn(name = "empid", nullable = false)
//    @JsonBackReference
//    private Emp emp;
}
