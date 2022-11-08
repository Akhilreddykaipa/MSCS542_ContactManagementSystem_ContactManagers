import { Link } from "react-router-dom";
import { useState } from 'react';
import "../css/Admin.css";

const Admin = (props) => {
  return (
    <>
      <div id="admin" className="container">
        <h2>Admin</h2>
        <hr/>
        <div className="row">
          <div className="col">
            <p>Create a new user entry</p>
            <button className="btn btn-primary">
              <Link to="/createAccount">Create new user</Link>
            </button>
          </div>
        </div>
        <hr/>
        <div className="row">
          <div className="col">
            <p>Edit data in Employees table</p>
            <button className="btn btn-primary">
              <Link to="/editEmployeeTable">Edit Employee Table</Link>
            </button>
          </div>
        </div>
        <hr/>
        <div className="row">
          <div className="col">
            <p>Edit data in Users table</p>
            <button className="btn btn-primary">
              <Link to="/editUserTable">Edit Users Table</Link>
            </button>
          </div>
        </div>
        <hr/>
        <div className="row">
          <div className="col">
            <p>Edit data in Messages table</p>
            <button className="btn btn-primary">
              <Link to="/editMessagesTable">Edit Messages Table</Link>
            </button>
          </div>
        </div>
        <hr/>
      </div>
    </>
  );
};

export default Admin;
