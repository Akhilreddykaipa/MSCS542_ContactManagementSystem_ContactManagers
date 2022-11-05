import { useState, useEffect } from 'react';
import $ from 'jquery';
import "../css/Messages.css";

const MessagesCells = (props) => {
  let sender, receiver, group, message, timstamp;
  return (
    <>
      <tr>
        <th scope="row"></th>
        {console.log(props.rows)}
        <td>{props.rows}</td>
        <td>
          <button className="btn btn-warning">
            Edit
          </button>
        </td>
        <td>
          <button className="btn btn-danger">
            Delete
          </button>
        </td>
      </tr>
    </>
  );
}

const Messages = (props) => {
  const [messages, setMessages] = useState(null);

  useEffect(() => {
    getMessages();
  }, []);

  function getMessages(e) {
    // e.preventDefault();
    window.dbConnection.getMessages().then((result) => {
    console.log(result);
      setMessages([...result]);

      result.forEach((item, i) => {
        console.log(item);
        $("#messagesBody").append('<tr>' +
          '<td>' + item.senderID + '</td>' +
          '<td>' + item.userID + '</td>' +
          '<td>' + item.groupID + '</td>' +
          '<td>' + item.Message + '</td>' +
          '<td>' + item.Messagedate + '</td>' +
          '</tr>');
      })
    });
  }

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
              <th scope="col">Timestamp</th>
            </tr>
          </thead>
          <tbody id="messagesBody">

          </tbody>
        </table>
      </div>
    </>
  );
};

export default Messages;
