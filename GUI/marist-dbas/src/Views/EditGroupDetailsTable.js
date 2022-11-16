import { Link } from "react-router-dom";
import { useEffect, useState } from 'react';
import TableEditor from "./TableEditor";
import $ from 'jquery';
import "../css/EditGroupDetailsTable.css";
const utils = require('../utils/utils.js');

const EditGroupDetailsTable = (props) => {
  const [groupDet, setGroupDet] = useState([]);
  const [firstRun, setFirstRun] = useState(true);
  const [showEdit, setShowEdit] = useState(false);
  const [colDat, setColDat] = useState(null);
  const [headers, setHeaders] = useState([]);

  useEffect(() => {
    getGroupDetailData();
  }, []);

  const getGroupDetailData = () => {
    window.dbConnection.getGroupDetails().then((result) => {
      console.log(result);
      setGroupDet(result);
      let keys = Object.keys(result[0]);
      setHeaders([...keys]);
    });
  }

  const submitEdit = (arg) => {
    window.dbConnection.setGroupDetails({
      ID: arg.ID,
      LeaderID: arg.LeaderID,
      GroupName: arg.GroupName,
      CreatedDate: utils.formatDate(arg.CreatedDate)
    }).then((result) => {
      console.log(result);
      $(".successMessage").addClass("active");
      getGroupDetailData();
      setShowEdit(false);
      setTimeout(() => {
        $("#EditRelationshipTable .successMessage").removeClass("active");
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
        <Link to="/admin">
          <button id="backButton" className="btn btn-warning">&lt; Back</button>
        </Link>
      </div>
      <div id="EditGroupDetailsTable" className="container">
        <h1>Edit GroupDetails Table</h1>
        <div className="resultMessages">
          <p className="successMessage">Successfully updated data</p>
          <p className="errorMessage"></p>
        </div>
        <hr/>
        <div id="GroupDetailsTable">
          <TableEditor
            key={utils.newID()}
            tableName={"Group Details"}
            show={showEdit}
            setShow={setShowEdit}
            submit={submitEdit}
            tableData={headers}
            rows={colDat}
          />
          <table className="table table-dark table-hover">
            <thead>
              <tr>
                <th scope="col">LeaderID</th>
                <th scope="col">GroupName</th>
                <th scope="col">CreatedDate</th>
                <th scope="col">GroupMembers_ID</th>
                <th scope="col">Edit</th>
              </tr>
            </thead>
            <tbody id="groupDetailsBody">
              {groupDet.map((attr) => {
                return (
                  <>
                    <tr id={attr.ID}>
                      <td>{attr.LeaderID}</td>
                      <td>{attr.GroupName}</td>
                      <td>{utils.formatDate(attr.CreatedDate)}</td>
                      <td>{attr.GroupMembers_ID}</td>
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

export default EditGroupDetailsTable;
