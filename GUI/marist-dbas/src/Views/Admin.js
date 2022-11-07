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
            <button className="btn btn-primary">
              <Link to="/createAccount">Create new user</Link>
            </button>
          </div>
        </div>
        <div className="row">
          <div className="col">
            <button className="btn btn-primary">
              <Link to="/editUser">Edit user</Link>
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default Admin;
