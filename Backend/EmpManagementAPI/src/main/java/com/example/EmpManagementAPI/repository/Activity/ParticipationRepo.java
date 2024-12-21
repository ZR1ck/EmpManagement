package com.example.EmpManagementAPI.repository.Activity;

import com.example.EmpManagementAPI.DTO.LeaderboardDTO;
import com.example.EmpManagementAPI.model.Activity.Participations;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface ParticipationRepo extends JpaRepository<Participations, Integer> {

    Participations findByActivity_ActivityidAndEmpid(int activityid, String empid);

    @Query("SELECT new com.example.EmpManagementAPI.DTO.LeaderboardDTO(" +
            "e.empid, e.name, e.dept.description, e.dept.deptno, e.avatarurl, p.activity.activityid, p.score, p.rank) " +
            "FROM Participations p JOIN Emp e ON p.empid = e.empid " +
            "WHERE p.activity.activityid = :activityid " +
            "ORDER BY p.rank")
    List<LeaderboardDTO> getLeaderboardDTO(int activityid);

}
