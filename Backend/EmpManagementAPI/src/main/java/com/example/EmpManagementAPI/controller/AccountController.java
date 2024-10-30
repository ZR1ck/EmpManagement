package com.example.EmpManagementAPI.controller;

import com.example.EmpManagementAPI.model.Account;
import com.example.EmpManagementAPI.service.Auth.AccountService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

@RestController
@CrossOrigin
public class AccountController {

    @Autowired
    AccountService accountService;

    @PostMapping("/register")
    public ResponseEntity<?>  register(@RequestBody Account account) {
        return accountService.register(account);
    }

    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody Account account) {
        return accountService.verify(account);
    }

}
