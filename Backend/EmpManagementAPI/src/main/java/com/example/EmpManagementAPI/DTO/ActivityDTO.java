package com.example.EmpManagementAPI.DTO;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.Date;
import java.util.List;

@AllArgsConstructor
@NoArgsConstructor
@Data
public class ActivityDTO {
    private int activityId;
    private String title;
    private String description;
    private List<String> imageUrl;
    private int participants;
    private Date startdate;
    private Date enddate;
    private Date createdate;
}
