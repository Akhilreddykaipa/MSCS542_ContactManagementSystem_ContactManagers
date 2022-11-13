import { Link } from "react-router-dom";
import { useEffect, useState } from 'react';
import TableEditor from "./TableEditor";
import $ from 'jquery';
import "../css/EditEmailHistoryTable.css";
const utils = require('../utils/utils.js');

const EditEmailHistoryTable = (props) => {
  const [emailHistory, setEmailHistory] = useState([]);
  const [firstRun, setFirstRun] = useState(true);
  const [showEdit, setShowEdit] = useState(false);
  const [colDat, setColDat] = useState(null);
  const [headers, setHeaders] = useState([]);

  useEffect(() => {
    getEmailHistoryData();
  }, []);

  const getEmailHistoryData = () => {
    window.dbConnection.getEmailHistory().then((result) => {
      setEmailHistory(result);
      let keys = Object.keys(result[0]);
      setHeaders([...keys]);
    });
  }

  const submitEdit = (arg) => {
    window.dbConnection.setEmailHistory({
      ID: arg.ID,
      SenderID: arg.SenderID,
      Message: arg.Message,
      ReceiverID: arg.ReceiverID,
      EmailDate: utils.formatDate(arg.EmailDate)
    }).then((result) => {
      $(".successMessage").addClass("active");
      getEmailHistoryData();
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
        <h1>Edit EmailHistory Table</h1>
        <div className="resultMessages">
          <p className="successMessage">Successfully updated data</p>
          <p className="errorMessage"></p>
        </div>
        <hr/>
        <div id="EmailHistoryTable">
          <TableEditor
            key={utils.newID()}
            tableName={"EmailHistory"}
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
                <th scope="col">SenderID</th>
                <th scope="col">Message</th>
                <th scope="col">ReceiverID</th>
                <th scope="col">Edit</th>
              </tr>
            </thead>
            <tbody id="emailHistoryBody">
              {emailHistory.map((attr) => {
                return (
                  <>
                    <tr id={attr.ID}>
                      <td>{attr.ID}</td>
                      <td>{attr.SenderID}</td>
                      <td>{attr.Message}</td>
                      <td>{attr.ReceiverID}</td>
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
