package com.example.EmpManagementAPI.repository;

import com.example.EmpManagementAPI.model.RewardPoint;
import org.springframework.data.jpa.repository.JpaRepository;

public interface RewardPointRepo extends JpaRepository<RewardPoint, String> {
}
