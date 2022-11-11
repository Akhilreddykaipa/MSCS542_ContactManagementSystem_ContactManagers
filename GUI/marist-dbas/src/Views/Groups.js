import { useEffect, useState } from 'react';
import $ from 'jquery';
import "../css/Groups.css";
const utils = require('../utils/utils.js');

const Groups = (props) => {
  const [employees, setEmployees] = useState([]);
  const [data, setData] = useState([]);
  const [groupMembers, setGroupMembers] = useState([]);
  const [groups, setGroups] = useState([]);
  const [userGroups, setUserGroups] = useState([]);

  useEffect(() => {
    window.dbConnection.getGroupMembers().then((result) => {
      setGroupMembers([...result]);
      console.log(result);
      let groupMems = result;

        window.dbConnection.getEmployeeIDs({
          email: $("#userProfile .userName").text()
        }).then((result) => {
          console.log(result);
          let employeeID = result[0].ID;

          console.log(employeeID);
          groupMems.forEach((item, i) => {
            console.log(item.UserID, employeeID);
            if (item.UserID === employeeID) {
              console.log("got match");
              let tmp = groups;
              tmp.push(item.GroupID);
              setGroups(tmp);
            }
          });
          console.log(groups);

          window.dbConnection.getGroupDetails().then((result) => {
            let tmp = [];
            result.forEach((item, i) => {
              groups.forEach((group, j) => {
                if (item.ID === group[j]) {
                  console.log(item.GroupName);
                  tmp.push(item.)
                }
              });
            });

            console.log(result);
            // setUserGroups(result);
          });
        });
      });
  }, []);

  return (
    <>
      <div id="contacts" className="container">
        <h2>Groups</h2>
        <hr/>
        <div id="groupContainer">
          {userGroups.map((item, i) => {
            return (
              <>
                <div className="group">
                  <h2>{item.GroupName}</h2>
                </div>
              </>
            )
          })}
        </div>
      </div>
    </>
  );
};

export default Groups;
