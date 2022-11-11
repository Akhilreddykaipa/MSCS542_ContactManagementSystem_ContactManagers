import { useState, useEffect } from 'react';
import $ from 'jquery';
import "../css/Department.css";
const utils = require('../utils/utils.js');

const Department = (props) => {
  const [firstRun, setFirstRun] = useState(true);
  const [dprt, setDprt] = useState([]);
  const [sup, setSup] = useState([]);

  useEffect(() => {
    console.log("running effect");
    if (firstRun) {
      window.dbConnection.getDepartments().then((result) => {
        setDprt([...result]);
        console.log(result);
      });

      window.dbConnection.getSupervisors().then((result) => {
        setDprt([...result]);
        console.log(result);
      });
      // setFirstRun(false);
    }
  }, []);

  return (
    <>
      <div id="department" className="container">
        <h2>Department</h2>
        <hr/>
        <table className="table table-dark table-hover">
          <thead>
            <tr>
              <th scope="col">Department</th>
              <th scope="col">Supervisor</th>
            </tr>
          </thead>
          <tbody id="DepartmentBody">
            {dprt.map((item, i) => {
              return (
                <>
                  <tr>
                    <td >{item.DName}</td>
                    <td >{item.Supervisor_ID}</td>
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

export default Department;
