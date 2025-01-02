package com.example.EmpManagementAPI.controller;

import com.example.EmpManagementAPI.DTO.LeaderboardDTO;
import com.example.EmpManagementAPI.model.Activity.Participations;
import com.example.EmpManagementAPI.service.Activity.ParticipationService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/participation")
public class ParticipationController {

    @Autowired
    private ParticipationService participationService;

    @GetMapping("/score")
    public ResponseEntity<Participations> getScore(@RequestParam("activityId") int activityId, @RequestParam("empId") String empId) {
        return participationService.findByActivity_ActivityidAndEmpid(activityId, empId);
    }

    @GetMapping("/leaderboard")
    public ResponseEntity<List<LeaderboardDTO>> getLeaderboard(@RequestParam("activityId") int activityId) {
        return participationService.getLeaderboardDTO(activityId);
    }

    @GetMapping("/participated-count/{empId}")
    public ResponseEntity<Integer> countParticipated(@PathVariable String empId) {
        return participationService.countParticipated(empId);
    }

}
