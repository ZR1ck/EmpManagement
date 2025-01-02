package com.example.EmpManagementAPI.service.Activity;

import com.example.EmpManagementAPI.DTO.ActivityDTO;
import com.example.EmpManagementAPI.DTO.ActivitySmDTO;
import com.example.EmpManagementAPI.model.Activity.Activity;
import com.example.EmpManagementAPI.repository.Activity.ActivityRepo;
import com.example.EmpManagementAPI.service.FileService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
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
        return extractActivityDTO(activitiesDTO);
    }

    public Activity findActivityById(int id){
        return activityRepo.findById(id).orElseThrow();
    }

    public List<ActivityDTO> getParticipatedActivitiesDTO(String empID){
        List<Object[]> activitiesDTO = activityRepo.findParticipatedActivityDTO(empID);
        return extractActivityDTO(activitiesDTO);
    }

    private List<ActivityDTO> extractActivityDTO(List<Object[]> activities){
        List<ActivityDTO> result = new ArrayList<>();
        for (Object[] row : activities) {
            ActivityDTO activityDTO = new ActivityDTO();
            activityDTO.setActivityId((int) row[0]);
            activityDTO.setTitle(row[1].toString());
            activityDTO.setDescription(row[2].toString());
            activityDTO.setImageUrl((ArrayList<String>) row[3]);
            activityDTO.setParticipants((int) row[4]);
            activityDTO.setStartdate((Date) row[5]);
            activityDTO.setEnddate((Date) row[6]);
            activityDTO.setCreatedate((Date) row[7]);
            activityDTO.setUpdatedate((Date) row[8]);
            result.add(activityDTO);
        }
        return result;
    }

    public ResponseEntity<List<ActivitySmDTO>> findActivitySmDTO() {
        List<Object[]> activitiesDTO = activityRepo.findOngoingActivityDTO();
        List<ActivitySmDTO> result = new ArrayList<>();
        try {
            for (Object[] row : activitiesDTO) {
                ActivitySmDTO activitySmDTO = new ActivitySmDTO();
                activitySmDTO.setActivityId((int) row[0]);
                activitySmDTO.setActivityName((String) row[1]);
                activitySmDTO.setImageUrl(((ArrayList<String>) row[3]).getFirst());
                result.add(activitySmDTO);
            }
            return new ResponseEntity<>(result.size() > 3 ? result.subList(0, 3) : result, HttpStatus.OK);
        }
        catch (Exception e) {
            return new ResponseEntity<>(null, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
}
