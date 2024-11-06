package com.example.EmpManagementAPI.repository;

import com.example.EmpManagementAPI.model.Account;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface AccountRepo extends JpaRepository<Account, String> {
    Account findByUsername(String username);
}
