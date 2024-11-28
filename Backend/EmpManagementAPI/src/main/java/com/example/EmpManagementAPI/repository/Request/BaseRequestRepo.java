package com.example.EmpManagementAPI.repository.Request;

import com.example.EmpManagementAPI.model.Request.Request;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface BaseRequestRepo extends JpaRepository<Request, Integer> {
    @Query(value = """
    select r.requestId, r.empId, e.name, r.managerId, r.approvalStatus, r.createDate, r.source from (
        select r1.requestId, r1.empId, r1.managerId, r1.createDate, r1.approvalStatus, 'Request' as source
        from Request r1 where r1.managerId = :managerId union 
        select r2.requestId, r2.empId, r2.managerId, r2.createDate, r2.approvalStatus, 'LeaveRequest' as source
        from LeaveRequest r2 where r2.managerId = :managerId union 
        select r3.requestId, r3.empId, r3.managerId, r3.createDate, r3.approvalStatus, 'HalfDayLeaveRequest' as source
        from HalfDayLeaveRequest r3 where r3.managerId = :managerId union 
        select r4.requestId, r4.empId, r4.managerId, r4.createDate, r4.approvalStatus, 'TimeAttendanceUpdateRequest' as source
        from TimeAttendanceUpdateRequest r4 where r4.managerId = :managerId union 
        select r5.requestId, r5.empId, r5.managerId, r5.createDate, r5.approvalStatus, 'WFHRequest' as source
        from WFHRequest r5 where r5.managerId = :managerId
    ) r join Emp e on r.empId = e.empId
    where EXTRACT(YEAR FROM r.createDate) = EXTRACT(YEAR FROM CURRENT_DATE)
    order by r.source asc, r.requestId asc
    """, nativeQuery = true)
    List<Object[]> findAllRequests(String managerId);
}
