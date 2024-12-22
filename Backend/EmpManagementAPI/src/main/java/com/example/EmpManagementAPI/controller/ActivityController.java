package com.example.EmpManagementAPI.controller;

import java.util.List;

import com.example.EmpManagementAPI.DTO.ActivityDTO;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import com.example.EmpManagementAPI.model.Activity.Activity;
import com.example.EmpManagementAPI.service.Activity.ActivityService;

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

//    @GetMapping("/ongoing")
//    public ResponseEntity<List<Activity>> getOngoingActivities() {
//        try {
//            List<Activity> activities = activityService.getOnGoingActivities();
//            if (!activities.isEmpty()) {
//                return new ResponseEntity<>(activities, HttpStatus.OK);
//            } else {
//                return new ResponseEntity<>(null, HttpStatus.NOT_FOUND);
//            }
//        } catch (Exception e) {
//            return new ResponseEntity<>(null, HttpStatus.INTERNAL_SERVER_ERROR);
//        }
//    }

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

    @GetMapping("/ongoing")
    public ResponseEntity<List<ActivityDTO>> getOngoingActivities() {
        try {
            List<ActivityDTO> activities = activityService.getOnGoingActivitiesDTO();
            if (!activities.isEmpty()) {
                return new ResponseEntity<>(activities, HttpStatus.OK);
            } else {
                return new ResponseEntity<>(null, HttpStatus.NOT_FOUND);
            }
        } catch (Exception e) {
            return new ResponseEntity<>(null, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @GetMapping("/{id}")
    public ResponseEntity<Activity> getActivityById(@PathVariable("id") int id) {
        try {
            Activity activity = activityService.findActivityById(id);
            if (activity != null) {
                return new ResponseEntity<>(activity, HttpStatus.OK);
            }
            else {
                return new ResponseEntity<>(null, HttpStatus.NOT_FOUND);
            }
        }
        catch (Exception e) {
            return new ResponseEntity<>(null, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @GetMapping("/participated/{empId}")
    public ResponseEntity<List<ActivityDTO>> getParticipatedActivities(@PathVariable("empId") String empId) {
        try {
            List<ActivityDTO> activities = activityService.getParticipatedActivitiesDTO(empId);
            if (!activities.isEmpty()) {
                return new ResponseEntity<>(activities, HttpStatus.OK);
            } else {
                return new ResponseEntity<>(null, HttpStatus.NOT_FOUND);
            }
        }
        catch (Exception e) {
            return new ResponseEntity<>(null, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

}
