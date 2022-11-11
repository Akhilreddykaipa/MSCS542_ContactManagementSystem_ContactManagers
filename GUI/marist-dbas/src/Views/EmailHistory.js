import { useState, useEffect } from 'react';
import $ from 'jquery';
import "../css/EmailHistory.css";
const utils = require('../utils/utils.js');

const EmailHistory = (props) => {
  const [emails, setEmails] = useState([]);
  const [firstRun, setFirstRun] = useState(true);

  useEffect(() => {
    if (firstRun) {
      window.dbConnection.getEmailHistory().then((result) => {
        setEmails([...result]);
      });
      window.dbConnection.getEmployees().then((result) => {
        let employeeData = result;
        window.dbConnection.getEmployeeIDs({
          email: $("#userProfile .userName").text()
        }).then((result) => {
          $(document).ready(() => {
            $("#EmailHistoryBody tr").each((i, el) => {
              let sender = $(el).find(".sender");
              // let receiver = $(el).find(".receiver");
              if (sender.text() == result[0].ID) {
                sender.text(result[0].Fname + " " + result[0].Lname);
                employeeData.forEach((item, i) => {
                  for (let i = 0; i < Object.keys(item).length; i++) {
                    let key = Object.keys(item)[i];
                    if (item[key] === null) item[key] = "";
                  }
                  // if (receiver.text() == item.ID) receiver.text(item.Fname + " " + item.Lname);
                });
              } //else if (receiver.text() == result[0].ID) {
                // receiver.text(result[0].Fname + " " + result[0].Lname);
                // employeeData.forEach((item, i) => {
                //   for (let i = 0; i < Object.keys(item).length; i++) {
                //     let key = Object.keys(item)[i];
                //     if (item[key] === null) item[key] = "";
                //   }
                //   if (sender.text() == item.ID) sender.text(item.Fname + " " + item.Lname);
                // });
              /*}*/ else {
                $(el).remove();
              }
              $("#EmailHistoryBody").show();
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
        <h2>Email History</h2>
        <hr/>
        <table className="table table-dark table-hover">
          <thead>
            <tr>
              <th scope="col">Sender</th>
              <th scope="col">Receiver</th>
              <th scope="col">Email Message</th>
              <th scope="col">Email Date</th>
            </tr>
          </thead>
          <tbody id="EmailHistoryBody">
            {emails.map((item, i) => {
              return (
                <>
                  <tr>
                    <td className="sender">{item.SenderID}</td>
                    <td className="receiver">{item.ReceiverID}</td>
                    <td>{item.Message}</td>
                    <td>{utils.formatDate(item.EmailDate)}</td>
                  </tr>
                </>
              )
            })}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default EmailHistory;
