import { Link } from "react-router-dom";
import { useEffect, useState } from 'react';
import TableEditor from "./TableEditor";
import $ from 'jquery';
import "../css/EditMessagesTable.css";
const utils = require('../utils/utils.js');

const EditMessagesTable = (props) => {
  const [messages, setMessages] = useState([]);
  const [firstRun, setFirstRun] = useState(true);
  const [showEdit, setShowEdit] = useState(false);
  const [colDat, setColDat] = useState(null);
  const [headers, setHeaders] = useState([]);

  useEffect(() => {
    if (firstRun) {
      getMessageData();
    }
  }, []);

  const getMessageData = () => {
    window.dbConnection.getMessages().then((result) => {
      setMessages([...result]);
      let keys = Object.keys(result[0]);
      setHeaders([...keys]);
      setFirstRun(false);
      $("#messagesBody").show();
    });
  }

  const cancelMessageEdit = () => {
    $("#messageEditContainer").hide();
  }

  const submitEdit = (arg) => {
    window.dbConnection.setMessages({
      ID: arg.ID,
      senderID: arg.senderID,
      userID: arg.userID,
      groupID: arg.groupID,
      Message: arg.Message,
      Messagedate: utils.formatDate(arg.Messagedate),
    }).then((result) => {
      getMessageData();
      // $("#userEditContainer").hide();
      setShowEdit(false);
      $(".successMessage").addClass("active");
      setTimeout(() => {
        $(".successMessage").removeClass("active");
      }, 4000);
    });
  }

  const handleMessageEdit = (data) => {
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
      <div id="EditMessagesTable" className="container">
        <h1>Edit Messages Table</h1>
        <div className="resultMessages">
          <p className="successMessage">Successfully updated data</p>
          <p className="errorMessage"></p>
        </div>
        <hr/>
        <div id="MessagesTable">
          <TableEditor
            key={utils.newID()}
            tableName={"Messages"}
            show={showEdit}
            setShow={setShowEdit}
            submit={submitEdit}
            tableData={headers}
            rows={colDat}
          />

          <table className="table table-dark table-hover">
            <thead>
              <tr>
                <th scope="col">senderID</th>
                <th scope="col">ID</th>
                <th scope="col">userID</th>
                <th scope="col">groupID</th>
                <th scope="col">Message</th>
                <th scope="col">Messagedate</th>
                <th scope="col">Edit</th>
              </tr>
            </thead>
            <tbody id="messagesBody">
              {messages.map((attr) => {
                return (
                  <>
                    <tr id={attr.ID}>
                      <td>{attr.ID}</td>
                      <td>{attr.senderID}</td>
                      <td>{attr.userID}</td>
                      <td>{attr.groupID}</td>
                      <td>{attr.Message}</td>
                      <td>{utils.formatDate(attr.Messagedate)}</td>
                      <td><button className="btn btn-warning" onClick={() => handleMessageEdit(attr)}>Edit</button></td>
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

export default EditMessagesTable;
