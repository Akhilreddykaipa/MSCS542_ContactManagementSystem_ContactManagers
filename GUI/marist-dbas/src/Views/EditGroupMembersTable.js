import { Link } from "react-router-dom";
import { useEffect, useState } from 'react';
import TableEditor from "./TableEditor";
import $ from 'jquery';
import "../css/EditGroupMembersTable.css";
const utils = require('../utils/utils.js');

const EditGroupMembersTable = (props) => {
  const [groupMem, setGroupMem] = useState([]);
  const [firstRun, setFirstRun] = useState(true);
  const [showEdit, setShowEdit] = useState(false);
  const [colDat, setColDat] = useState(null);
  const [headers, setHeaders] = useState([]);

  useEffect(() => {
    getGroupMemberData();
  }, []);

  const getGroupMemberData = () => {
    window.dbConnection.getGroupMembers().then((result) => {
      setGroupMem(result);
      let keys = Object.keys(result[0]);
      setHeaders([...keys]);
    });
  }

  const submitEdit = (arg) => {
    window.dbConnection.setGroupMembers({
      ID: arg.ID,
      GroupID: arg.GroupID,
      UserID: arg.UserID,
      JoinDate: utils.formatDate(arg.JoinDate)
    }).then((result) => {
      $(".successMessage").addClass("active");
      getGroupMemberData();
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
      <div id="EditGroupMembersTable" className="container">
        <h1>Edit GroupDetails Table</h1>
        <div className="resultMessages">
          <p className="successMessage">Successfully updated data</p>
          <p className="errorMessage"></p>
        </div>
        <hr/>
        <div id="GroupMembersTable">
          <TableEditor
            key={utils.newID()}
            tableName={"Group Members"}
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
                <th scope="col">GroupID</th>
                <th scope="col">UserID</th>
                <th scope="col">JoinDate</th>
                <th scope="col">Edit</th>
              </tr>
            </thead>
            <tbody id="groupDetailsBody">
              {groupMem.map((attr) => {
                return (
                  <>
                    <tr id={attr.ID}>
                      <td>{attr.ID}</td>
                      <td>{attr.GroupID}</td>
                      <td>{attr.UserID}</td>
                      <td>{utils.formatDate(attr.JoinDate)}</td>
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

export default EditGroupMembersTable;
