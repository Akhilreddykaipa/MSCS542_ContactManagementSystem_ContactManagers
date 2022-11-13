import { Link } from "react-router-dom";
import { useEffect, useState } from 'react';
import TableEditor from "./TableEditor";
import $ from 'jquery';
import "../css/EditEmailHistoryTable.css";
const utils = require('../utils/utils.js');

const EditEmailHistoryTable = (props) => {
  const [department, setDepartments] = useState([]);
  const [firstRun, setFirstRun] = useState(true);
  const [showEdit, setShowEdit] = useState(false);
  const [colDat, setColDat] = useState(null);
  const [headers, setHeaders] = useState([]);

  useEffect(() => {
    getDepartmentData();
  }, []);

  const getDepartmentData = () => {
    window.dbConnection.getDepartments().then((result) => {
      setDepartments(result);
      let keys = Object.keys(result[0]);
      setHeaders([...keys]);
    });
  }

  const submitEdit = (arg) => {
    window.dbConnection.setDepartments({
      ID: arg.ID,
      DName: arg.DName
    }).then((result) => {
      $(".successMessage").addClass("active");
      getDepartmentData();
      setShowEdit(false);
      setTimeout(() => {
        $(".successMessage").removeClass("active");
      }, 4000);
    });
  }

  const handleEdit = (data) => {
    setColDat(data);
    setShowEdit(true);
  }

  return (
    <>
      <div className="container">
        <button id="backButton" className="btn btn-warning">
          <Link to="/admin">&lt; Back</Link>
        </button>
      </div>
      <div id="EditEmailHistoryTable" className="container">
        <h1>Edit Department Table</h1>
        <div className="resultMessages">
          <p className="successMessage">Successfully updated data</p>
          <p className="errorMessage"></p>
        </div>
        <hr/>
        <div id="DepartmentTable">
          <TableEditor
            key={utils.newID()}
            tableName={"Department"}
            show={showEdit}
            setShow={setShowEdit}
            submit={submitEdit}
            tableData={headers}
            rows={colDat}
          />
          <table className="table table-dark table-hover">
            <thead>
              <tr>
                <th scope="col">ID</th>
                <th scope="col">DName</th>
                <th scope="col">Supervisor_ID</th>
                <th scope="col">Edit</th>
              </tr>
            </thead>
            <tbody id="departmentBody">
              {department.map((attr) => {
                return (
                  <>
                    <tr id={attr.ID}>
                      <td>{attr.ID}</td>
                      <td>{attr.DName}</td>
                      <td>{attr.Supervisor_ID}</td>
                      <td><button className="btn btn-warning" onClick={() => handleEdit(attr)}>Edit</button></td>
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
};

export default EditEmailHistoryTable;
