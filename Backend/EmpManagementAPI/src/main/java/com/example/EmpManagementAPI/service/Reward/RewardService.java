package com.example.EmpManagementAPI.service.Reward;

import com.example.EmpManagementAPI.DTO.RewardDTO;
import com.example.EmpManagementAPI.DTO.RewardDetailDTO;
import com.example.EmpManagementAPI.model.Emp;
import com.example.EmpManagementAPI.repository.EmpRepo;
import com.example.EmpManagementAPI.repository.Reward.RewardDetailRepo;
import com.itextpdf.text.*;
import com.itextpdf.text.pdf.PdfWriter;
import com.itextpdf.text.pdf.draw.LineSeparator;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.io.ByteArrayOutputStream;
import java.io.IOException;
import java.io.InputStream;
import java.net.URLEncoder;
import java.nio.charset.StandardCharsets;
import java.text.SimpleDateFormat;
import java.util.List;

@Service
public class RewardService {

    @Autowired
    private RewardDetailRepo rewardDetailRepo;

    @Autowired
    private EmpRepo empRepo;

    public ResponseEntity<List<RewardDTO>> getReward(String managerId) {
        try {
            List<RewardDTO> list = rewardDetailRepo.getAllRewardDTO(managerId);
            return new ResponseEntity<>(list, HttpStatus.OK);
        }
        catch (Exception e) {
            return new ResponseEntity<>(null, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    public ResponseEntity<List<RewardDTO>> getRewardByDate(String managerId, String year, String month) {
        try {
            int m = Integer.parseInt(month);
            int y = Integer.parseInt(year);
            List<RewardDTO> list = null;
            if (m != -1 && y != -1) {
                list = rewardDetailRepo.getRewardDTOByMonth(managerId, y, m);
            }
            else if (y != -1) {
                list = rewardDetailRepo.getRewardDTOByYear(managerId, y);
            }
            return new ResponseEntity<>(list, HttpStatus.OK);
        }
        catch (Exception e) {
            return new ResponseEntity<>(null, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    public ResponseEntity<byte[]> generateRewardPDF(String id, String managerId){
        ByteArrayOutputStream byteArrayOutputStream = new ByteArrayOutputStream();
        try {
            RewardDetailDTO reward = rewardDetailRepo.getRewardDetailDTO(id);
            Emp manager = empRepo.findByEmpid(managerId);

            if (reward == null) {
                return new ResponseEntity<>(null, HttpStatus.NOT_FOUND);
            }
            if (manager == null) {
                return new ResponseEntity<>(null, HttpStatus.INTERNAL_SERVER_ERROR);
            }

            Document document = new Document(PageSize.A4);
            PdfWriter.getInstance(document, byteArrayOutputStream);
            document.open();

            Font titleFont = new Font(Font.FontFamily.HELVETICA, 24, Font.BOLD, BaseColor.DARK_GRAY);
            Paragraph title = new Paragraph("EMPLOYEE RECOGNITION FORM", titleFont);
            title.setAlignment(Element.ALIGN_CENTER);
            title.setSpacingAfter(20);
            document.add(title);

            float lineHeight = 14f;

            Font sectionFont = new Font(Font.FontFamily.HELVETICA, 16, Font.BOLD, BaseColor.DARK_GRAY);
            Font lineFont = new Font(Font.FontFamily.HELVETICA, 14);

            LineSeparator line = new LineSeparator();
            line.setLineWidth(1f);
            line.setPercentage(80);
            line.setAlignment(Element.ALIGN_CENTER);

            // 1. Manager Information
            Paragraph managerInfo = new Paragraph("1. Manager Information", sectionFont);
            managerInfo.setSpacingBefore(lineHeight);
            managerInfo.setIndentationLeft(20);
            managerInfo.setLeading(25f);
            document.add(managerInfo);

            // Thông tin quản lý
            Paragraph managerNameParagraph = new Paragraph("Full Name of Manager: " + manager.getName(), lineFont);
            managerNameParagraph.setIndentationLeft(40);
            managerNameParagraph.setLeading(25f);
            document.add(managerNameParagraph);
            Paragraph managerIdParagraph = new Paragraph("Manager ID: " + manager.getEmpid(), lineFont);
            managerIdParagraph.setIndentationLeft(40);
            managerIdParagraph.setLeading(25f);
            document.add(managerIdParagraph);

            // Khoảng cách giữa các phần
            document.add(new Chunk(line));

            // 2. Employee Information
            Paragraph employeeInfo = new Paragraph("2. Employee Information", sectionFont);
            employeeInfo.setSpacingBefore(lineHeight);
            employeeInfo.setIndentationLeft(20);
            employeeInfo.setLeading(25f);
            document.add(employeeInfo);

            // Thông tin nhân viên
            Paragraph empNameParagraph = new Paragraph("Full Name of Employee: " + reward.getEmpName(), lineFont);
            empNameParagraph.setIndentationLeft(40);
            empNameParagraph.setLeading(25f);
            document.add(empNameParagraph);

            Paragraph empIdParagraph = new Paragraph("Employee ID: " + reward.getEmpId(), lineFont);
            empIdParagraph.setIndentationLeft(40);
            empIdParagraph.setLeading(25f);
            document.add(empIdParagraph);

            Paragraph deptNameParagraph = new Paragraph("Department: " + reward.getDeptName(), lineFont);
            deptNameParagraph.setIndentationLeft(40);
            deptNameParagraph.setLeading(25f);
            document.add(deptNameParagraph);

            document.add(new Chunk(line));

            // 3. Details
            Paragraph details = new Paragraph("3. Details", sectionFont);
            details.setSpacingBefore(lineHeight);
            details.setIndentationLeft(20);
            details.setLeading(25f);
            document.add(details);

            // Tạo danh sách có dấu chấm tròn
            com.itextpdf.text.List list = new com.itextpdf.text.List(com.itextpdf.text.List.UNORDERED);
            list.setIndentationLeft(40);  // Thụt lề danh sách
            list.setListSymbol("\u2022    "); // Dấu chấm tròn (Unicode bullet)
            list.add(new ListItem("Type of Reward: " + reward.getReward().getRewardtype(), lineFont));
            list.add(new ListItem("Reason: " + reward.getReward().getTitle(), lineFont));
            list.add(new ListItem("Detail: " + reward.getReward().getDescription(), lineFont));
            list.add(new ListItem("Reward Amount: " + reward.getReward().getTotal() + " " + reward.getReward().getUnit(), lineFont));
            document.add(list);

            document.add(new Chunk(line));

            // 4. Additional Notes
            Paragraph notes = new Paragraph("4. Additional Notes", sectionFont);
            notes.setSpacingBefore(lineHeight);
            notes.setIndentationLeft(20);
            notes.setLeading(25f);
            document.add(notes);

            Paragraph noteParagraph = new Paragraph(reward.getReward().getNote(), lineFont);
            noteParagraph.setIndentationLeft(40);
            noteParagraph.setLeading(25f);
            document.add(noteParagraph);

            document.add(new Chunk(line));

            // 5. Authorization and Confirmation
            Paragraph authorization = new Paragraph("5. Authorization and Confirmation", sectionFont);
            authorization.setSpacingBefore(lineHeight);
            authorization.setIndentationLeft(20);
            authorization.setLeading(25f);
            document.add(authorization);

            Paragraph createdByParagraph = new Paragraph("Created By (Manager): " + manager.getName(), lineFont);
            createdByParagraph.setIndentationLeft(40);
            createdByParagraph.setLeading(25f);
            document.add(createdByParagraph);

            SimpleDateFormat sdf = new SimpleDateFormat("dd/MM/yyyy");
            String formattedDate = sdf.format(reward.getDateAwarded());

            Paragraph submissionDateParagraph = new Paragraph("Date of Submission: " + formattedDate, lineFont);
            submissionDateParagraph.setIndentationLeft(40);
            submissionDateParagraph.setLeading(25f);
            document.add(submissionDateParagraph);

            Paragraph signatureParagraph = new Paragraph("Signature: ______________________", lineFont);
            signatureParagraph.setIndentationLeft(40);
            signatureParagraph.setLeading(25f);
            document.add(signatureParagraph);

            document.close();


            String filename = URLEncoder.encode(reward.getEmpName().replaceAll("\\s+", "-") + "_" +
                    reward.getReward().getTitle().replaceAll("\\s+", "-") + ".pdf", StandardCharsets.UTF_8);

            HttpHeaders headers = new HttpHeaders();
            headers.add(HttpHeaders.CONTENT_DISPOSITION, "attachment; filename=\"" + filename + "\"");
            headers.add(HttpHeaders.CONTENT_TYPE, "application/pdf");

            return new ResponseEntity<>(byteArrayOutputStream.toByteArray(), headers, HttpStatus.OK);

        } catch (Exception e) {
            return new ResponseEntity<>(null, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

}
