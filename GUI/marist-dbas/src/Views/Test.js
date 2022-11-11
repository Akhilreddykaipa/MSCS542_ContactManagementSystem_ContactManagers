import { Link } from "react-router-dom";
import { useEffect, useState } from 'react';
import TableEditor from "./TableEditor";
import $ from 'jquery';
// import validate from 'jquery-validation';
import "../css/EditUserTable.css";
const utils = require('../utils/utils.js');

const Test = (props) => {
  const [users, setUsers] = useState([]);
  const [firstRun, setFirstRun] = useState(true);
  const [showEdit, setShowEdit] = useState(false);
  const [colDat, setColDat] = useState(null);
  const [headers, setHeaders] = useState([]);

  useEffect(() => {
    if (firstRun) {
      window.dbConnection.getUsers().then((result) => {
        console.log(result);
        setUsers([...result]);
        let keys = Object.keys(result[0]);
        setHeaders([...keys]);
        setFirstRun(false);
      });
    }
  });

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

  return (
    <>
      <div className="container">
        <button id="backButton" className="btn btn-warning">
          <Link to="/admin">&lt; Back</Link>
        </button>
      </div>
      <div id="EditUserTable" className="container">
        <h1>Edit TEST Table</h1>
        <hr/>
        <div id="UserTable">
          <TableEditor
            tableName={"Test"}
            show={showEdit}
            setShow={setShowEdit}
            submit={submitEdit}
            tableData={headers}
            rows={colDat}
          />
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
                      <td><button className="btn btn-warning" onClick={() => handleUserEdit(attr)}>Edit</button></td>
                    </tr>
                  </>
                )
              })}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
}

export default Test;
