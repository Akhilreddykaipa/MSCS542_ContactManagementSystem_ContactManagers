import { Link } from "react-router-dom";
import { useEffect, useState } from 'react';
import TableEditor from "./TableEditor";
import $ from 'jquery';
import "../css/EditSupervisorTable.css";
const utils = require('../utils/utils.js');

const EditSupervisorTable = (props) => {
  const [supervisors, setSupervisors] = useState([]);
  const [firstRun, setFirstRun] = useState(true);
  const [showEdit, setShowEdit] = useState(false);
  const [colDat, setColDat] = useState(null);
  const [headers, setHeaders] = useState([]);

  useEffect(() => {
    getSupervisorData();
  }, []);

  const getSupervisorData = () => {
    window.dbConnection.getSupervisors().then((result) => {
      console.log(result);
      setSupervisors(result);
      let keys = Object.keys(result[0]);
      setHeaders([...keys]);
    });
  }

  const submitEdit = (arg) => {
    window.dbConnection.setSupervisors({
      ID: arg.ID,
      UserID: arg.UserID,
      DepartmentID: arg.DepartmentID,
    }).then((result) => {
      console.log(result);
      $(".successMessage").addClass("active");
      getSupervisorData();
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
      <div id="EditSupervisorTable" className="container">
        <h1>Edit Supervisor Table</h1>
        <div className="resultMessages">
          <p className="successMessage">Successfully updated data</p>
          <p className="errorMessage"></p>
        </div>
        <hr/>
        <div id="SupervisorTable">
          <TableEditor
            key={utils.newID()}
            tableName={"Supervisor"}
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
                <th scope="col">UserID</th>
                <th scope="col">DepartmentID</th>
                <th scope="col">Edit</th>
              </tr>
            </thead>
            <tbody id="supervisorBody">
              {supervisors.map((attr) => {
                console.log(attr)
                return (
                  <>
                    <tr id={attr.ID}>
                      <td>{attr.ID}</td>
                      <td>{attr.UserID}</td>
                      <td>{attr.DepartmentID}</td>
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

export default EditSupervisorTable;
