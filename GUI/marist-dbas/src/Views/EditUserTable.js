import { Link } from "react-router-dom";
import { useEffect, useState } from 'react';
import $ from 'jquery';
// import validate from 'jquery-validation';
import "../css/EditUserTable.css";
const utils = require('../utils/utils.js');

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
    window.dbConnection.setUsers({
      userlogin: $("#userInsertValues .insert.userlogin input").val(),
      userpassword: $("#userInsertValues .insert.userpassword input").val(),
      useremail: $("#userInsertValues .insert.useremail input").val(),
      usertype: $("#userInsertValues .insert.usertype input").val(),
      loginkey: $("#userInsertValues .insert.loginkey input").val(),
      Employees_ID: $("#userInsertValues .insert.Employees_ID input").val()
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

  // const setFields = (data) => {    
  //   for (let i = 0; i < Object.keys(data).length; i++) {
  //     let key = Object.keys(data)[i];
  //     $("#userEditValues .init." + key).text(data[key]);
  //     $("#userInsertValues .insert." + key + " input").val(data[key]);
  //   }
  // }

  return (
    <>
      <div className="container">
        <button id="backButton" className="btn btn-warning">
          <Link to="/admin">&lt; Back</Link>
        </button>
      </div>
      <div id="EditUserTable" className="container">
        <h1>Edit Users Table</h1>
        <hr/>
        <div id="UserTable">
          <div id="userEditContainer" className="container">
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
                      <div>userpassword</div><span>:</span>
                      <hr/>
                      <div>useremail</div><span>:</span>
                      <hr/>
                      <div>usertype</div><span>:</span>
                      <hr/>
                      <div>loginkey</div><span>:</span>
                      <hr/>
                      <div>Employees_ID</div><span>:</span>
                      <hr/>
                    </div>
                    <div id="userEditValues" className="col-8">
                      <hr/>
                      <div className="init userlogin"></div>
                      <hr/>
                      <div className="init userpassword"></div>
                      <hr/>
                      <div className="init useremail"></div>
                      <hr/>
                      <div className="init usertype"></div>
                      <hr/>
                      <div className="init loginkey"></div>
                      <hr/>
                      <div className="init Employees_ID"></div>
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
                      <div>userpassword</div><span>:</span>
                      <hr/>
                      <div>useremail</div><span>:</span>
                      <hr/>
                      <div>usertype</div><span>:</span>
                      <hr/>
                      <div>loginkey</div><span>:</span>
                      <hr/>
                      <div>Employees_ID</div><span>:</span>
                      <hr/>
                    </div>
                    <div id="userInsertValues" className="col-8">
                      <hr/>
                      <div className="insert userlogin"><input type="text" readOnly={true}></input></div>
                      <hr/>
                      <div className="insert userpassword"><input type="text"></input></div>
                      <hr/>
                      <div className="insert useremail"><input type="text"></input></div>
                      <hr/>
                      <div className="insert usertype"><input type="text"></input></div>
                      <hr/>
                      <div className="insert loginkey"><input type="text"></input></div>
                      <hr/>
                      <div className="insert Employees_ID"><input type="text"></input></div>
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
                <th scope="col">userpassword</th>
                <th scope="col">useremail</th>
                <th scope="col">usertype</th>
                <th scope="col">loginkey</th>
                <th scope="col">Employees_ID</th>
                <th scope="col">Edit</th>
              </tr>
            </thead>
            <tbody>
              {users.map((attr) => {
                return <User key={utils.newID()} userData={attr}/>
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
      $("#userEditValues .init." + key).text(data[key]);
      $("#userInsertValues .insert." + key + " input").val(data[key]);
    }
  }

  return (
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
  )
}

export default EditUserTable;
