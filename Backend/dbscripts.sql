-- Database: empmanagement

-- DROP DATABASE IF EXISTS empmanagement;

-- CREATE DATABASE empmanagement;

CREATE TABLE Emp (
	EmpID text primary key,
	Name text,
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
	Role text[],
	CreateDate date,
	LastUpdate date,
	IsActive boolean,
	LastLogin date
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

CREATE TABLE RecognitionUpdateRequest (
	RequestID serial primary key,
	CreateDate date,
	ApprovalStatus text,
	Notes text,
	AttachmentUrl text[],
	Reason text,
	DeclineReason text,

	EmpID text,
	ManagerID text
);
ALTER TABLE RecognitionUpdateRequest
ADD CONSTRAINT fk_request_emp
FOREIGN KEY (EmpID) REFERENCES Emp (EmpID);
ALTER TABLE RecognitionUpdateRequest
ADD CONSTRAINT fk_request_manager
FOREIGN KEY (ManagerID) REFERENCES Emp (EmpID);

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
	LastUpdate date,
	ManagerID text,
	TargetParticipants text
);
ALTER TABLE Activity
ADD CONSTRAINT fk_a_manager
FOREIGN KEY (ManagerID) REFERENCES Emp (EmpID);

CREATE TABLE ActivityApproval (
	ID serial primary key,
	CreateDate date,
	ApprovalStatus text,
	ActivityID int,
	EmpID text
	-- ManagerID text
);

ALTER TABLE ActivityApproval
ADD CONSTRAINT fk_aa_activity
FOREIGN KEY (ActivityID) REFERENCES Activity (ActivityID);
ALTER TABLE ActivityApproval
ADD CONSTRAINT fk_aa_emp
FOREIGN KEY (EmpID) REFERENCES Emp (EmpID);
-- ALTER TABLE ActivityApproval
-- ADD CONSTRAINT fk_aa_manager
-- FOREIGN KEY (EmpID) REFERENCES Emp (EmpID);

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
	Title text,
	Description text,
	RewardType text,
	Total int,
	Unit text,
	Note text
);

