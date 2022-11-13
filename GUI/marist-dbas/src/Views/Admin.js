import { Link } from "react-router-dom";
import { useState } from 'react';
import "../css/Admin.css";

const Admin = (props) => {
  return (
    <>
      <div id="admin" className="container">
        <h1>Admin</h1>
        <hr/>
        <h2 className="sectionHeader">Actions:</h2>
        <div className="container">
          <div className="row">
            <div className="col">
              <button className="btn btn-primary adminBtn">
                <Link to="/createAccount">
                  <h4>Create new user</h4>
                </Link>
              </button>
            </div>
          </div>
          <div className="row">
            <div className="col">
              <button className="btn btn-danger adminBtn">
                <Link to="/deleteAccount">
                  <h4>Delete a user</h4>
                </Link>
              </button>
            </div>
          </div>
        </div>
        <hr/>
        <h2 className="sectionHeader">Edit:</h2>
        <div className="container">
          <div className="row">
            <div className="col">
              <button className="btn btn-primary adminBtn">
                <Link to="/editRelationshipTable">
                  <h4>Edit Relationship Table</h4>
                </Link>
              </button>
            </div>
          </div>
          <div className="row">
            <div className="col">
              <button className="btn btn-primary adminBtn">
                <Link to="/editGroupDetailsTable">
                  <h4>Edit GroupDetails Table</h4>
                </Link>
              </button>
            </div>
          </div>
          <div className="row">
            <div className="col">
              <button className="btn btn-primary adminBtn">
                <Link to="/editGroupMembersTable">
                  <h4>Edit GroupMembers Table</h4>
                </Link>
              </button>
            </div>
          </div>
          <div className="row">
            <div className="col">
              <button className="btn btn-primary adminBtn">
                <Link to="/editCertifiedTable">
                  <h4>Edit Certified Table</h4>
                </Link>
              </button>
            </div>
          </div>
          <div className="row">
            <div className="col">
              <button className="btn btn-primary adminBtn">
                <Link to="/editCertificationTable">
                  <h4>Edit Certifications Table</h4>
                </Link>
              </button>
            </div>
          </div>
          <div className="row">
            <div className="col">
              <button className="btn btn-primary adminBtn">
                <Link to="/editSupervisorTable">
                  <h4>Edit Supervisor Table</h4>
                </Link>
              </button>
            </div>
          </div>
          <div className="row">
            <div className="col">
              <button className="btn btn-primary adminBtn">
                <Link to="/editEmployeeTable">
                  <h4>Edit Employees table</h4>
                </Link>
              </button>
            </div>
          </div>
          <div className="row">
            <div className="col">
              <button className="btn btn-primary adminBtn">
                <Link to="/editUserTable">
                  <h4>Edit Users table</h4>
                </Link>
              </button>
            </div>
          </div>
          <div className="row">
            <div className="col">
              <button className="btn btn-primary adminBtn">
                <Link to="/editMessagesTable">
                  <h4>Edit Messages table</h4>
                </Link>
              </button>
            </div>
          </div>
          <div className="row">
            <div className="col">
              <button className="btn btn-primary adminBtn">
                <Link to="/editDepartmentTable">
                  <h4>Edit Department table</h4>
                </Link>
              </button>
            </div>
          </div>
          <div className="row">
            <div className="col">
              <button className="btn btn-primary adminBtn">
                <Link to="/editEmailHistoryTable">
                  <h4>Edit EmialHistory table</h4>
                </Link>
              </button>
            </div>
          </div>
        </div>
        <hr/>
      </div>
    </>
  );
};

export default Admin;
