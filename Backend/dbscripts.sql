-- Database: empmanagement

-- DROP DATABASE IF EXISTS empmanagement;

-- CREATE DATABASE empmanagement;

CREATE TABLE Emp (
	EmpID text primary key,
	PermanentAddress text,
	TempAddress text,
	PersonalEmail text[],
	PhoneNum text[],
	EmergencyNum text[],
	BankAccountNo text[],
	Gender text,
	Birth date,
	Nationality text,
	Position text,
	JobType text,
	StartDate date,
	QRUrl text,
	AvatarUrl text,
	CreateDate date,
	LastUpdate date,

	DeptNo int
);

CREATE TABLE Dept (
	DeptNo serial primary key,
	Description text,
	EmpNum int,
	CreateDate date,
	LastUpdate date,

	ManagerID text
);
ALTER TABLE Dept
ADD CONSTRAINT fk_dept_emp
FOREIGN KEY (ManagerID) REFERENCES Emp (EmpID);

ALTER TABLE Emp
ADD CONSTRAINT fk_emp_dept
FOREIGN KEY (DeptNo) REFERENCES Dept (DeptNo);

CREATE TABLE LeaveTypes (
	id serial primary key,
	EmpID text,
	Year int,
	Annual int,
	Marriage int,
	Funeral int,
	Sick int,
	Unpaid int
);

ALTER TABLE LeaveTypes
ADD CONSTRAINT fk_leavetypes
FOREIGN KEY (EmpID) REFERENCES Emp (EmpID);

CREATE TABLE Account (
	EmpID text primary key,
	Username text,
	Password text,
	Role text,
	CreateDate date,
	LastUpdate date,
	IsActive boolean
);
ALTER TABLE Account
ADD CONSTRAINT fk_account
FOREIGN KEY (EmpID) REFERENCES Emp (EmpID);

CREATE TABLE Request (
	RequestID serial primary key,
	CreateDate date,
	ApprovalStatus text,
	Notes text,
	AttachmentUrl text[],

	EmpID text,
	ManagerID text
);
ALTER TABLE Request
ADD CONSTRAINT fk_request_emp
FOREIGN KEY (EmpID) REFERENCES Emp (EmpID);
ALTER TABLE Request
ADD CONSTRAINT fk_request_manager
FOREIGN KEY (ManagerID) REFERENCES Emp (EmpID);


CREATE TABLE WFHRequest (
	RequestID serial primary key,
	CreateDate date,
	ApprovalStatus text,
	Notes text,
	AttachmentUrl text[],
	StartDate date,
	EndDate date,
	Reason text,

	EmpID text,
	ManagerID text
);
ALTER TABLE WFHRequest
ADD CONSTRAINT fk_request_emp
FOREIGN KEY (EmpID) REFERENCES Emp (EmpID);
ALTER TABLE WFHRequest
ADD CONSTRAINT fk_request_manager
FOREIGN KEY (ManagerID) REFERENCES Emp (EmpID);

CREATE TABLE LeaveRequest (
	RequestID serial primary key,
	CreateDate date,
	ApprovalStatus text,
	Notes text,
	AttachmentUrl text[],
	StartDate date,
	EndDate date,
	Reason text,
	LeaveType text,

	EmpID text,
	ManagerID text
);
ALTER TABLE LeaveRequest
ADD CONSTRAINT fk_request_emp
FOREIGN KEY (EmpID) REFERENCES Emp (EmpID);
ALTER TABLE LeaveRequest
ADD CONSTRAINT fk_request_manager
FOREIGN KEY (ManagerID) REFERENCES Emp (EmpID);

CREATE TABLE HalfDayLeaveRequest (
	RequestID serial primary key,
	CreateDate date,
	ApprovalStatus text,
	Notes text,
	AttachmentUrl text[],
	StartDate date,
	EndDate date,
	Reason text,
	LeaveType text,
	StartHour time,
	EndHour time,

	EmpID text,
	ManagerID text
);
ALTER TABLE HalfDayLeaveRequest
ADD CONSTRAINT fk_request_emp
FOREIGN KEY (EmpID) REFERENCES Emp (EmpID);
ALTER TABLE HalfDayLeaveRequest
ADD CONSTRAINT fk_request_manager
FOREIGN KEY (ManagerID) REFERENCES Emp (EmpID);


