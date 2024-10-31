package com.example.EmpManagementAPI.model.Activity;

import com.fasterxml.jackson.annotation.JsonBackReference;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@AllArgsConstructor
@NoArgsConstructor
@Data
public class Participations {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
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
