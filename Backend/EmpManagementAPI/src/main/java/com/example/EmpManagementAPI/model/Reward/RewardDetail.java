package com.example.EmpManagementAPI.model.Reward;

import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.Date;

@Entity
@Table(name = "rewarddetail")
@AllArgsConstructor
@NoArgsConstructor
@Data
public class RewardDetail {

    @Id
    private int id;
    private int rewardid;
    private String empid;
    private Date dateawarded;

}