CREATE TABLE AttendanceRecords (
	RecordID serial primary key,
	AttendanceDate date,
	CheckInTime time,
	CheckOutTime time,
	Status text,
	EmpID text
);

ALTER TABLE AttendanceRecords
ADD CONSTRAINT fk_record
FOREIGN KEY (EmpID) REFERENCES Emp (EmpID);


CREATE TABLE TimeAttendanceUpdateRequest (
	RequestID serial primary key,
	CreateDate date,
	ApprovalStatus text,
	Notes text,
	AttachmentUrl text[],
	RecordID int,

	EmpID text,
	ManagerID text
);
ALTER TABLE TimeAttendanceUpdateRequest
ADD CONSTRAINT fk_request_emp
FOREIGN KEY (EmpID) REFERENCES Emp (EmpID);
ALTER TABLE TimeAttendanceUpdateRequest
ADD CONSTRAINT fk_request_manager
FOREIGN KEY (ManagerID) REFERENCES Emp (EmpID);
ALTER TABLE TimeAttendanceUpdateRequest
ADD CONSTRAINT fk_request_record
FOREIGN KEY (RecordID) REFERENCES AttendanceRecords (RecordID);

CREATE TABLE Activity (
	ActivityID serial primary key,
	Name text,
	StartDate date,
	EndDate date,
	Location text,
	Images text[],
	Description text,
	Rules text,
	Criteria text,
	Reward text,
	ParticipantsNum int,
	CreateDate date,
	LastUpdate date
);

CREATE TABLE ActivityApproval (
	ID serial primary key,
	CreateDate date,
	ApprovalStatus text,
	ActivityID int,
	EmpID text,
	ManagerID text
);
ALTER TABLE ActivityApproval
ADD CONSTRAINT fk_aa_activity
FOREIGN KEY (ActivityID) REFERENCES Activity (ActivityID);
ALTER TABLE ActivityApproval
ADD CONSTRAINT fk_aa_emp
FOREIGN KEY (EmpID) REFERENCES Emp (EmpID);
ALTER TABLE ActivityApproval
ADD CONSTRAINT fk_aa_manager
FOREIGN KEY (EmpID) REFERENCES Emp (EmpID);

CREATE TABLE Participations (
	ID serial primary key,
	EmpID text,
	ActivityID int,
	Score int,
	Rank int,
	Notes text
);


ALTER TABLE Participations
ADD CONSTRAINT fk_participation_emp
FOREIGN KEY (EmpID) REFERENCES Emp (EmpID);
ALTER TABLE Participations
ADD CONSTRAINT fk_participation_activity
FOREIGN KEY (ActivityID) REFERENCES Activity (ActivityID);


CREATE TABLE RewardPoint (
	EmpID text primary key,
	TotalPoint int,
	LastUpdate date
);
ALTER TABLE RewardPoint
ADD CONSTRAINT fk_reward
FOREIGN KEY (EmpID) REFERENCES Emp (EmpID);

CREATE TABLE Reward (
	RewardID serial primary key,
	CreateDate date,
	Description text,
	RewardType text,
	Total int
);

CREATE TABLE RewardDetail (
	ID serial primary key,
	RewardID int,
	EmpID text,
	Point int
);

ALTER TABLE RewardDetail
ADD CONSTRAINT fk_detail_emp
FOREIGN KEY (EmpID) REFERENCES Emp (EmpID);
ALTER TABLE RewardDetail
ADD CONSTRAINT fk_detail_reward
FOREIGN KEY (RewardID) REFERENCES Reward (RewardID);



-- Insert
-- Dept
INSERT INTO Dept (Description, EmpNum, CreateDate, LastUpdate, ManagerID) VALUES
('Human Resources', 10, '2024-01-01', '2024-10-01', NULL),
('IT Department', 15, '2024-01-02', '2024-10-02', NULL);

