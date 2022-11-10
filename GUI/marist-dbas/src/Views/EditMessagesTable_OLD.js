import { Link } from "react-router-dom";
import { useEffect, useState } from 'react';
import $ from 'jquery';
// import validate from 'jquery-validation';
import "../css/EditMessagesTable.css";
const utils = require('../utils/utils.js');

const EditMessagesTable = (props) => {
  const [messages, setMessages] = useState([]);
  const [firstRun, setFirstRun] = useState(true);

  useEffect(() => {
    if (firstRun) {
      getMessageData();
    }
  }, []);

  const getMessageData = () => {
    window.dbConnection.getMessages().then((result) => {
      console.log(result);
      setMessages([...result]);
      setFirstRun(false);
      $("#messagesBody").show();
    });
  }

  const cancelMessageEdit = (e) => {
    $("#messageEditContainer").hide();
  }

  const submitMessageEdit = (e) => {
    window.dbConnection.setMessages({
      senderID: $("#userInsertValues .insert.senderID input").val(),
      userID: $("#userInsertValues .insert.userID input").val(),
      groupID: $("#userInsertValues .insert.groupID input").val(),
      Message: $("#userInsertValues .insert.Message input").val(),
      Messagedate: $("#userInsertValues .insert.Messagedate input").val(),
      Employees_ID: $("#userInsertValues .insert.Employees_ID input").val()
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
          <div id="messageEditContainer" className="container">
            <div>
              <div className="close">
                <div className="">
                  <button className="btn btn-secondary" onClick={cancelMessageEdit}>X</button>
                </div>
              </div>
              <div className="row">
                <h2>Update data in Messages table</h2>
                <div className="resultMessages">
                  <p className="successMessage">Successfully updated data</p>
                  <p className="errorMessage"></p>
                </div>
                <hr/>
                <div id="originalData" className="col-6">
                  <h2>Original Message Data</h2>
                  <div className="row">
                    <div className="col-3">
                      <hr/>
                      <div>senderID</div><span>:</span>
                      <hr/>
                      <div>userID</div><span>:</span>
                      <hr/>
                      <div>groupID</div><span>:</span>
                      <hr/>
                      <div>Message</div><span>:</span>
                      <hr/>
                      <div>Messagedate</div><span>:</span>
                      <hr/>
                    </div>
                    <div id="userEditValues" className="col-8">
                      <hr/>
                      <div className="init senderID"></div>
                      <hr/>
                      <div className="init userID"></div>
                      <hr/>
                      <div className="init groupID"></div>
                      <hr/>
                      <div className="init Message"></div>
                      <hr/>
                      <div className="init Messagedate"></div>
                      <hr/>
                    </div>
                  </div>
                </div>
                <div id="newData" className="col-6">
                  <h2>New Message Data</h2>
                  <div className="row">
                    <div className="col-3">
                      <hr/>
                      <div>senderID</div><span>:</span>
                      <hr/>
                      <div>userID</div><span>:</span>
                      <hr/>
                      <div>groupID</div><span>:</span>
                      <hr/>
                      <div>Message</div><span>:</span>
                      <hr/>
                      <div>Messagedate</div><span>:</span>
                      <hr/>
                    </div>
                    <div id="userInsertValues" className="col-8">
                      <hr/>
                      <div className="insert senderID"><input type="text" readOnly={true}></input></div>
                      <hr/>
                      <div className="insert userID"><input type="text"></input></div>
                      <hr/>
                      <div className="insert groupID"><input type="text"></input></div>
                      <hr/>
                      <div className="insert Message"><input type="text"></input></div>
                      <hr/>
                      <div className="insert Messagedate"><input type="text"></input></div>
                      <hr/>
                    </div>
                  </div>
                </div>
              </div>
              <hr/>
              <div className="action">
                <div>
                  <button className="btn btn-warning cancel" onClick={cancelMessageEdit}>Discard Changes</button>
                  <button className="btn btn-primary" onClick={submitMessageEdit}>Save Changes</button>
                </div>
              </div>
            </div>
          </div>
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
                console.log(attr);
                return <Message key={utils.newID() + Math.random()} userData={attr}/>
              })}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
};

const Message = (props) => {
  const handleMessageEdit = (data) => {
    console.log(data);
    $("#messageEditContainer").show();
    $("html").animate({
        scrollTop: $("#EditMessagesTable").offset().top
    });
    for (let i = 0; i < Object.keys(data).length; i++) {
      let key = Object.keys(data)[i];
      $("#messageEditValues .init." + key).text(data[key]);
      $("#messageInsertValues .insert." + key + " input").val(data[key]);
    }
  }

  const usr = props.userData;
  let messageDate = utils.formatDate(usr.Messagedate);
  console.log(messageDate);

  return (
    <>
      <tr id={usr.ID}>
        <td>{usr.senderID}</td>
        <td>{usr.userID}</td>
        <td>{usr.groupID}</td>
        <td>{usr.Message}</td>
        <td>{messageDate}</td>
        <td><button className="btn btn-warning" onClick={() => handleMessageEdit(usr)}>Edit</button></td>
      </tr>
    </>
  )
}

export default EditMessagesTable;
