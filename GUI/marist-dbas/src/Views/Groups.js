import { useEffect, useState } from 'react';
import $ from 'jquery';
import "../css/Groups.css";
import backImg from "../images/groups.png";
const utils = require('../utils/utils.js');

const Groups = (props) => {
  const [userGroups, setUserGroups] = useState([]);
  const [groupData, setGroupData] = useState([]);

  let groupMems;
  let employeeID;
  let employees = [];
  let groupIDs = [];
  let groupDetails = [];
  let tmpUserGroups = [];

  useEffect(() => {
    window.dbConnection.getGroupMembers().then((result) => {
      groupMems = result;
      window.dbConnection.getEmployees().then((result) => {
        employees = result;
        employees.forEach((item, i) => {
          if (item.email === $("#userProfile p.userName").text()) {
            employeeID = item.ID;
          }
        });

        groupMems.forEach((groupMem, i) => {
          if (groupMem.UserID === employeeID) {
            let tmp = [];
            let tmpID = groupMem.GroupID;

            groupMems.forEach((item, i) => {
              if (tmpID === item.GroupID) {
                tmp.push(item.UserID);
              }
            });
            groupIDs.push({groupID: groupMem.ID, empIDs: tmp});
          }
        });

        window.dbConnection.getGroupDetails().then((result) => {
          groupDetails = result;
          let tmpEmp = [];
          let tmpGroup = [];
          groupIDs.forEach((group, i) => {
            group.empIDs.forEach((empID, i) => {
              employees.forEach((emp, i) => {
                if (empID === emp.ID) {
                  tmpEmp.push(emp.Fname + " " + emp.Lname);
                }
              });
            });

            groupDetails.forEach((groupDet, i) => {
              if (group.groupID === groupDet.GroupMembers_ID) {
                tmpGroup.push(groupDet);
              }
            });

            setUserGroups(tmpGroup);
            setGroupData(tmpEmp);
          });
        });
      });
    });
  }, []);

  const openBar = (el) => {
    $('#' + el + ' .collapsible').toggleClass('open');
  }

  return (
    <>
      <div id="contacts" className="container">
        <img src={backImg} className="backgroundImg"></img>
        <h2>Groups</h2>
        <hr/>
        <div id="groupContainer">
          {userGroups.map((item, i) => {
            return (
              <>
                <div id={item.ID} className="group" onClick={() =>  openBar(item.ID)}>
                  <h2>{item.GroupName}</h2>
                  <hr/>
                  <div className="collapsible open">
                  <p>Group Members:</p>
                  <hr/>
                  {groupData.map((group, i) => {
                    return (
                      <>
                        <ul className="list-group">
                          <li className="list-group-item  list-group-item-dark">{group}</li>
                        </ul>
                      </>
                    )
                  })}
                  </div>
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
