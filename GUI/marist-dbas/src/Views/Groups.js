import { useEffect, useState } from 'react';
import $ from 'jquery';
import "../css/Groups.css";
const utils = require('../utils/utils.js');

const Groups = (props) => {
  const [employees, setEmployees] = useState([]);
  const [data, setData] = useState([]);

  useEffect(() => {
    window.dbConnection.getEmployeeIDs({
      email: $("#userProfile .userName").text()
    }).then((result) => {
      setEmployees([...result]);
      console.log(result);
      setProfileData(result[0]);
    });
  }, []);

  return (
    <>
      <div id="contacts" className="container">
        <h2>Groups</h2>
        <hr/>
        <div id="groupContainer">
          <div className="group">

          </div>
          <div className="group">

          </div>
        </div>
      </div>
    </>
  );
};

export default Groups;
