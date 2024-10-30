package com.example.EmpManagementAPI.repository;

import com.example.EmpManagementAPI.model.Account;
import org.springframework.data.jpa.repository.JpaRepository;

public interface AccountRepo extends JpaRepository<Account, String> {
    Account findByUsername(String username);
}
