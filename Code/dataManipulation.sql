-- Manipulating data section

-- add
select * from employees; -- before
alter table employees add address VARCHAR(45);
select * from employees; -- after
-- drop
select * from employees; -- before
alter table employees drop address;
select * from employees; -- after
-- change type
select * from employees; -- before
alter table employees modify age float;
insert into employees(ID,FName,LName,email,phonenum,worknum,gender,age,department_ID,Supervisor_ID) values
	(15, 'Theresa', 'Gundel', 'tgund@cms.com', 0000000000, 0000000001, 'F', 23.5, 0, 0);
select * from employees; -- after
delete from employees where ID = 15;
-- rename
select * from employees; -- before
alter table employees rename column phoneNum to phoneNumber;
select * from employees; -- after
-- change order of 5 columns
select * from employees; -- before
alter table employees modify Fname VARCHAR(45) after Lname;
alter table employees modify phoneNumber VARCHAR(12) after Lname;
alter table employees modify gender CHAR(1) after ID;
alter table employees modify age int after phoneNumber;
alter table employees modify WorkNum VARCHAR(12) after Fname;
select * from employees; -- after
-- Updating numerical value of only one record using where clause
select * from emplyees; -- before
update employees set age = 25 where id = 0;
select * from employees; -- after
-- Updating string values of several records using where clause
select * from employees; -- before
update employees set workNum = '1234567890' where age > 50;
select * from employees; -- after
-- Using pattern matching to find specific existing records and update their values
select * from employees; -- before
update employees set workNum = '0987654321' where Fname like 'A%';
update employees set phoneNumber = '0001112222' where email like '_s%@cms.com';
select * from employees; -- after