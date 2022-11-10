import { Link } from "react-router-dom";
import { useEffect, useState } from 'react';
import TableEditor from "./TableEditor";
import $ from 'jquery';
// import validate from 'jquery-validation';
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
      console.log(result);
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
      ID: arg.ID, //$("#userInsertValues .insert.Employees_ID input").val()
      senderID: arg.senderID, //$("#userInsertValues .insert.senderID input").val(),
      userID: arg.userID, //$("#userInsertValues .insert.userID input").val(),
      groupID: arg.groupID, //$("#userInsertValues .insert.groupID input").val(),
      Message: arg.Message, //$("#userInsertValues .insert.Message input").val(),
      Messagedate: arg.Messagedate, //$("#userInsertValues .insert.Messagedate input").val(),
    }).then((result) => {
      console.log(result);
      $("#userEditContainer .successMessage").addClass("active");
      getMessageData();
      setTimeout(() => {
        $("#userEditContainer .successMessage").removeClass("active");
        $("#userEditContainer").hide();
      }, 4000);
    });
  }

  const handleMessageEdit = (data) => {
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
      <div id="EditMessagesTable" className="container">
        <h1>Edit Messages Table</h1>
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
