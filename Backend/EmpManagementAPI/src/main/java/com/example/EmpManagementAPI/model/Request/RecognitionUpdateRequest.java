package com.example.EmpManagementAPI.model.Request;

import jakarta.persistence.Entity;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.NoArgsConstructor;

@EqualsAndHashCode(callSuper = true)
@Entity
@Table(name = "recognitionupdaterequest")
@AllArgsConstructor
@NoArgsConstructor
@Data
public class RecognitionUpdateRequest extends BaseRequest {

    private String declinereason;
    private String reason;

}
