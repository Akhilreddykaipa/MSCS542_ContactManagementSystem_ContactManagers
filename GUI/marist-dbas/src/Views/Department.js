import { useState, useEffect } from 'react';
import $ from 'jquery';
import "../css/Department.css";
const utils = require('../utils/utils.js');

const Department = (props) => {
  const [dprt, setDprt] = useState([]);
  const [sup, setSup] = useState([]);
  const [emp, setEmp] = useState([]);
  let supervisors;
  let employees;

  useEffect(() => {
    window.dbConnection.getDepartments().then((result) => {
      setDprt([...result]);
      console.log(result);

      window.dbConnection.getSupervisors().then((result) => {
        setSup([...result]);
        supervisors = result;
        console.log(result);

        window.dbConnection.getEmployees().then((result) => {
          console.log("res",result);
          setEmp([...result]);
          employees = result;
          console.log("sup", sup);

          $(document).ready(function() {
            $("#departmentBody tr .supervisorID").each(function(i, el) {
              supervisors.forEach((supervisor, i) => {
                if (Number($(el).text()) === supervisor.ID) {
                  employees.forEach((res, j) => {
                    if (supervisor.UserID === res.ID) {
                      $(this).text(res.Fname + " " + res.Lname);
                    }
                  });
                }
              });
            });
          });
        });
      });
    });
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
          <tbody id="departmentBody">
            {dprt.map((item, i) => {
              return (
                <>
                  <tr>
                    <td >{item.DName}</td>
                    <td className="supervisorID">{item.Supervisor_ID}</td>
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
