package com.example.EmpManagementAPI.service.Activity;

import com.example.EmpManagementAPI.model.Activity.Activity;
import com.example.EmpManagementAPI.repository.Activity.ActivityRepo;
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
    private final String ACTIVITY_UPLOADS_PATH = "uploads/activities";

    @Autowired
    private ActivityRepo activityRepo;

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
        List<String> activityImages = new ArrayList<>();
        for (MultipartFile file : files) {
            String filename = UUID.randomUUID() + "_" + file.getOriginalFilename();
            Path filePath = Paths.get(ACTIVITY_UPLOADS_PATH, filename);

            Files.createDirectories(filePath.getParent());

            Files.copy(file.getInputStream(), filePath);

            String imgUrl = "http://localhost:8080/images/uploads/activities/" + filename;
            activityImages.add(imgUrl);
        }
        activity.setImages(activityImages);

        return activityRepo.save(activity);
    }
}
