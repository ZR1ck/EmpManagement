package com.example.EmpManagementAPI.repository.Activity;

import com.example.EmpManagementAPI.model.Activity.Activity;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ActivityRepo extends JpaRepository<Activity, Integer> {
}
