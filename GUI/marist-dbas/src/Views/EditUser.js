import { Link } from "react-router-dom";
import { useState } from 'react';
import "../css/EditUser.css";

const EditUser = (props) => {
  return (
    <>
      <div className="container">
        <button id="backButton" className="btn btn-warning">
          <Link to="/admin">&lt; Back</Link>
        </button>
      </div>
      <div id="editUser" className="container">
        <h2>EditUser</h2>
        <hr/>
        <div>
        <table className="table table-dark table-hover">
          <thead>
            <tr>
              <th scope="col">User Login</th>
              <th scope="col">User Password</th>
              <th scope="col">User Email</th>
              <th scope="col">User Type</th>
              <th scope="col">Login Key</th>
              <th scope="col">Employees ID</th>
            </tr>
          </thead>
          <tbody>

          </tbody>
        </table>

        </div>
      </div>
    </>
  );
};

export default EditUser;
