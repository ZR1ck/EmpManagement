package com.example.EmpManagementAPI.model.Activity;

import com.fasterxml.jackson.annotation.JsonManagedReference;
import io.hypersistence.utils.hibernate.type.array.ListArrayType;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.Type;

import java.util.Date;
import java.util.List;

@Entity
@AllArgsConstructor
@NoArgsConstructor
@Data
public class Activity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int activityid;
    private String name;
    private Date startdate;
    private Date enddate;
    private String location;
    private String managerid;

    @Type(ListArrayType.class)
    @Column(name = "images", columnDefinition = "text[]")
    private List<String> images;

    private String description;
    private String rules;
    private String criteria;
    private String reward;
    private int participantsnum;
    private Date createdate;
    private Date lastupdate;
    private String targetparticipants;

//    @OneToMany(mappedBy = "activity")
//    @JsonManagedReference
//    private List<ActivityApproval> activityApproval;

    @OneToMany(mappedBy = "activity")
    @JsonManagedReference
    private List<Participations> participations;
}
