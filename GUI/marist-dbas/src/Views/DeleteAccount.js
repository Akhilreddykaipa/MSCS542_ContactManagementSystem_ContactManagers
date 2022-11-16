import { Link } from "react-router-dom";
import TableEditor from "./TableEditor";
import { useState, useEffect } from 'react';
import $ from 'jquery';
import "../css/DeleteAccount.css";
import "../css/Login.css";
import "../css/EditUserTable.css";

const DeleteAccount = (props) => {
  const [users, setUsers] = useState([]);
  const [showEdit, setShowEdit] = useState(false);
  const [colDat, setColDat] = useState(null);
  const [headers, setHeaders] = useState([]);

  useEffect(() => {
      window.dbConnection.getUsers().then((result) => {
        setUsers([...result]);
        let keys = Object.keys(result[0]);
        setHeaders([...keys]);
      });
  }, [users]);

  const cancelUserEdit = (e) => {
    $("#userEditContainer").hide();
  }

  const submitEdit = (res) => {
    console.log(res);
  }

  const handleUserEdit = (data) => {
    setColDat(data);
    console.log(colDat);
    setShowEdit(true);
  }

  async function handleSubmit(arg) {
    console.log(arg);
    window.dbConnection.deleteUser({
      email: arg.useremail
    }).then((result) => {
      console.log(result);
      if (typeof result === 'string') {
        if (result.slice(0,5) == "Error") {
          $("#deleteAccount .errorMessage").text(result);
          $("#deleteAccount .errorMessage").addClass("active");
          setTimeout(() => {
            $("#deleteAccount .errorMessage").removeClass("active");
          }, 4000);
        }
      } else {
        $("#deleteAccount .successMessage").addClass("active");
        setTimeout(() => {
          $("#deleteAccount .successMessage").removeClass("active");
        }, 4000);
      }
    });
  }

  return (
    <>
      <div className="container">
        <Link to="/admin">
          <button id="backButton" className="btn btn-warning">&lt; Back</button>
        </Link>
      </div>
      <div id="deleteAccount" className="container">
        <div>
          <h4 id="deleteAccountTitle" className="text-start">Marist DBAs</h4>
          <div className="header">
            Delete Account
          </div>
          <p className="successMessage">Account deleted successfully</p>
          <p className="errorMessage"></p>

          <div id="UserTable">
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
                  return (
                    <>
                      <tr id={attr.userlogin}>
                        <td>{attr.userlogin}</td>
                        <td>{attr.userpassword}</td>
                        <td>{attr.useremail}</td>
                        <td>{attr.usertype}</td>
                        <td>{attr.loginkey}</td>
                        <td>{attr.Employees_ID}</td>
                        <td><button className="btn btn-danger" onClick={() => handleSubmit(attr)}>Delete</button></td>
                      </tr>
                    </>
                  )
                })}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </>
  );
};

export default DeleteAccount;
