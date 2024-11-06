package com.example.EmpManagementAPI.controller;

import com.example.EmpManagementAPI.model.Activity.Activity;
import com.example.EmpManagementAPI.service.Activity.ActivityService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

@RestController
@CrossOrigin
@RequestMapping("/api/activity")
public class ActivityController {

    @Autowired
    private ActivityService activityService;

    @GetMapping("/all")
    public ResponseEntity<List<Activity>> getAllActivities() {
        try {
            return new ResponseEntity<>(activityService.getAllActivities(), HttpStatus.OK);
        } catch (Exception e) {
            return new ResponseEntity<>(null, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @GetMapping("/ongoing")
    public ResponseEntity<List<Activity>> getOngoingActivities() {
        try {
            List<Activity> activities = activityService.getOnGoingActivities();
            if (!activities.isEmpty()) {
                return new ResponseEntity<>(activities, HttpStatus.OK);
            } else {
                return new ResponseEntity<>(null, HttpStatus.NOT_FOUND);
            }
        } catch (Exception e) {
            return new ResponseEntity<>(null, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @GetMapping("/ended")
    public ResponseEntity<List<Activity>> getEndedActivities() {
        try {
            List<Activity> activities = activityService.getEndedActivities();
            if (!activities.isEmpty()) {
                return new ResponseEntity<>(activities, HttpStatus.OK);
            }
            else {
                return new ResponseEntity<>(null, HttpStatus.NOT_FOUND);
            }
        } catch (Exception e) {
            return new ResponseEntity<>(null, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @PostMapping("/add")
    public ResponseEntity<Activity> addActivity(@RequestPart("activity") Activity activity, @RequestParam("images") MultipartFile[] images) {
        try {
            return new ResponseEntity<>(activityService.addActivity(activity, images), HttpStatus.CREATED);
        }
        catch (Exception e) {
            return new ResponseEntity<>(null, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
}
