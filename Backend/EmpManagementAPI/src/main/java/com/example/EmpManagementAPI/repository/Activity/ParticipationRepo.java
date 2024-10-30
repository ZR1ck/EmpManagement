package com.example.EmpManagementAPI.repository.Activity;

import com.example.EmpManagementAPI.model.Activity.Participations;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ParticipationRepo extends JpaRepository<Participations, Integer> {
}
