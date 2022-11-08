import { Link } from "react-router-dom";
import { useEffect, useState } from 'react';
import $ from 'jquery';
import validate from 'jquery-validation';
import "../css/EditUser.css";
const utils = require('../utils/utils.js');

const EditUser = (props) => {
  const [users, setUsers] = useState([]);
  const [employees, setEmployees] = useState([]);
  const [firstRun, setFirstRun] = useState(true);

  useEffect(() => {
    if (firstRun) {
      window.dbConnection.getUsers().then((result) => {
        console.log(result);
        setUsers([...result]);
      });
      window.dbConnection.getEmployees().then((result) => {
        console.log(result);
        setEmployees([...result]);
        setFirstRun(false);
      });
    }
  });

  const cancelEmployeeEdit = (e) => {
    $("#employeeEditContainer").hide();
  }

  const submitEmployeeEdit = (e) => {
    console.log($("#employeeInsertValues .insert.ID input").val());
    window.dbConnection.setEmployeeData({
      ID: $("#employeeInsertValues .insert.ID input").val(),
      Fname: $("#employeeInsertValues .insert.Fname input").val(),
      Lname: $("#employeeInsertValues .insert.Lname input").val(),
      email: $("#employeeInsertValues .insert.email input").val(),
      phoneNum: $("#employeeInsertValues .insert.phoneNum input").val(),
      WorkNum: $("#employeeInsertValues .insert.WorkNum input").val(),
      gender: $("#employeeInsertValues .insert.gender input").val(),
      age: $("#employeeInsertValues .insert.age input").val(),
      Department_ID: $("#employeeInsertValues .insert.Department_ID input").val(),
      Supervisor_ID: $("#employeeInsertValues .insert.Supervisor_ID input").val()
    }).then((result) => {
      console.log(result);
      $("#employeeEditContainer .successMessage").addClass("active");
      setTimeout(() => {
        $("#employeeEditContainer .successMessage").removeClass("active");
        $("#employeeEditContainer").hide();
      }, 4000);
    });
  }

  return (
    <>
      <div className="container">
        <button id="backButton" className="btn btn-warning">
          <Link to="/admin">&lt; Back</Link>
        </button>
      </div>
      <div id="editUser" className="container">
        <h1>Edit User data</h1>
        <hr/>
        <div id="UserTable">
          <h2>User Table</h2>
          <table className="table table-dark table-hover">
            <thead>
              <tr>
                <th scope="col">User Login</th>
                <th scope="col">User Password</th>
                <th scope="col">User Email</th>
                <th scope="col">User Type</th>
                <th scope="col">Login Key</th>
                <th scope="col">Employees ID</th>
                <th scope="col">Edit</th>
              </tr>
            </thead>
            <tbody>
              <User key={utils.newID()}userData={users}/>
            </tbody>
          </table>
        </div>
        <hr/>
        <div id="EmployeeTable">
          <h2>Employees Table</h2>
          <div id="employeeEditContainer" className="container">
            <div className="close">
              <button className="btn">X</button>
            </div>
            <div className="row">
              <h2>Update data in Employees table</h2>
              <div className="resultMessages">
                <p className="successMessage">Successfully updated data</p>
                <p className="errorMessage"></p>
              </div>
              <hr/>
              <div id="originalData" className="col-6">
                <h2>Original Employee Data</h2>
                <div className="row">
                  <div className="col-3">
                    <hr/>
                    <div scope="col">ID</div><span>:</span>
                    <hr/>
                    <div scope="col">Fname</div><span>:</span>
                    <hr/>
                    <div scope="col">Lname</div><span>:</span>
                    <hr/>
                    <div scope="col">email</div><span>:</span>
                    <hr/>
                    <div scope="col">phoneNum</div><span>:</span>
                    <hr/>
                    <div scope="col">WorkNum</div><span>:</span>
                    <hr/>
                    <div scope="col">gender</div><span>:</span>
                    <hr/>
                    <div scope="col">age</div><span>:</span>
                    <hr/>
                    <div scope="col">Department_ID</div><span>:</span>
                    <hr/>
                    <div scope="col">Supervisor_ID</div><span>:</span>
                    <hr/>
                  </div>
                  <div id="employeeEditValues" className="col-8">
                    <hr/>
                    <div scope="col" className="init ID"></div>
                    <hr/>
                    <div scope="col" className="init Fname"></div>
                    <hr/>
                    <div scope="col" className="init Lname"></div>
                    <hr/>
                    <div scope="col" className="init email"></div>
                    <hr/>
                    <div scope="col" className="init phoneNum"></div>
                    <hr/>
                    <div scope="col" className="init WorkNum"></div>
                    <hr/>
                    <div scope="col" className="init gender"></div>
                    <hr/>
                    <div scope="col" className="init age"></div>
                    <hr/>
                    <div scope="col" className="init Department_ID"></div>
                    <hr/>
                    <div scope="col" className="init Supervisor_ID"></div>
                    <hr/>
                  </div>
                </div>
              </div>
              <div id="newData" className="col-6">
                <h2>New Employee Data</h2>
                <div className="row">
                  <div className="col-3">
                    <hr/>
                    <div scope="col">ID</div><span>:</span>
                    <hr/>
                    <div scope="col">Fname</div><span>:</span>
                    <hr/>
                    <div scope="col">Lname</div><span>:</span>
                    <hr/>
                    <div scope="col">email</div><span>:</span>
                    <hr/>
                    <div scope="col">phoneNum</div><span>:</span>
                    <hr/>
                    <div scope="col">WorkNum</div><span>:</span>
                    <hr/>
                    <div scope="col">gender</div><span>:</span>
                    <hr/>
                    <div scope="col">age</div><span>:</span>
                    <hr/>
                    <div scope="col">Department_ID</div><span>:</span>
                    <hr/>
                    <div scope="col">Supervisor_ID</div><span>:</span>
                    <hr/>
                  </div>
                  <div id="employeeInsertValues" className="col-8">
                    <hr/>
                    <div scope="col" className="insert ID"><input type="text" readonly="true"></input></div>
                    <hr/>
                    <div scope="col" className="insert Fname"><input type="text"></input></div>
                    <hr/>
                    <div scope="col" className="insert Lname"><input type="text"></input></div>
                    <hr/>
                    <div scope="col" className="insert email"><input type="text"></input></div>
                    <hr/>
                    <div scope="col" className="insert phoneNum"><input type="text"></input></div>
                    <hr/>
                    <div scope="col" className="insert WorkNum"><input type="text"></input></div>
                    <hr/>
                    <div scope="col" className="insert gender"><input type="text"></input></div>
                    <hr/>
                    <div scope="col" className="insert age"><input type="text"></input></div>
                    <hr/>
                    <div scope="col" className="insert Department_ID"><input type="text"></input></div>
                    <hr/>
                    <div scope="col" className="insert Supervisor_ID"><input type="text"></input></div>
                    <hr/>
                  </div>
                </div>
              </div>
            </div>
            <hr/>
            <div className="action">
              <div>
                <button className="btn btn-warning cancel" onClick={cancelEmployeeEdit}>Discard Changes</button>
                <button className="btn btn-primary" onClick={submitEmployeeEdit}>Save Changes</button>
              </div>
            </div>
          </div>
          <table className="table table-dark table-hover">
            <thead>
              <tr>
                <th scope="col">ID</th>
                <th scope="col">Fname</th>
                <th scope="col">Lname</th>
                <th scope="col">email</th>
                <th scope="col">phoneNum</th>
                <th scope="col">WorkNum</th>
                <th scope="col">gender</th>
                <th scope="col">age</th>
                <th scope="col">Department_ID</th>
                <th scope="col">Supervisor_ID</th>
                <th scope="col">Edit</th>
              </tr>
            </thead>
            <tbody>
              <Employee key={utils.newID()} employeeData={employees}/>
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
};

const User = (props) => {
  props.userData.forEach((item, i) => {
    item.key = utils.newID();
  });

  const handleUserEdit = (data) => {
    console.log(data);
    $("#userEditContainer").show();
    $("#userEditValues .userlogin").text(data.userlogin === null ? "null" : data.userlogin);
    $("#userEditValues .userpassword").text(data.userpassword === null ? "null" : data.userpassword);
    $("#userEditValues .useremail").text(data.useremail === null ? "null" : data.useremail);
    $("#userEditValues .usertype").text(data.usertype === null ? "null" : data.usertype);
    $("#userEditValues .loginkey").text(data.loginkey === null ? "null" : data.loginkey);
    $("#userEditValues .Employees_ID").text(data.Employees_ID === null ? "null" : data.Employees_ID);
  }

  return (
    <>
      {props.userData.map((usr) =>
        <>
          <tr id={usr.userlogin}>
            <td>{usr.userlogin}</td>
            <td>{usr.userpassword}</td>
            <td>{usr.useremail}</td>
            <td>{usr.usertype}</td>
            <td>{usr.loginkey}</td>
            <td>{usr.Employees_ID}</td>
            <td><button className="btn btn-warning" onClick={() => handleUserEdit(usr)}>Edit</button></td>
          </tr>
        </>
      )}
    </>
  )
}

const Employee = (props) => {
  props.employeeData.forEach((item, i) => {
    item.key = utils.newID();
  });

  const handleEmployeeEdit = (data) => {
    console.log(data);
    $("#employeeEditContainer").show();
    $("#employeeEditValues .init.ID").text(data.ID === null ? "null" : data.ID);
    $("#employeeEditValues .init.Fname").text(data.Fname === null ? "null" : data.Fname);
    $("#employeeEditValues .init.Lname").text(data.Lname === null ? "null" : data.Lname);
    $("#employeeEditValues .init.email").text(data.email === null ? "null" : data.email);
    $("#employeeEditValues .init.phoneNum").text(data.phoneNum === null ? "null" : data.phoneNum);
    $("#employeeEditValues .init.WorkNum").text(data.WorkNum === null ? "null" : data.WorkNum);
    $("#employeeEditValues .init.gender").text(data.gender === null ? "null" : data.gender);
    $("#employeeEditValues .init.age").text(data.age === null ? "null" : data.age);
    $("#employeeEditValues .init.Department_ID").text(data.Department_ID === null ? "null" : data.Department_ID);
    $("#employeeEditValues .init.Supervisor_ID").text(data.Supervisor_ID === null ? "null" : data.Supervisor_ID);

    $("#employeeInsertValues .insert.ID input").val(data.ID === null ? "null" : data.ID);
    $("#employeeInsertValues .insert.Fname input").val(data.Fname === null ? "null" : data.Fname);
    $("#employeeInsertValues .insert.Lname input").val(data.Lname === null ? "null" : data.Lname);
    $("#employeeInsertValues .insert.email input").val(data.email === null ? "null" : data.email);
    $("#employeeInsertValues .insert.phoneNum input").val(data.phoneNum === null ? "null" : data.phoneNum);
    $("#employeeInsertValues .insert.WorkNum input").val(data.WorkNum === null ? "null" : data.WorkNum);
    $("#employeeInsertValues .insert.gender input").val(data.gender === null ? "null" : data.gender);
    $("#employeeInsertValues .insert.age input").val(data.age === null ? "null" : data.age);
    $("#employeeInsertValues .insert.Department_ID input").val(data.Department_ID === null ? "null" : data.Department_ID);
    $("#employeeInsertValues .insert.Supervisor_ID input").val(data.Supervisor_ID === null ? "null" : data.Supervisor_ID);
  }

  return (
    <>
      {props.employeeData.map((usr) =>
        <>
          <tr id={usr.ID}>
            <td>{usr.ID}</td>
            <td>{usr.Fname}</td>
            <td>{usr.Lname}</td>
            <td>{usr.email}</td>
            <td>{usr.phoneNum}</td>
            <td>{usr.WorkNum}</td>
            <td>{usr.gender}</td>
            <td>{usr.age}</td>
            <td>{usr.Department_ID}</td>
            <td>{usr.Supervisor_ID}</td>
            <td><button className="btn btn-warning" onClick={() => handleEmployeeEdit(usr)}>Edit</button></td>
          </tr>
        </>
      )}
    </>
  )
}

export default EditUser;
