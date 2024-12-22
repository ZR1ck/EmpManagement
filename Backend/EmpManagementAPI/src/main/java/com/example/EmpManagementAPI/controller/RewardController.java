package com.example.EmpManagementAPI.controller;

import com.example.EmpManagementAPI.DTO.RewardDTO;
import com.example.EmpManagementAPI.service.Reward.RewardService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/reward")
@CrossOrigin
public class RewardController {

    @Autowired
    private RewardService rewardService;

    @GetMapping("/all")
    public ResponseEntity<List<RewardDTO>> getAll(@RequestParam("managerId") String managerId) {
        return rewardService.getReward(managerId);
    }

    @GetMapping("/date")
    public ResponseEntity<List<RewardDTO>> getRewardByDate(@RequestParam("year") String year, @RequestParam("month") String month, @RequestParam("managerId") String managerId) {
        return rewardService.getRewardByDate(managerId, year, month);
    }

    @GetMapping("/generate-reward-pdf/{id}")
    public ResponseEntity<byte[]> generateRewardPDF(@PathVariable String id, @RequestParam String managerId) {
        return rewardService.generateRewardPDF(id, managerId);
    }
}
