import { Link } from "react-router-dom";
import { useEffect, useState } from 'react';
import $ from 'jquery';
// import validate from 'jquery-validation';
import "../css/EditUserTable.css";
const utils = require('../utils/utils.js');
let newID = Math.floor(utils.newID());
console.log(newID);

const EditUserTable = (props) => {
  const [users, setUsers] = useState([]);
  const [firstRun, setFirstRun] = useState(true);

  useEffect(() => {
    if (firstRun) {
      getUserData();
    }
  });

  const getUserData = () => {
    window.dbConnection.getUsers().then((result) => {
      console.log(result);
      setUsers([...result]);
      setFirstRun(false);
    });
  }

  const cancelUserEdit = (e) => {
    $("#userEditContainer").hide();
  }

  const submitUserEdit = (e) => {
    console.log($("#userInsertValues .insert.userlogin input").val());
    window.dbConnection.setUserData({
      userlogin: $("#userInsertValues .insert.userlogin input").val(),
      Fname: $("#userInsertValues .insert.Fname input").val(),
      Lname: $("#userInsertValues .insert.Lname input").val(),
      email: $("#userInsertValues .insert.email input").val(),
      phoneNum: $("#userInsertValues .insert.phoneNum input").val(),
      WorkNum: $("#userInsertValues .insert.WorkNum input").val(),
      gender: $("#userInsertValues .insert.gender input").val(),
      age: $("#userInsertValues .insert.age input").val(),
      Department_ID: $("#userInsertValues .insert.Department_ID input").val(),
      Supervisor_ID: $("#userInsertValues .insert.Supervisor_ID input").val()
    }).then((result) => {
      console.log(result);
      $("#userEditContainer .successMessage").addClass("active");
      getUserData();
      setTimeout(() => {
        $("#userEditContainer .successMessage").removeClass("active");
        $("#userEditContainer").hide();
      }, 4000);
    });
  }

  return (
    <>
      <div className="container">
        <button userlogin="backButton" className="btn btn-warning">
          <Link to="/admin">&lt; Back</Link>
        </button>
      </div>
      <div userlogin="EditUserTable" className="container">
        <h1>Edit Users Table</h1>
        <hr/>
        <div userlogin="UserTable">
          <div userlogin="userEditContainer" className="container">
            <div>
              <div className="close">
                <div className="">
                  <button className="btn btn-secondary" onClick={cancelUserEdit}>X</button>
                </div>
              </div>
              <div className="row">
                <h2>Update data in Users table</h2>
                <div className="resultMessages">
                  <p className="successMessage">Successfully updated data</p>
                  <p className="errorMessage"></p>
                </div>
                <hr/>
                <div id="originalData" className="col-6">
                  <h2>Original User Data</h2>
                  <div className="row">
                    <div className="col-3">
                      <hr/>
                      <div>userlogin</div><span>:</span>
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
                    <div userlogin="userEditValues" className="col-8">
                      <hr/>
                      <div className="init userlogin"></div>
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
                  <h2>New User Data</h2>
                  <div className="row">
                    <div className="col-3">
                      <hr/>
                      <div>userlogin</div><span>:</span>
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
                    <div id="userInsertValues" className="col-8">
                      <hr/>
                      <div className="insert userlogin"><input type="text" readOnly={true}></input></div>
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
                  <button className="btn btn-warning cancel" onClick={cancelUserEdit}>Discard Changes</button>
                  <button className="btn btn-primary" onClick={submitUserEdit}>Save Changes</button>
                </div>
              </div>
            </div>
          </div>
          <table className="table table-dark table-hover">
            <thead>
              <tr>
                <th scope="col">userlogin</th>
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
              {users.map((attr) => {
                return <User userData={attr}/>
              })}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
};

const User = (props) => {
  const usr = props.userData;
  const handleUserEdit = (data) => {
    $("#userEditContainer").show();
    $("html").animate({
        scrollTop: $("#EditUserTable").offset().top
    });
    for (let i = 0; i < Object.keys(data).length; i++) {
      let key = Object.keys(data)[i];
      console.log(key, typeof data[key]);
      $("#userEditValues .init." + key).text(data[key]);
      $("#userInsertValues .insert." + key + " input").val(data[key]);
    }
  }

  return (
    <>
      <tr userlogin={usr.userlogin}>
        <td>{usr.userlogin}</td>
        <td>{usr.Fname}</td>
        <td>{usr.Lname}</td>
        <td>{usr.email}</td>
        <td>{usr.phoneNum}</td>
        <td>{usr.WorkNum}</td>
        <td>{usr.gender}</td>
        <td>{usr.age}</td>
        <td>{usr.Department_ID}</td>
        <td>{usr.Supervisor_ID}</td>
        <td><button className="btn btn-warning" onClick={() => handleUserEdit(usr)}>Edit</button></td>
      </tr>
    </>
  )
}

export default EditUserTable;
