package com.example.EmpManagementAPI.model.Request;

import jakarta.persistence.Entity;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.NoArgsConstructor;

/**
 * Represents a generic request, extending from the BaseRequest class.
 * This class serves as a base for all specific types of requests.
 */

@EqualsAndHashCode(callSuper = true)
@Entity
@Table(name = "request")
@Data
public class Request extends BaseRequest {
}
