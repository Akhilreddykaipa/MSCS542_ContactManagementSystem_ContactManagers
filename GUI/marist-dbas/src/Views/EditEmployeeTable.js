import { Link } from "react-router-dom";
import { useEffect, useState } from 'react';
import $ from 'jquery';
import "../css/EditEmployeeTable.css";
const utils = require('../utils/utils.js');
let newID = Math.floor(utils.newID());
console.log(newID);

const EditEmployeeTable = (props) => {
  const [employees, setEmployees] = useState([]);
  const [firstRun, setFirstRun] = useState(true);

  useEffect(() => {
    if (firstRun) {
      getEmployeeData();
    }
  });

  const getEmployeeData = () => {
    window.dbConnection.getEmployees().then((result) => {
      setEmployees([...result]);
      setFirstRun(false);
    });
  }

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
      $("#EmployeeTable .successMessage").addClass("active");
      getEmployeeData();
      $("#employeeEditContainer").hide();
      setTimeout(() => {
        $("#EmployeeTable .successMessage").removeClass("active");
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
      <div id="EditEmployeeTable" className="container">
        <h1>Edit Employees Table</h1>
        <hr/>
        <div id="EmployeeTable">
          <div className="resultMessages">
            <p className="successMessage">Successfully updated data</p>
            <p className="errorMessage"></p>
          </div>
          <div id="employeeEditContainer" className="container">
            <div>
              <div className="close">
                <div className="">
                  <button className="btn btn-secondary" onClick={cancelEmployeeEdit}>X</button>
                </div>
              </div>
              <div className="row">
                <h2>Update data in Employees table</h2>
                <hr/>
                <div id="originalData" className="col-6">
                  <h2>Original Employee Data</h2>
                  <div className="row">
                    <div className="col-3">
                      <hr/>
                      <div>ID</div><span>:</span>
                      <hr/>
                      <div>Fname</div><span>:</span>
                      <hr/>
                      <div>Lname</div><span>:</span>
                      <hr/>
                      <div>email</div><span>:</span>
                      <hr/>
                      <div>phoneNum</div><span>:</span>
                      <hr/>
                      <div>WorkNum</div><span>:</span>
                      <hr/>
                      <div>gender</div><span>:</span>
                      <hr/>
                      <div>age</div><span>:</span>
                      <hr/>
                      <div>Department_ID</div><span>:</span>
                      <hr/>
                      <div>Supervisor_ID</div><span>:</span>
                      <hr/>
                    </div>
                    <div id="employeeEditValues" className="col-8">
                      <hr/>
                      <div className="init ID"></div>
                      <hr/>
                      <div className="init Fname"></div>
                      <hr/>
                      <div className="init Lname"></div>
                      <hr/>
                      <div className="init email"></div>
                      <hr/>
                      <div className="init phoneNum"></div>
                      <hr/>
                      <div className="init WorkNum"></div>
                      <hr/>
                      <div className="init gender"></div>
                      <hr/>
                      <div className="init age"></div>
                      <hr/>
                      <div className="init Department_ID"></div>
                      <hr/>
                      <div className="init Supervisor_ID"></div>
                      <hr/>
                    </div>
                  </div>
                </div>
                <div id="newData" className="col-6">
                  <h2>New Employee Data</h2>
                  <div className="row">
                    <div className="col-3">
                      <hr/>
                      <div>ID</div><span>:</span>
                      <hr/>
                      <div>Fname</div><span>:</span>
                      <hr/>
                      <div>Lname</div><span>:</span>
                      <hr/>
                      <div>email</div><span>:</span>
                      <hr/>
                      <div>phoneNum</div><span>:</span>
                      <hr/>
                      <div>WorkNum</div><span>:</span>
                      <hr/>
                      <div>gender</div><span>:</span>
                      <hr/>
                      <div>age</div><span>:</span>
                      <hr/>
                      <div>Department_ID</div><span>:</span>
                      <hr/>
                      <div>Supervisor_ID</div><span>:</span>
                      <hr/>
                    </div>
                    <div id="employeeInsertValues" className="col-8">
                      <hr/>
                      <div className="insert ID"><input type="text" readOnly={true}></input></div>
                      <hr/>
                      <div className="insert Fname"><input type="text"></input></div>
                      <hr/>
                      <div className="insert Lname"><input type="text"></input></div>
                      <hr/>
                      <div className="insert email"><input type="text"></input></div>
                      <hr/>
                      <div className="insert phoneNum"><input type="text"></input></div>
                      <hr/>
                      <div className="insert WorkNum"><input type="text"></input></div>
                      <hr/>
                      <div className="insert gender"><input type="text"></input></div>
                      <hr/>
                      <div className="insert age"><input type="text"></input></div>
                      <hr/>
                      <div className="insert Department_ID"><input type="text"></input></div>
                      <hr/>
                      <div className="insert Supervisor_ID"><input type="text"></input></div>
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
              {employees.map((attr) => {
                return <Employee key={(Date.now() + Math.random()).toString()} employeeData={attr}/>
              })}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
};

const Employee = (props) => {
  const usr = props.employeeData;
  const handleEmployeeEdit = (data) => {
    $("#employeeEditContainer").show();
    $("html").animate({
        scrollTop: $("#EditEmployeeTable").offset().top
    });
    for (let i = 0; i < Object.keys(data).length; i++) {
      let key = Object.keys(data)[i];
      console.log(key, typeof data[key]);
      $("#employeeEditValues .init." + key).text(data[key]);
      $("#employeeInsertValues .insert." + key + " input").val(data[key]);
    }
  }

  return (
    <>
      <tr className={props.key} id={usr.ID}>
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
  )
}

export default EditEmployeeTable;
