import { useState, useEffect } from 'react';
import $ from 'jquery';
import "../css/Messages.css";
const utils = require('../utils/utils.js');

const Messages = (props) => {
  const [messages, setMessages] = useState([]);
  const [firstRun, setFirstRun] = useState(true);
  let groupDet;

  useEffect(() => {
    if (firstRun) {
      window.dbConnection.getMessages().then((result) => {
        setMessages([...result]);
      });
      window.dbConnection.getEmployees().then((result) => {
        let employeeData = result;

        window.dbConnection.getGroupDetails().then((result) => {
          console.log(result);
          groupDet = result;

        }).then((result) => {
          window.dbConnection.getEmployeeIDs({
            email: $("#userProfile .userName").text()
          }).then((result) => {
            $(document).ready(() => {
              $("#messagesBody tr").each((i, el) => {
                let sender = $(el).find(".sender");
                let receiver = $(el).find(".receiver");
                let groupName = $(el).find(".groupName");
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
                groupDet.forEach((item, i) => {
                  console.log(item);
                  if (groupName.text() == item.ID) {
                    groupName.text(item.GroupName);
                  }
                });

                // groupName.text()
              });
              $("#messagesBody").show();
            });
          });
        });
      });
      setFirstRun(false);
    }
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
              return (
                <>
                  <tr>
                    <td className="sender">{item.senderID}</td>
                    <td className="receiver">{item.userID}</td>
                    <td className="groupName">{item.groupID}</td>
                    <td>{item.Message}</td>
                    <td>{utils.formatDate(item.Messagedate)}</td>
                  </tr>
                </>
              )
            })}
          </tbody>
        </table>
      </div>
    </>
  );
}

export default Messages;
