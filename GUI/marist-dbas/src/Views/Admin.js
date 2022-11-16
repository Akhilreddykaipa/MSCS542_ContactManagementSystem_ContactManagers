import { Link } from "react-router-dom";
import { useState } from 'react';
import backImg from "../images/admin.jpg";
import "../css/Admin.css";

const Admin = (props) => {
  return (
    <>
      <div id="admin" className="container">
        <img src={backImg} className="backgroundImg"></img>
        <h1>Admin</h1>
        <hr/>
        <h2 className="sectionHeader">Actions:</h2>
        <div className="container">
          <div className="row">
            <div className="col">
              <Link to="/createAccount">
                <button className="btn btn-primary adminBtn">
                  <h4>Create new user</h4>
                </button>
              </Link>
            </div>
          </div>
          <div className="row">
            <div className="col">
              <Link to="/deleteAccount">
                <button className="btn btn-danger adminBtn">
                  <h4>Delete a user</h4>
                </button>
              </Link>
            </div>
          </div>
        </div>
        <hr/>
        <h2 className="sectionHeader">Edit:</h2>
        <div className="container">
          <div className="row">
            <div className="col">
              <Link to="/editRelationshipTable">
                <button className="btn btn-primary adminBtn">
                  <h4>Edit Relationship Table</h4>
                </button>
              </Link>
            </div>
          </div>
          <div className="row">
            <div className="col">
              <Link to="/editGroupDetailsTable">
                <button className="btn btn-primary adminBtn">
                  <h4>Edit GroupDetails Table</h4>
                </button>
              </Link>
            </div>
          </div>
          <div className="row">
            <div className="col">
              <Link to="/editGroupMembersTable">
                <button className="btn btn-primary adminBtn">
                  <h4>Edit GroupMembers Table</h4>
                </button>
              </Link>
            </div>
          </div>
          <div className="row">
            <div className="col">
              <Link to="/editCertifiedTable">
                <button className="btn btn-primary adminBtn">
                  <h4>Edit Certified Table</h4>
                </button>
              </Link>
            </div>
          </div>
          <div className="row">
            <div className="col">
              <Link to="/editCertificationTable">
                <button className="btn btn-primary adminBtn">
                  <h4>Edit Certifications Table</h4>
                </button>
              </Link>
            </div>
          </div>
          <div className="row">
            <div className="col">
              <Link to="/editSupervisorTable">
                <button className="btn btn-primary adminBtn">
                  <h4>Edit Supervisor Table</h4>
                </button>
              </Link>
            </div>
          </div>
          <div className="row">
            <div className="col">
              <Link to="/editEmployeeTable">
                <button className="btn btn-primary adminBtn">
                  <h4>Edit Employees table</h4>
                </button>
              </Link>
            </div>
          </div>
          <div className="row">
            <div className="col">
              <Link to="/editUserTable">
                <button className="btn btn-primary adminBtn">
                  <h4>Edit Users table</h4>
                </button>
              </Link>
            </div>
          </div>
          <div className="row">
            <div className="col">
              <Link to="/editMessagesTable">
                <button className="btn btn-primary adminBtn">
                  <h4>Edit Messages table</h4>
                </button>
              </Link>
            </div>
          </div>
          <div className="row">
            <div className="col">
              <Link to="/editDepartmentTable">
                <button className="btn btn-primary adminBtn">
                  <h4>Edit Department table</h4>
                </button>
              </Link>
            </div>
          </div>
          <div className="row">
            <div className="col">
              <Link to="/editEmailHistoryTable">
                <button className="btn btn-primary adminBtn">
                  <h4>Edit EmialHistory table</h4>
                </button>
              </Link>
            </div>
          </div>
        </div>
        <hr/>
      </div>
    </>
  );
};

export default Admin;
