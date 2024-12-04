package com.example.EmpManagementAPI.repository.Activity;

import com.example.EmpManagementAPI.model.Activity.Activity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface ActivityRepo extends JpaRepository<Activity, Integer> {
    @Query("SELECT a FROM Activity a WHERE a.enddate >= CURRENT_DATE")
    List<Activity> findOngoingActivity();

    @Query("SELECT a FROM Activity a WHERE a.enddate < CURRENT_DATE")
    List<Activity> findEndedActivity();

    @Query("SELECT a.activityid, a.name, a.description, a.images, a.participantsnum, a.startdate, a.enddate, a.createdate " +
            "FROM Activity a WHERE a.enddate >= CURRENT_DATE")
    List<Object[]> findOngoingActivityDTO();
}
