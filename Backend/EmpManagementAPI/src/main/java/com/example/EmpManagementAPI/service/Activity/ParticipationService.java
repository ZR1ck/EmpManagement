package com.example.EmpManagementAPI.service.Activity;

import com.example.EmpManagementAPI.DTO.LeaderboardDTO;
import com.example.EmpManagementAPI.model.Activity.Participations;
import com.example.EmpManagementAPI.repository.Activity.ParticipationRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ParticipationService {

    @Autowired
    private ParticipationRepo participationRepo;

    public ResponseEntity<Participations> findByActivity_ActivityidAndEmpid(int activityid, String empid) {
        try {
            Participations p = participationRepo.findByActivity_ActivityidAndEmpid(activityid, empid);
            if (p == null) {
                return new ResponseEntity<>(HttpStatus.NOT_FOUND);
            }
            return new ResponseEntity<>(p, HttpStatus.OK);
        }
        catch (Exception e) {
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    public ResponseEntity<List<LeaderboardDTO>> getLeaderboardDTO(int activityid) {
        try {
            List<LeaderboardDTO> l = participationRepo.getLeaderboardDTO(activityid);
            if (l == null || l.isEmpty()) {
                return new ResponseEntity<>(null, HttpStatus.NOT_FOUND);
            }
            return new ResponseEntity<>(l, HttpStatus.OK);
        }
        catch (Exception e) {
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    public ResponseEntity<Integer> countParticipated(String empId) {
        try {
            int count = participationRepo.countByEmpid(empId);
            if (count == 0) {
                return new ResponseEntity<>(HttpStatus.NOT_FOUND);
            }
            return new ResponseEntity<>(count, HttpStatus.OK);
        }
        catch (Exception e) {
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

}