CREATE TABLE RewardDetail (
	ID serial primary key,
	RewardID int,
	EmpID text,
	DateAwarded date
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
INSERT INTO Emp (EmpID, Name, PermanentAddress, TempAddress, PersonalEmail, PhoneNum, EmergencyNum, BankAccountNo, Gender, Birth, Nationality, Position, JobType, StartDate, QRUrl, AvatarUrl, CreateDate, LastUpdate, DeptNo) VALUES
('E001', 'John', '123 Main St, County of Los Angeles, State of California, City of Los Angeles', '456 Second St, City B', ARRAY['e001@example.com', 'e011@example.com'], ARRAY['0123456789'], ARRAY['0987654321'], ARRAY['123456789'], 'Male', '1990-01-15', 'American', 'HR Manager', 'Full-time', '2022-05-01', 'http://qr.url/e001', 'uploads/avatar/2.png', '2024-01-01', '2024-10-01', 1),
('E002', 'Hannah', '456 Elm St, County of New York, State of New York, City of New York', '321 Fourth St, City B', ARRAY['e002@example.com', 'e012@example.com'], ARRAY['0123456780'], ARRAY['0987654320'], ARRAY['987654321'], 'Female', '1995-05-20', 'American', 'Software Engineer Manager', 'Full-time', '2022-06-01', 'http://qr.url/e002', 'uploads/avatar/1.png', '2024-01-01', '2024-10-01', 2),
('E003', 'Tim', '789 Oak St, County of Cook, State of Illinois, City of Chicago', '987 Sixth St, City B', ARRAY['e003@example.com'], ARRAY['0123456790'], ARRAY['0987654310'], ARRAY['456789123'], 'Male', '1985-10-30', 'British', 'Sortware Engineer', 'Part-time', '2022-07-01', 'http://qr.url/e003', 'uploads/avatar/6.png', '2024-01-01', '2024-10-01', 2),
('E004', 'Ben', '202 Maple St, County of Miami-Dade, State of Florida, City of Miami', '456 Second St, City B', ARRAY['e001@example.com'], ARRAY['0123456789'], ARRAY['0987654321'], ARRAY['123456789'], 'Male', '1990-01-15', 'American', 'Sortware Engineer', 'Full-time', '2022-05-01', 'http://qr.url/e001', 'uploads/avatar/7.png', '2024-01-01', '2024-10-01', 2),
('E005', 'Marry', '101 Pine St, County of Harris, State of Texas, City of Houston', '321 Fourth St, City B', ARRAY['e002@example.com'], ARRAY['0123456780'], ARRAY['0987654320'], ARRAY['987654321'], 'Female', '1995-05-20', 'Canadian', 'Software Engineer', 'Full-time', '2022-06-01', 'http://qr.url/e002', 'uploads/avatar/4.png', '2024-01-01', '2024-10-01', 2),
('E006', 'Josh', '303 Birch St, County of Dallas, State of Texas, City of Dallas', '987 Sixth St, City B', ARRAY['e003@example.com'], ARRAY['0123456790'], ARRAY['0987654310'], ARRAY['456789123'], 'Male', '1985-10-30', 'British', 'Sortware Engineer', 'Part-time', '2022-07-01', 'http://qr.url/e003', 'uploads/avatar/8.png', '2024-01-01', '2024-10-01', 1),
('E007', 'Anne', '404 Cedar St, County of Maricopa, State of Arizona, City of Phoenix', '321 Fourth St, City B', ARRAY['e002@example.com'], ARRAY['0123456780'], ARRAY['0987654320'], ARRAY['987654321'], 'Female', '1995-05-20', 'Canadian', 'Software Engineer', 'Full-time', '2022-06-01', 'http://qr.url/e002', 'uploads/avatar/5.png', '2024-01-01', '2024-10-01', 2),
('E008', 'Jessy', '505 Walnut St, County of King, State of Washington, City of Seattle', '987 Sixth St, City B', ARRAY['e003@example.com'], ARRAY['0123456790'], ARRAY['0987654310'], ARRAY['456789123'], 'Female', '1985-10-30', 'British', 'Sortware Engineer', 'Part-time', '2022-07-01', 'http://qr.url/e003', 'uploads/avatar/3.png', '2024-01-01', '2024-10-01', 1);

UPDATE Dept
SET ManagerID = 'E001'
WHERE DeptNo = 1;
UPDATE Dept
SET ManagerID = 'E002'
WHERE DeptNo = 2;

-- LeaveTypes
INSERT INTO LeaveTypes (EmpID, Year, Annual, Marriage, Funeral, Sick, Unpaid) VALUES
('E001', 2023, 10, 0, 0, 5, 2),
('E001', 2025, 10, 0, 0, 5, 2),
('E002', 2025, 12, 1, 0, 3, 1),
('E003', 2025, 8, 0, 1, 4, 0),
('E004', 2025, 10, 0, 0, 5, 2),
('E005', 2025, 12, 1, 0, 3, 1),
('E006', 2025, 8, 0, 1, 4, 0);

-- Account
-- INSERT INTO Account (EmpID, Username, Password, Role, CreateDate, LastUpdate, IsActive) VALUES
-- ('E001', 'e001', 'password1', 'Manager', '2024-01-01', '2024-10-01', TRUE),
-- ('E002', 'e002', 'password2', 'Employee', '2024-01-01', '2024-10-01', TRUE),
-- ('E003', 'e003', 'password3', 'Employee', '2024-01-01', '2024-10-01', TRUE);

-- Request
INSERT INTO Request (CreateDate, ApprovalStatus, Notes, AttachmentUrl, EmpID, ManagerID) VALUES
('2025-01-01', 'Pending', 'Need approval for leave', ARRAY['uploads/requests/OtherRequest1.txt', 'uploads/requests/OtherRequest2.txt'], 'E003', 'E002');

-- WFHRequest
INSERT INTO WFHRequest (CreateDate, ApprovalStatus, Notes, AttachmentUrl, StartDate, EndDate, Reason, EmpID, ManagerID) VALUES
('2025-01-01', 'Approved', 'Work from home request', ARRAY['uploads/requests/WFHRequest1.txt'], '2025-10-10', '2025-10-12', 'Personal reasons', 'E004', 'E002'),
('2025-01-01', 'Pending', 'Need to work from home', ARRAY['uploads/requests/WFHRequest2.txt'], '2025-10-15', '2025-10-17', 'Family matters', 'E003', 'E002');

-- LeaveRequest
INSERT INTO LeaveRequest (CreateDate, ApprovalStatus, Notes, AttachmentUrl, StartDate, EndDate, Reason, LeaveType, EmpID, ManagerID) VALUES
('2025-01-01', 'Pending', 'Annual leave request', ARRAY['uploads/requests/LeaveRequest1.txt'], '2025-10-10', '2025-10-15', 'Vacation', 'Annual', 'E005', 'E002'),
('2025-01-01', 'Approved', 'Sick leave request', ARRAY['uploads/requests/LeaveRequest2.txt'], '2025-10-06', '2025-10-07', 'Illness', 'Sick', 'E007', 'E002');

-- AttendanceRecords
INSERT INTO AttendanceRecords (AttendanceDate, CheckInTime, CheckOutTime, Status, EmpID) VALUES
('2024-10-28', '09:00:00', '17:00:00', 'Present', 'E001'),
('2024-10-28', '09:30:00', '17:30:00', 'Present', 'E002'),
('2024-10-28', '09:15:00', '17:15:00', 'Present', 'E003'),
('2024-10-28', '09:00:00', '17:00:00', 'Present', 'E004'),
('2024-10-28', '09:30:00', '17:30:00', 'Present', 'E005'),
('2024-10-28', '09:15:00', '17:15:00', 'Present', 'E006'),

('2025-01-01', NULL, NULL, 'Absent', 'E003'),
('2025-01-02', '09:30:00', '17:30:00', 'Present', 'E003'),
('2025-01-03', '09:15:00', '17:15:00', 'Present', 'E003'),
('2025-01-04', '09:15:00', NULL, 'Present', 'E003'),

('2025-01-01', NULL, NULL, 'Absent', 'E001'),
('2025-01-02', '09:30:00', '17:30:00', 'Present', 'E001'),
('2025-01-03', '09:15:00', '17:15:00', 'Present', 'E001'),
('2025-01-04', '09:15:00', NULL, 'Present', 'E001'),

('2025-01-01', '09:30:00', '17:30:00', 'Present', 'E001'),
('2025-01-02', '09:30:00', '17:30:00', 'Present', 'E002'),
('2025-01-03', '09:15:00', '17:15:00', 'Present', 'E002'),
('2025-01-04', '09:15:00', NULL, 'Present', 'E002');


-- RecognitionUpdateRequest
INSERT INTO RecognitionUpdateRequest (CreateDate, ApprovalStatus, Notes, AttachmentUrl, Reason, DeclineReason, EmpID, ManagerID) VALUES 
('2025-01-01', 'Pending', 'Request for update', ARRAY['uploads/requests/OtherRequest1.txt', 'uploads/requests/OtherRequest2.txt'], 'Performance recognition', NULL, 'E003', 'E002'),
('2025-01-01', 'Approved', 'Approved for recognition update', ARRAY['uploads/requests/OtherRequest1.txt', 'uploads/requests/OtherRequest2.txt'], 'Outstanding performance', NULL, 'E004', 'E002'),
('2025-01-01', 'Declined', 'Insufficient details provided', ARRAY['uploads/requests/OtherRequest1.txt', 'uploads/requests/OtherRequest2.txt'], 'Recognition request denied', 'Details were insufficient', 'E005', 'E002'),
('2025-01-01', 'Pending', 'Awaiting manager review', ARRAY['uploads/requests/OtherRequest1.txt', 'uploads/requests/OtherRequest2.txt'], 'Project milestone achieved', NULL, 'E006', 'E001'),
('2025-01-01', 'Approved', 'Recognition request approved', ARRAY['uploads/requests/OtherRequest1.txt', 'uploads/requests/OtherRequest2.txt'], 'Exceptional leadership', NULL, 'E008', 'E001');


INSERT INTO TimeAttendanceUpdateRequest (CreateDate, ApprovalStatus, Notes, AttachmentUrl, RecordID, EmpID, ManagerID) VALUES 
('2025-01-01', 'Pending', 'Request for attendance update.', ARRAY['uploads/requests/TAURequest1.txt', 'uploads/requests/TAURequest2.txt'], 3, 'E003', 'E002');


-- Activity
INSERT INTO Activity (Name, StartDate, EndDate, Location, Images, Description, Rules, Criteria, Reward, ParticipantsNum, CreateDate, LastUpdate, ManagerID, TargetParticipants) VALUES
('Basketball Competition', '2024-11-01', '2025-11-02', 'Beach Resort', ARRAY['uploads/activities/basketball.png'], 
 'A fun team building event. A chance to improve team dynamics.', 
 'Follow the rules / Show sportsmanship / Support your teammates', 
 'Team spirit / Best player / Most improved player', 
 '10pt / 5pt for MVP', 3, '2024-10-01', '2024-10-01', 'E001', 'All Employees'),

('Ping Pong Competition', '2024-11-15', '2024-11-16', 'Tech Center', ARRAY['uploads/activities/ping.png'], 
 'A competitive event. Show your skills and compete for the top spot.', 
 'Follow the rules / Respect opponents', 
 'Best solution / Fastest response', 
 '20pt / 10pt for runners-up', 0, '2024-10-02', '2024-10-02', 'E001', 'All Employees'),

('Football', '2024-11-01', '2025-11-02', 'Beach Resort', ARRAY['uploads/activities/football.png', 'uploads/activities/football2.png'], 
 'A fun team building event. Get ready for an exciting match.', 
 'Follow the rules / Play fair / Encourage your teammates', 
 'Team spirit / Best goal scorer / Best defender', 
 '10pt / 5pt for MVP', 0, '2024-10-01', '2024-10-01', 'E002', 'All Employees'),

('Team Building', '2024-11-15', '2025-11-16', 'Tech Center', ARRAY['uploads/activities/tennis.png', 'uploads/activities/volley.png'], 
 'A competitive coding event. Work with your team to solve the problems.', 
 'Code cleanly / Collaborate effectively / Meet deadlines', 
 'Best solution / Most creative approach', 
 '20pt / 10pt for second place', 0, '2024-10-02', '2024-10-02', 'E002', 'All Employees'),
 
 ('Football - Test', '2024-11-01', '2025-11-02', 'Beach Resort', ARRAY['uploads/activities/football.png', 'uploads/activities/football2.png'], 
 'A fun team building event. Get ready for an exciting match.', 
 'Follow the rules / Play fair / Encourage your teammates', 
 'Team spirit / Best goal scorer / Best defender', 
 '10pt / 5pt for MVP', 0, '2024-10-01', '2024-10-01', 'E002', 'All Employees'),

('Team Building - Test', '2024-11-15', '2025-11-16', 'Tech Center', ARRAY['uploads/activities/tennis.png', 'uploads/activities/volley.png'], 
 'A competitive coding event. Work with your team to solve the problems.', 
 'Code cleanly / Collaborate effectively / Meet deadlines', 
 'Best solution / Most creative approach', 
 '20pt / 10pt for second place', 0, '2024-10-02', '2024-10-02', 'E002', 'All Employees'),

 ('Basketball Competition 2023', '2023-11-01', '2023-11-02', 'Beach Resort', ARRAY['uploads/activities/basketball.png'], 
 'A fun team building event. A chance to improve team dynamics.', 
 'Follow the rules / Show sportsmanship / Support your teammates', 
 'Team spirit / Best player / Most improved player', 
 '10pt / 5pt for MVP', 5, '2023-10-01', '2023-10-01', 'E001', 'All Employees'),

 ('Basketball Competition 2022', '2022-11-01', '2022-11-02', 'Beach Resort', ARRAY['uploads/activities/basketball.png'], 
 'A fun team building event. A chance to improve team dynamics.', 
 'Follow the rules / Show sportsmanship / Support your teammates', 
 'Team spirit / Best player / Most improved player', 
 '10pt / 5pt for MVP', 5, '2022-10-01', '2022-10-01', 'E001', 'All Employees');

-- ActivityApproval
INSERT INTO ActivityApproval (CreateDate, ApprovalStatus, ActivityID, EmpID) VALUES
('2024-10-05', 'Approved', 1, 'E003'),
('2024-10-05', 'Approved', 1, 'E005'),
('2024-10-05', 'Approved', 1, 'E004'),
('2024-10-06', 'Pending', 2, 'E002'),
('2024-10-06', 'Approved', 2, 'E003'),
('2024-10-06', 'Pending', 2, 'E004'),
('2024-10-06', 'Pending', 3, 'E005'),
('2024-10-06', 'Pending', 3, 'E006'),
('2024-10-06', 'Pending', 3, 'E007'),
('2024-10-06', 'Pending', 4, 'E008'),
('2024-10-06', 'Pending', 4, 'E001'),
('2024-10-06', 'Pending', 4, 'E004'),
('2024-10-06', 'Approved', 7, 'E002'),
('2024-10-06', 'Approved', 7, 'E003'),
('2024-10-06', 'Approved', 7, 'E004'),
('2024-10-06', 'Approved', 7, 'E005'),
('2024-10-06', 'Approved', 7, 'E006'),
('2024-10-06', 'Approved', 8, 'E002'),
('2024-10-06', 'Approved', 8, 'E003'),
('2024-10-06', 'Approved', 8, 'E004'),
('2024-10-06', 'Approved', 8, 'E005'),
('2024-10-06', 'Approved', 8, 'E006');

-- Participations
INSERT INTO Participations (EmpID, ActivityID, Score, Rank, Notes) VALUES
('E001', 1, 85, 1, 'Great performance'),
('E002', 1, 90, 1, 'Excellent teamwork'),
('E003', 2, 75, 2, 'Good effort'),

('E002', 7, 85, 2, 'Great performance'),
('E003', 7, 70, 5, 'Excellent teamwork'),
('E004', 7, 75, 4, 'Good effort'),
('E005', 7, 80, 3, 'Great performance'),
('E006', 7, 100, 1, 'Excellent teamwork'),
('E002', 8, 60, 5, 'Great performance'),
('E003', 8, 90, 1, 'Excellent teamwork'),
('E004', 8, 75, 4, 'Good effort'),
('E005', 8, 85, 3, 'Great performance'),
('E006', 8, 90, 1, 'Excellent teamwork');

-- RewardPoint
INSERT INTO RewardPoint (EmpID, TotalPoint, LastUpdate) VALUES
('E001', 100, '2024-10-01'),
('E002', 150, '2024-10-01'),
('E003', 80, '2024-10-01'),
('E004', 100, '2024-10-01'),
('E005', 150, '2024-10-01'),
('E006', 80, '2024-10-01');

-- Reward
INSERT INTO Reward (CreateDate, Title, Description, RewardType, Total, Unit, Note) VALUES
('2024-10-10', 'Employee of Month', 'A 50% discount voucher for vending machine purchases awarded to the best employee of December 2024', 'Voucher', 1, 'Voucher', 'Reward given for outstanding performance in December 2024'),
('2024-10-11', 'Empoyee of year Extra Leave', '2 days leave for best employee of 2024', 'Paid leave', 2, 'Days', 'Annual recognition for exceptional contribution in 2024'),
('2024-10-11', 'Best football players', '100 points for the employees who achieved the highest score in the Football Competition 2024', 'Points', 100, 'Points', 'Acknowledgment of achievements in company sports event 2024');

-- RewardDetail
INSERT INTO RewardDetail (RewardID, EmpID, DateAwarded) VALUES
(1, 'E003', '2024-12-12'),
(2, 'E004', '2024-12-13'),
(3, 'E002', '2024-12-14'),
(3, 'E003', '2024-12-14'),
(3, 'E004', '2024-12-14'),
(3, 'E005', '2024-12-14'),
(1, 'E004', '2023-12-12');