-- Emp
INSERT INTO Emp (EmpID, PermanentAddress, TempAddress, PersonalEmail, PhoneNum, EmergencyNum, BankAccountNo, Gender, Birth, Nationality, Position, JobType, StartDate, QRUrl, AvatarUrl, CreateDate, LastUpdate, DeptNo) VALUES
('E001', '123 Main St, City A', '456 Second St, City B', ARRAY['e001@example.com'], ARRAY['0123456789'], ARRAY['0987654321'], ARRAY['123456789'], 'Male', '1990-01-15', 'American', 'HR Manager', 'Full-time', '2022-05-01', 'http://qr.url/e001', 'http://avatar.url/e001', '2024-01-01', '2024-10-01', 1),
('E002', '789 Third St, City A', '321 Fourth St, City B', ARRAY['e002@example.com'], ARRAY['0123456780'], ARRAY['0987654320'], ARRAY['987654321'], 'Female', '1995-05-20', 'Canadian', 'Software Engineer Manager', 'Full-time', '2022-06-01', 'http://qr.url/e002', 'http://avatar.url/e002', '2024-01-01', '2024-10-01', 2),
('E003', '654 Fifth St, City A', '987 Sixth St, City B', ARRAY['e003@example.com'], ARRAY['0123456790'], ARRAY['0987654310'], ARRAY['456789123'], 'Male', '1985-10-30', 'British', 'Sortware Engineer', 'Part-time', '2022-07-01', 'http://qr.url/e003', 'http://avatar.url/e003', '2024-01-01', '2024-10-01', 2),
('E004', '123 Main St, City A', '456 Second St, City B', ARRAY['e001@example.com'], ARRAY['0123456789'], ARRAY['0987654321'], ARRAY['123456789'], 'Male', '1990-01-15', 'American', 'Sortware Engineer', 'Full-time', '2022-05-01', 'http://qr.url/e001', 'http://avatar.url/e001', '2024-01-01', '2024-10-01', 2),
('E005', '789 Third St, City A', '321 Fourth St, City B', ARRAY['e002@example.com'], ARRAY['0123456780'], ARRAY['0987654320'], ARRAY['987654321'], 'Female', '1995-05-20', 'Canadian', 'Software Engineer', 'Full-time', '2022-06-01', 'http://qr.url/e002', 'http://avatar.url/e002', '2024-01-01', '2024-10-01', 2),
('E006', '654 Fifth St, City A', '987 Sixth St, City B', ARRAY['e003@example.com'], ARRAY['0123456790'], ARRAY['0987654310'], ARRAY['456789123'], 'Male', '1985-10-30', 'British', 'Sortware Engineer', 'Part-time', '2022-07-01', 'http://qr.url/e003', 'http://avatar.url/e003', '2024-01-01', '2024-10-01', 1);

UPDATE Dept
SET ManagerID = 'E001'
WHERE DeptNo = 1;
UPDATE Dept
SET ManagerID = 'E002'
WHERE DeptNo = 2;

-- LeaveTypes
INSERT INTO LeaveTypes (EmpID, Year, Annual, Marriage, Funeral, Sick, Unpaid) VALUES
('E001', 2023, 10, 0, 0, 5, 2),
('E001', 2024, 10, 0, 0, 5, 2),
('E002', 2024, 12, 1, 0, 3, 1),
('E003', 2024, 8, 0, 1, 4, 0),
('E004', 2024, 10, 0, 0, 5, 2),
('E005', 2024, 12, 1, 0, 3, 1),
('E006', 2024, 8, 0, 1, 4, 0);

-- Account
-- INSERT INTO Account (EmpID, Username, Password, Role, CreateDate, LastUpdate, IsActive) VALUES
-- ('E001', 'e001', 'password1', 'Manager', '2024-01-01', '2024-10-01', TRUE),
-- ('E002', 'e002', 'password2', 'Employee', '2024-01-01', '2024-10-01', TRUE),
-- ('E003', 'e003', 'password3', 'Employee', '2024-01-01', '2024-10-01', TRUE);

-- Request
INSERT INTO Request (CreateDate, ApprovalStatus, Notes, AttachmentUrl, EmpID, ManagerID) VALUES
('2024-10-01', 'Pending', 'Need approval for leave', ARRAY['http://attachment.url/request1'], 'E003', 'E002'),
('2024-10-02', 'Approved', 'Leave granted', ARRAY['http://attachment.url/request2'], 'E006', 'E001');

