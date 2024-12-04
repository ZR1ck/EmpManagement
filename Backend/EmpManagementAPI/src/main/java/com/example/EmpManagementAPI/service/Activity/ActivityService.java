package com.example.EmpManagementAPI.service.Activity;

import com.example.EmpManagementAPI.DTO.ActivityDTO;
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
import java.util.Date;
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

    public List<ActivityDTO> getOnGoingActivitiesDTO(){
        List<Object[]> activitiesDTO = activityRepo.findOngoingActivityDTO();
        List<ActivityDTO> result = new ArrayList<>();
        for (Object[] row : activitiesDTO) {
            ActivityDTO activityDTO = new ActivityDTO();
            activityDTO.setActivityId((int) row[0]);
            activityDTO.setTitle(row[1].toString());
            activityDTO.setDescription(row[2].toString());
            activityDTO.setImageUrl((ArrayList<String>) row[3]);
            activityDTO.setParticipants((int) row[4]);
            activityDTO.setStartdate((Date) row[5]);
            activityDTO.setEnddate((Date) row[6]);
            activityDTO.setCreatedate((Date) row[7]);
            result.add(activityDTO);
        }
        return result;
    }

    public Activity findActivityById(int id){
        return activityRepo.findById(id).orElseThrow();
    }
}
