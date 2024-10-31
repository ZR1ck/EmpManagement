package com.example.EmpManagementAPI.model;

import com.example.EmpManagementAPI.model.Activity.ActivityApproval;
import com.fasterxml.jackson.annotation.*;
import io.hypersistence.utils.hibernate.type.array.ListArrayType;
import jakarta.persistence.*;
import lombok.*;
import org.hibernate.annotations.Type;

import java.util.Date;
import java.util.List;
import java.util.Set;

@Entity
@Table(name = "emp")
@Data
@AllArgsConstructor
@NoArgsConstructor
public class Emp {
    @Id
    private String empid;
    private String name;
    private String permanentaddress;
    private String tempaddress;

    @Type(ListArrayType.class)
    @Column(name = "personalemail", columnDefinition = "text[]")
    private List<String> personalemail;

    @Type(ListArrayType.class)
    @Column(name = "phonenum", columnDefinition = "text[]")
    private List<String> phonenum;

    @Type(ListArrayType.class)
    @Column(name = "emergencynum", columnDefinition = "text[]")
    private List<String> emergencynum;

    @Type(ListArrayType.class)
    @Column(name = "bankaccountno", columnDefinition = "text[]")
    private List<String> bankaccountno;

    private String gender;
    private Date birth;
    private String nationality;
    private String position;
    private String jobtype;
    private Date startdate;
    private String qrurl;
    private String avatarurl;
    private Date createdate;
    private Date lastupdate;

    @ManyToOne(fetch = FetchType.EAGER, optional = false)
    @JoinColumn(name = "deptno", nullable = false)
    private Dept dept;

//    @OneToMany(mappedBy = "emp", fetch = FetchType.LAZY, cascade = CascadeType.ALL)
//    @JsonManagedReference
//    private List<LeaveTypes> leaveTypes;

//    @OneToMany(mappedBy = "emp")
//    @JsonBackReference
//    private List<ActivityApproval> approvals;
}
