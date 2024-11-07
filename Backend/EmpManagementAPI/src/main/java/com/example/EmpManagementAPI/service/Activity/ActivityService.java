package com.example.EmpManagementAPI.service.Activity;

import com.example.EmpManagementAPI.model.Activity.Activity;
import com.example.EmpManagementAPI.repository.Activity.ActivityRepo;
import com.example.EmpManagementAPI.service.FileService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.ArrayList;
import java.util.List;
import java.util.UUID;

@Service
public class ActivityService {

    @Autowired
    private ActivityRepo activityRepo;

    @Autowired
    private FileService fileService;

    public List<Activity> getAllActivities(){
        return activityRepo.findAll();
    }

    public List<Activity> getOnGoingActivities(){
        return activityRepo.findOngoingActivity();
    }

    public List<Activity> getEndedActivities(){
        return activityRepo.findEndedActivity();
    }

    public Activity addActivity(Activity activity, MultipartFile[] files) throws IOException {
        List<String> activityImages = fileService.addFiles(files, FileService.ACTIVITIES);
        activity.setImages(activityImages);

        return activityRepo.save(activity);
    }
}
