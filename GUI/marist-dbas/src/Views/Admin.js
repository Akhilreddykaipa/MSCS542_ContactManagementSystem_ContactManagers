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
            <p>Edit existing user data</p>
            <button className="btn btn-primary">
              <Link to="/editUser">Edit user</Link>
            </button>
          </div>
        </div>
        <hr/>
      </div>
    </>
  );
};

export default Admin;
