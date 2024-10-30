package com.example.EmpManagementAPI.model;

import com.fasterxml.jackson.annotation.*;
import jakarta.persistence.*;
import lombok.*;

import java.util.Date;
import java.util.List;
import java.util.Set;

@Entity
@Table(name = "dept")
@Data
@AllArgsConstructor
@NoArgsConstructor
public class Dept {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int deptno;
    private String description;
    private int empnum;
    private Date createdate;
    private Date lastupdate;

    private String managerid;

    @OneToMany(mappedBy = "dept", fetch = FetchType.LAZY, cascade = CascadeType.ALL)
    @JsonBackReference
    private List<Emp> emps;

}
