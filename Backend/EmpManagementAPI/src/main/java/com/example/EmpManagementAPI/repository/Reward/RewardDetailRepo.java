package com.example.EmpManagementAPI.repository.Reward;

import com.example.EmpManagementAPI.DTO.RewardDTO;
import com.example.EmpManagementAPI.DTO.RewardDetailDTO;
import com.example.EmpManagementAPI.model.Reward.RewardDetail;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface RewardDetailRepo extends JpaRepository<RewardDetail, Integer> {

    @Query("SELECT new com.example.EmpManagementAPI.DTO.RewardDTO(r.id, e.empid, r.rewardid, e.name, r.dateawarded) " +
            "FROM RewardDetail r JOIN Emp e ON r.empid = e.empid " +
            "WHERE e.dept.managerid = :managerId " +
            "ORDER BY r.dateawarded DESC ")
    List<RewardDTO> getAllRewardDTO (String managerId);

    @Query("SELECT new com.example.EmpManagementAPI.DTO.RewardDTO(r.id, e.empid, r.rewardid, e.name, r.dateawarded) " +
            "FROM RewardDetail r JOIN Emp e ON r.empid = e.empid " +
            "WHERE e.dept.managerid = :managerId AND YEAR(r.dateawarded) = :year")
    List<RewardDTO> getRewardDTOByYear (String managerId, int year);

    @Query("SELECT new com.example.EmpManagementAPI.DTO.RewardDTO(r.id, e.empid, r.rewardid, e.name, r.dateawarded) " +
            "FROM RewardDetail r JOIN Emp e ON r.empid = e.empid " +
            "WHERE e.dept.managerid = :managerId AND YEAR(r.dateawarded) = :year AND MONTH(r.dateawarded) = :month")
    List<RewardDTO> getRewardDTOByMonth (String managerId, int year, int month);

    @Query("SELECT new com.example.EmpManagementAPI.DTO.RewardDetailDTO(e.empid, e.name, e.dept.deptno, e.dept.description, r, rd.dateawarded) " +
            "FROM RewardDetail rd JOIN Emp e ON rd.empid = e.empid JOIN Reward r ON rd.rewardid = r.rewardid " +
            "WHERE rd.id = :id ")
    RewardDetailDTO getRewardDetailDTO(String id);
}
