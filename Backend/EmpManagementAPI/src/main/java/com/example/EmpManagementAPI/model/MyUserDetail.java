package com.example.EmpManagementAPI.model;

import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import java.util.Collection;
import java.util.Collections;
import java.util.List;
import java.util.stream.Collectors;

public class MyUserDetail implements UserDetails {

    private Account account;

    public MyUserDetail(Account account) {
        this.account = account;
    }

    public String getId() {
        return account.getEmpid();
    }

    @Override
    public Collection<? extends GrantedAuthority> getAuthorities() {
        return account.getRole().stream()
                .map(SimpleGrantedAuthority::new)
                .collect(Collectors.toList());
    }

    @Override
    public String getPassword() {
        return account.getPassword();
    }

    @Override
    public String getUsername() {
        return account.getUsername();
    }
}
