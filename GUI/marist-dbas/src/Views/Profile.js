import { useEffect, useState } from 'react';
import $ from 'jquery';
import "../css/Profile.css";
const utils = require('../utils/utils.js');

const Profile = (props) => {
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

  const setProfileData = (res) => {
    let keys = Object.keys(res)
    let tmp = {}
    keys.forEach((item, i) => {
      console.log(item);
      console.log(res[item]);
      tmp[item] = String(res[item]).length == 0 ? null : res[item];
    });
  }

  return (
    <>
      <div id="Profile" className="container">
        <h2>Profile</h2>
        <hr/>
        {employees.map((item, i) => {
          return (
            <>
              <div className="row">
                <div className="col-2">
                  <div>First Name<span className="float-end">:</span></div>
                  <hr/>
                </div>
                <div className="col-10">
                  <div>{item.Fname}</div>
                  <hr/>
                </div>
              </div>
              <div className="row">
                <div className="col-2">
                  <div>Last Name<span className="float-end">:</span></div>
                  <hr/>
                </div>
                <div className="col-10">
                  <div>{item.Lname}</div>
                  <hr/>
                </div>
              </div>
              <div className="row">
                <div className="col-2">
                  <div>Email<span className="float-end">:</span></div>
                  <hr/>
                </div>
                <div className="col-10">
                  <div>{item.email}</div>
                  <hr/>
                </div>
              </div>
              <div className="row">
                <div className="col-2">
                  <div>Phone Number<span className="float-end">:</span></div>
                  <hr/>
                </div>
                <div className="col-10">
                  <div>{item.phoneNum}</div>
                  <hr/>
                </div>
              </div>
              <div className="row">
                <div className="col-2">
                  <div>Work Number<span className="float-end">:</span></div>
                  <hr/>
                </div>
                <div className="col-10">
                  <div>{item.WorkNum}</div>
                  <hr/>
                </div>
              </div>
              <div className="row">
                <div className="col-2">
                  <div>Gender<span className="float-end">:</span></div>
                  <hr/>
                </div>
                <div className="col-10">
                  <div>{item.gender}</div>
                  <hr/>
                </div>
              </div>
              <div className="row">
                <div className="col-2">
                  <div>Gender<span className="float-end">:</span></div>
                  <hr/>
                </div>
                <div className="col-10">
                  <div>{item.gender}</div>
                  <hr/>
                </div>
              </div>
            </>
          )
        })}
      </div>
    </>
  );
};

export default Profile;
