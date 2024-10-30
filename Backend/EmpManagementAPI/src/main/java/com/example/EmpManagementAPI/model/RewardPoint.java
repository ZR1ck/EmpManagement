package com.example.EmpManagementAPI.model;

import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.Date;

@Entity
@Table(name = "rewardpoint")
@AllArgsConstructor
@NoArgsConstructor
@Data
public class RewardPoint {

    @Id
    private String empid;
    private int totalpoint;
    private Date lastupdate;
}
