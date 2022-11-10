import { Link } from "react-router-dom";
import GenderData from '../Components/GenderData';
import GenderOption from '../Components/GenderOption';
import DepartmentData from '../Components/DepartmentData';
import DepartmentOption from '../Components/DepartmentOption';
import { useState, useEffect } from 'react';
import $ from 'jquery';
import "../css/CreateAccount.css";
import "../css/Login.css";

const CreateAccount = (props) => {
  const [firstRun, setFirstRun] = useState(true);
  const [genData, setGenValue] = useState("-");
  const [depData, setDepData] = useState(DepartmentData);
  const [depValue, setDepValue] = useState(null);
  const [supValue, setSupValue] = useState(null);
  const [userType, setUserType] = useState("employee");

  useEffect(() => {
    if (firstRun) {
      window.dbConnection.getDepartments().then((result) => {
        let newData = [];
        result.forEach((item, i) => {

          newData.push({
            id: item.ID,
            label: item.DName,
            value: item.Supervisor_ID
          });
        });
        setDepData([...newData]);
      });

      setFirstRun(false);
    }
  });

  function handleDepChange(e) {
    // e.preventDefault();
  }

  async function handleSubmit(e) {
    e.preventDefault();
    window.dbConnection.createAccount({
      Fname: $("#firstName").val(),
      Lname: $("#lastName").val(),
      password: $("#password").val(),
      email: $("#userEmail").val(),
      userType: $("#userType").val(),
      phoneNum: $("#phoneNum").val(),
      gender: $("#gender").val(),
      age: $("#age").val(),
      Department_ID: $("#department").val(),
      Supervisor_ID: $("#department option[value='" + $("#department").val() + "']")[0].id
    }).then((result) => {
      console.log(result);
      if (typeof result === 'string') {
        if (result.slice(0,5) == "Error") {
          $("#createAccount .errorMessage").text(result);
          $("#createAccount .errorMessage").addClass("active");
          setTimeout(() => {
            $("#createAccount .errorMessage").removeClass("active");
          }, 4000);
        }
      } else {
        $("#createAccount .successMessage").addClass("active");
        setTimeout(() => {
          $("#createAccount .successMessage").removeClass("active");
        }, 4000);
      }
    });
  }

  function togglePassword(e) {
    let inputType = $("#password").attr("type");
    if (inputType === "text") {
      $("#password").attr("type", "password");
    } else {
      $("#password").attr("type", "text");
    }

    let inputTypeLabel = $("label.password-helper").text();
    if (inputTypeLabel === "Show password") {
      $("label.password-helper").text("Hide password");
    } else {
      $("label.password-helper").text("Show password");
    }
  }

  return (
    <>
      <div className="container">
        <button id="backButton" className="btn btn-warning">
          <Link to="/admin">&lt; Back</Link>
        </button>
      </div>
      <div id="createAccount" className="container">
        <div>
          <h4 id="createAccountTitle" className="text-start">Marist DBAs</h4>
          <div className="header">
            Create Account
          </div>
          <p className="successMessage">Account created successfully</p>
          <p className="errorMessage"></p>
          <form id="createAccountForm" onSubmit={handleSubmit} >
            <div>
              <div>
                <label>First Name</label>
              </div>
              <div>
                <input id="firstName" name="firstName" className="fullWidth mb-3" type="text" required></input>
              </div>
              <div>
                <label>Last Name</label>
              </div>
              <div>
                <input id="lastName" name="lastName" className="fullWidth mb-3" type="text" required></input>
              </div>
              <div>
                <label>Password</label>
              </div>
              <div>
                <input id="password" name="password" className="fullWidth mb-3" type="password" required></input>
              </div>
              <div>
                <input type="checkbox" onClick={togglePassword}></input>
                <label className="password-helper">Show password</label>
              </div>
              <div>
                <label>User Email</label>
              </div>
              <div>
                <input id="userEmail" name="userEmail" className="fullWidth mb-3" type="email" required></input>
              </div>
              <div>
                <label>User Type</label>
                <select id="userType" name="userType" className="fullWidth mb-3" onChange={(e) => setUserType(e.target.value)} required>
                  <option value="employee">Employee</option>
                  <option value="admin">Admin</option>
                </select>
              </div>
              <div>
                <label>Phone Number</label>
              </div>
              <div>
                <input id="phoneNum" name="phoneNum" className="fullWidth mb-3" type="tel" placeholder="123-456-7890" pattern="[0-9]{3}-[0-9]{3}-[0-9]{4}" required></input>
              </div>
              <div>
                <label>Gender</label>
                <select id="gender" name="gender" className="fullWidth mb-3" onChange={(e) => setGenValue(e.target.value)} required>
                  <GenderOption genderData={GenderData} />
                </select>
              </div>
              <div>
                <label>Age</label>
              </div>
              <div>
                <input id="age" name="age" className="fullWidth mb-3" type="age" required></input>
              </div>
              <div>
                <label>Department</label>
                <select id="department" name="department" className="fullWidth mb-3" onChange={(e) => setDepValue(e.target.value)} required>
                  <DepartmentOption departmentData={depData} />
                </select>
              </div>
            </div>
            <div>
              <button className="btn-primary btn" type="submit">Create</button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default CreateAccount;
