package com.example.EmpManagementAPI.model.Activity;

import com.fasterxml.jackson.annotation.JsonBackReference;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@AllArgsConstructor
@NoArgsConstructor
@Data
public class Participations {

    @Id
    private int id;
    private String empid;
//    private String activityid;
    private int score;
    private int rank;
    private String notes;

    @ManyToOne
    @JoinColumn(name = "activityid")
    @JsonBackReference
    private Activity activity;
}
