package com.example.EmpManagementAPI.repository.Activity;

import com.example.EmpManagementAPI.DTO.ActivityApprovalDTO;
import com.example.EmpManagementAPI.model.Activity.ActivityApproval;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

public interface ActivityApprovalRepo extends JpaRepository<ActivityApproval, Integer> {

    @Query("select new com.example.EmpManagementAPI.DTO.ActivityApprovalDTO(aa.id, e.empid, e.name, e.dept.deptno, e.dept.description, a.activityid, a.name, aa.createdate, aa.approvalstatus) " +
            "from ActivityApproval aa join Emp e on aa.empid = e.empid join Activity a on aa.activityid = a.activityid " +
            "where a.managerid = :managerId ")
    List<ActivityApprovalDTO> getActivityApprovalDTO(String managerId);

    @Modifying
    @Transactional
    @Query("update ActivityApproval a set a.approvalstatus = :status where a.id = :id")
    int updateActivityApprovalStatus(int id, String status);
}
