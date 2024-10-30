package com.example.EmpManagementAPI.service.Auth;

import ch.qos.logback.core.util.StringUtil;
import com.example.EmpManagementAPI.model.Account;
import com.example.EmpManagementAPI.model.Emp;
import com.example.EmpManagementAPI.repository.AccountRepo;
import com.example.EmpManagementAPI.service.EmpService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.*;

@Service
public class AccountService {

    @Autowired
    private AccountRepo accountRepo;

    @Autowired
    private AuthenticationManager authenticationManager;

    @Autowired
    private JwtService jwtService;

    @Autowired
    private EmpService empService;

    private BCryptPasswordEncoder encoder = new BCryptPasswordEncoder(10);

    public ResponseEntity<?> register(Account account) {
        if (accountRepo.findById(account.getEmpid()).isPresent()) {
            return new ResponseEntity<>("Account already exists", HttpStatus.BAD_REQUEST);
        }

        String position = empService.getEmpPositionById(account.getEmpid());
        if (StringUtil.notNullNorEmpty(position)) {
            if (accountRepo.findByUsername(account.getUsername()) != null) {
                return new ResponseEntity<>("Username " + account.getUsername() + " is already taken.", HttpStatus.CONFLICT);
            }

            List<String> roles = new ArrayList<>();
            if (position.contains("Manager")) {
                roles.add("Manager");
            }
            if (position.contains("HR")) {
                roles.add("HR");
            }
            roles.add("Employee");

            account.setCreatedate(new Date());
            account.setLastupdate(new Date());
            account.setRole(roles);
            account.setPassword(encoder.encode(account.getPassword()));

            return new ResponseEntity<>(accountRepo.save(account), HttpStatus.CREATED);
        }
        else {
            return new ResponseEntity<>("Employee with ID " + account.getEmpid() + " not found", HttpStatus.NOT_FOUND);
        }
    }


    public ResponseEntity<Map<String, Object>> verify(Account account) {

        Map<String, Object> response = new HashMap<>();

        try {
            if (account == null || account.getUsername() == null || account.getUsername().isEmpty()
                    || account.getPassword() == null || account.getPassword().isEmpty()) {
                return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(response);
            }

            Authentication authentication = authenticationManager.authenticate(
                    new UsernamePasswordAuthenticationToken(account.getUsername(), account.getPassword()));

            if (authentication.isAuthenticated()) {
                String token = jwtService.generateToken(account.getUsername());
                response.put("token", token);
                response.put("message", "Login successful");
                return ResponseEntity.ok(response);
            }

            response.put("message", "Authentication failed.");
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(response);
        } catch (BadCredentialsException e) {
            response.put("message", "Invalid username or password.");
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(response);
        } catch (Exception e) {
            response.put("message", "An error occurred: " + e.getMessage());
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(response);
        }
    }
}
