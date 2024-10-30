package com.example.EmpManagementAPI.model.Reward;

import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.Date;

@Entity
@AllArgsConstructor
@NoArgsConstructor
@Data
public class Reward {

    @Id
    private int rewardid;
    private Date createdate;
    private String description;
    private String rewardtype;
    private int total;

}