-- WFHRequest
INSERT INTO WFHRequest (CreateDate, ApprovalStatus, Notes, AttachmentUrl, StartDate, EndDate, Reason, EmpID, ManagerID) VALUES
('2024-10-05', 'Approved', 'Work from home request', ARRAY['http://attachment.url/wfhrequest1'], '2024-10-10', '2024-10-12', 'Personal reasons', 'E004', 'E002'),
('2024-10-06', 'Pending', 'Need to work from home', ARRAY['http://attachment.url/wfhrequest2'], '2024-10-15', '2024-10-17', 'Family matters', 'E003', 'E002');

-- LeaveRequest
INSERT INTO LeaveRequest (CreateDate, ApprovalStatus, Notes, AttachmentUrl, StartDate, EndDate, Reason, LeaveType, EmpID, ManagerID) VALUES
('2024-10-03', 'Pending', 'Annual leave request', ARRAY['http://attachment.url/leaverequest1'], '2024-10-10', '2024-10-15', 'Vacation', 'Annual', 'E003', 'E002'),
('2024-10-04', 'Approved', 'Sick leave request', ARRAY['http://attachment.url/leaverequest2'], '2024-10-06', '2024-10-07', 'Illness', 'Sick', 'E005', 'E002');

-- AttendanceRecords
INSERT INTO AttendanceRecords (AttendanceDate, CheckInTime, CheckOutTime, Status, EmpID) VALUES
('2024-10-28', '09:00:00', '17:00:00', 'Present', 'E002'),
('2024-10-28', '09:30:00', '17:30:00', 'Present', 'E002'),
('2024-10-28', '09:15:00', '17:15:00', 'Present', 'E003'),
('2024-10-28', '09:00:00', '17:00:00', 'Present', 'E004'),
('2024-10-28', '09:30:00', '17:30:00', 'Present', 'E005'),
('2024-10-28', '09:15:00', '17:15:00', 'Present', 'E006');

INSERT INTO TimeAttendanceUpdateRequest (CreateDate, ApprovalStatus, Notes, AttachmentUrl, RecordID, EmpID, ManagerID) VALUES 
('2024-10-30', 'Pending', 'Request for attendance update.', ARRAY['https://example.com/attachment1.jpg'], 3, 'E003', 'E002');


-- Activity
INSERT INTO Activity (Name, StartDate, EndDate, Location, Images, Description, Rules, Criteria, Reward, ParticipantsNum, CreateDate, LastUpdate) VALUES
('Team Building', '2024-11-01', '2024-11-02', 'Beach Resort', ARRAY['http://image.url/activity1'], 'A fun team building event', 'Follow the rules', 'Team spirit', '10pt', 30, '2024-10-01', '2024-10-01'),
('Hackathon', '2024-11-15', '2024-11-16', 'Tech Center', ARRAY['http://image.url/activity2'], 'A competitive coding event', 'Code cleanly', 'Best solution', '20pt', 50, '2024-10-02', '2024-10-02');

-- ActivityApproval
INSERT INTO ActivityApproval (CreateDate, ApprovalStatus, ActivityID, EmpID, ManagerID) VALUES
('2024-10-05', 'Approved', 1, 'E003', 'E002'),
('2024-10-06', 'Pending', 2, 'E006', 'E001');

-- Participations
INSERT INTO Participations (EmpID, ActivityID, Score, Rank, Notes) VALUES
('E001', 1, 85, 1, 'Great performance'),
('E002', 1, 90, 1, 'Excellent teamwork'),
('E003', 2, 75, 2, 'Good effort');

-- RewardPoint
INSERT INTO RewardPoint (EmpID, TotalPoint, LastUpdate) VALUES
('E001', 100, '2024-10-01'),
('E002', 150, '2024-10-01'),
('E003', 80, '2024-10-01'),
('E004', 100, '2024-10-01'),
('E005', 150, '2024-10-01'),
('E006', 80, '2024-10-01');

-- Reward
INSERT INTO Reward (CreateDate, Description, RewardType, Total) VALUES
('2024-10-10', 'Gift Voucher', 'Gift', 10),
('2024-10-11', 'Extra Leave', 'Leave', 5);

-- RewardDetail
INSERT INTO RewardDetail (RewardID, EmpID, Point) VALUES
(1, 'E001', 20),
(1, 'E002', 30),
(2, 'E003', 15),
(1, 'E004', 20),
(1, 'E005', 30),
(2, 'E006', 15);
