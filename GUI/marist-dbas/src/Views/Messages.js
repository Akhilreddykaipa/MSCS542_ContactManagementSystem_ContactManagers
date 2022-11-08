import { useState, useEffect } from 'react';
import $ from 'jquery';
import "../css/Messages.css";
const utils = require('../utils/utils.js');

const Messages = (props) => {
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    window.dbConnection.getMessages().then((result) => {
      setMessages([...result]);
    });
    window.dbConnection.getEmployees().then((result) => {
      let employeeData = result;
      window.dbConnection.getEmployeeIDs({
        email: $("#userProfile .userName").text()
      }).then((result) => {
        $(document).ready(() => {
          $("#messagesBody tr").each((i, el) => {
            let sender = $(el).find(".sender");
            let receiver = $(el).find(".receiver");
            if (sender.text() == result[0].ID) {
              sender.text(result[0].Fname + " " + result[0].Lname);
              employeeData.forEach((item, i) => {
                for (let i = 0; i < Object.keys(item).length; i++) {
                  let key = Object.keys(item)[i];
                  if (item[key] === null) item[key] = "";
                }
                if (receiver.text() == item.ID) receiver.text(item.Fname + " " + item.Lname);
              });
            } else if (receiver.text() == result[0].ID) {
              receiver.text(result[0].Fname + " " + result[0].Lname);
              employeeData.forEach((item, i) => {
                for (let i = 0; i < Object.keys(item).length; i++) {
                  let key = Object.keys(item)[i];
                  if (item[key] === null) item[key] = "";
                }
                if (sender.text() == item.ID) sender.text(item.Fname + " " + item.Lname);
              });
            } else {
              $(el).remove();
            }
            $("#messagesBody").show();
          });
        });
      });
    });
  }, []);

  return (
    <>
      <div id="contacts" className="container">
        <h2>Messages</h2>
        <hr/>
        <table className="table table-dark table-hover">
          <thead>
            <tr>
              <th scope="col">Sender</th>
              <th scope="col">Receiver</th>
              <th scope="col">Group</th>
              <th scope="col">Message</th>
              <th scope="col">Message Date</th>
            </tr>
          </thead>
          <tbody id="messagesBody">
            {messages.map((item, i) => {
              return <MessageCell key={utils.newID() + Math.random()} messageData={item} />
            })}
          </tbody>
        </table>
      </div>
    </>
  );
};

const MessageCell = (props) => {
  let dat = props.messageData;
  let messageDate = utils.formatDate(dat.Messagedate);

  return (
    <>
      <tr>
        <td className="sender">{dat.senderID}</td>
        <td className="receiver">{dat.userID}</td>
        <td>{dat.groupID}</td>
        <td>{dat.Message}</td>
        <td>{messageDate}</td>
      </tr>
    </>
  );
}

export default Messages;
