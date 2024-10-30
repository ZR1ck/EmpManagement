package com.example.EmpManagementAPI.model;

import io.hypersistence.utils.hibernate.type.array.ListArrayType;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.Type;

import java.util.Date;
import java.util.List;

@Entity
@AllArgsConstructor
@NoArgsConstructor
@Data
public class Account {

    @Id
    private String empid;
    private String username;
    private String password;

    @Type(ListArrayType.class)
    @Column(name = "role", columnDefinition = "text[]")
    private List<String> role;

    private Date createdate;
    private Date lastupdate;
    private boolean isactive;
    private Date lastlogin;
}
