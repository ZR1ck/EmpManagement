package com.example.EmpManagementAPI.DTO;

import io.hypersistence.utils.hibernate.type.array.ListArrayType;
import io.hypersistence.utils.hibernate.type.array.StringArrayType;
import jakarta.persistence.Column;
import lombok.*;
import org.hibernate.annotations.Type;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class EmpDTO {
    private String id;
    private String name;
    private String email;
    private String position;
    private Boolean isActive;
    private Date lastActive;
}
