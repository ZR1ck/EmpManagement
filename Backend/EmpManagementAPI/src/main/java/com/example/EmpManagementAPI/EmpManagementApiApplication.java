package com.example.EmpManagementAPI;

import io.github.cdimascio.dotenv.Dotenv;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

@SpringBootApplication
public class EmpManagementApiApplication {

	public static void main(String[] args) {

		Dotenv dotenv = Dotenv.configure()
				.directory(System.getProperty("user.dir"))
				.ignoreIfMissing()
				.load();
		// Set environment variables
		dotenv.entries().forEach(entry -> {
			System.setProperty(entry.getKey(), entry.getValue());
		});

		// Start Spring Boot application
		SpringApplication.run(EmpManagementApiApplication.class, args);
	}

}
