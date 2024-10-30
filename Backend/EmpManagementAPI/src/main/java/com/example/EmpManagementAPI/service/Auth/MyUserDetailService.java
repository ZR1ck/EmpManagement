package com.example.EmpManagementAPI.service.Auth;

import com.example.EmpManagementAPI.model.Account;
import com.example.EmpManagementAPI.model.MyUserDetail;
import com.example.EmpManagementAPI.repository.AccountRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

@Service
public class MyUserDetailService implements UserDetailsService {

    @Autowired
    AccountRepo accountRepo;

    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        Account account = accountRepo.findByUsername(username);

        if (account == null) {
            throw new UsernameNotFoundException("User not found");
        }

        return new MyUserDetail(account);
    }
}
