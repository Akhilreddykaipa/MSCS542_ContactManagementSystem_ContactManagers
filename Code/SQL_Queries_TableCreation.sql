CREATE DATABASE IF NOT EXISTS myCms;
USE myCms;

-- Creates Supervisor Table
CREATE TABLE Supervisor (
  ID INT NOT NULL PRIMARY KEY,
  UserID INT,
  DepartmentID INT
  );

-- Creates Department Table
CREATE TABLE Department (
  ID INT NOT NULL PRIMARY KEY,
  DName VARCHAR(45),
  Supervisor_ID INT NOT NULL,
  FOREIGN KEY (Supervisor_ID) REFERENCES Supervisor (ID)
   );

-- Creates Employees Table
 CREATE TABLE Employees (
  ID INT NOT NULL PRIMARY KEY,
  Fname VARCHAR(45),
  Lname VARCHAR(45),
  email VARCHAR(45),
  phoneNum VARCHAR(12),
  WorkNum VARCHAR(12),
  gender CHAR(1),
  age INT,
  Department_ID INT NOT NULL,
  Supervisor_ID INT NOT NULL,
 FOREIGN KEY (Department_ID) REFERENCES Department (ID),
 FOREIGN KEY (Supervisor_ID) REFERENCES Supervisor (ID)
 );

-- Creates User Table
CREATE TABLE users (
  userlogin INT NOT NULL PRIMARY KEY,
  userpassword VARCHAR(45) ,
  useremail VARCHAR(45) ,
  usertype VARCHAR(45) ,
  loginkey VARCHAR(45) ,
  Employees_ID INT NOT NULL,
    FOREIGN KEY (Employees_ID) REFERENCES Employees (ID)
    );

-- Creates Relationship Table
CREATE TABLE  Relationship (
  ID INT NOT NULL PRIMARY KEY,
  user1ID INT ,
  user2ID INT ,
  Rstatus VARCHAR(45) ,
  Rdate DATE
  );

-- Creates GroupMembers Table
  CREATE TABLE GroupMembers (
  ID INT NOT NULL PRIMARY KEY,
  GroupID INT ,
  UserID INT ,
  JoinDate DATE
  );

-- Creates GroupDetails Table
  CREATE TABLE GroupDetails (
  ID INT NOT NULL PRIMARY KEY ,
  LeaderID INT ,
  GroupName VARCHAR(45) ,
  CreatedDate DATE ,
  GroupMembers_ID INT NOT NULL,
   FOREIGN KEY (GroupMembers_ID) REFERENCES GroupMembers (ID)
   );

-- Creates Messages Table
CREATE TABLE Messages (
  ID INT NOT NULL PRIMARY KEY,
  senderID INT ,
  userID INT ,
  groupID INT ,
  Messagedate DATE
 );

-- Creates EmailHistory Table
 CREATE TABLE EmailHistory (
  ID INT NOT NULL PRIMARY KEY,
  SenderID INT ,
  Message LONGTEXT ,
  ReceiverID INT ,
  EmailDate DATE
  );

-- Creates Certified Table
CREATE TABLE Certified (
  ID INT NOT NULL PRIMARY KEY,
  UserID INT ,
  CertificationID INT ,
  Date DATE ,
  Employees_ID INT NOT NULL,
 FOREIGN KEY (Employees_ID) REFERENCES Employees (ID)
    );

-- Creates Certification Table
  CREATE TABLE Certification (
  ID INT NOT NULL PRIMARY KEY,
  Name VARCHAR(45) ,
  Type VARCHAR(45) ,
  Certified_ID INT NOT NULL,
  FOREIGN KEY (Certified_ID) REFERENCES Certified(ID)
   );

-- Creates Employees_has_Relationship Table
  CREATE TABLE Employees_has_Relationship (
  Employees_ID INT NOT NULL  ,
  Relationship_ID INT NOT NULL  ,
  PRIMARY KEY (Employees_ID, Relationship_ID),
    FOREIGN KEY (Employees_ID) REFERENCES Employees (ID),
    FOREIGN KEY (Relationship_ID) REFERENCES Relationship(ID)
   );

-- Creates Employees_has_Messages Table
   CREATE TABLE Employees_has_Messages (
  Employees_ID INT NOT NULL,
  Messages_ID INT NOT NULL,
  PRIMARY KEY (Employees_ID, Messages_ID),
   FOREIGN KEY (Employees_ID) REFERENCES Employees (ID),
    FOREIGN KEY (Messages_ID) REFERENCES Messages (ID)
    );

-- Creates Employees_has_Groups Table
  CREATE TABLE Employees_has_Groups (
  Employees_ID INT NOT NULL,
  Groups_ID INT NOT NULL,
  PRIMARY KEY (Employees_ID, Groups_ID),
   FOREIGN KEY (Employees_ID) REFERENCES Employees(ID),
    FOREIGN KEY (Groups_ID) REFERENCES GroupDetails(ID)
    );

-- Creates Employees_has_Email_History Table
  CREATE TABLE Employees_has_Email_History (
  Employees_ID INT NOT NULL,
  Email_History_ID INT NOT NULL,
  PRIMARY KEY (Employees_ID, Email_History_ID),
    FOREIGN KEY (Employees_ID) REFERENCES Employees(ID),
    FOREIGN KEY (Email_History_ID) REFERENCES EmailHistory (ID)
    );

  -- Creates Messages_has_Groups Table
  CREATE TABLE Messages_has_Groups (
  Messages_ID INT NOT NULL,
  Groups_ID INT NOT NULL,
  PRIMARY KEY (Messages_ID, Groups_ID),
   FOREIGN KEY (Messages_ID) REFERENCES Messages (ID),
    FOREIGN KEY (Groups_ID) REFERENCES GroupDetails (ID)
   );