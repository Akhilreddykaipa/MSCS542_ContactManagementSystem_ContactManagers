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
              <h4>Create a new user entry</h4>
              <button className="btn btn-primary">
                <Link to="/createAccount">Create new user</Link>
              </button>
            </div>
          </div>
          <div className="row">
            <div className="col">
              <h4>Delete a user entry</h4>
              <button className="btn btn-danger">
                <Link to="/deleteAccount">Delete a user</Link>
              </button>
            </div>
          </div>
        </div>
        <hr/>
        <h2 className="sectionHeader">Edit:</h2>
        <div className="container">
          <div className="row">
            <div className="col">
              <h4>Edit Relationship Table</h4>
              <button className="btn btn-primary">
                <Link to="/editRelationshipTable">Edit Relationship Table</Link>
              </button>
            </div>
          </div>
          <div className="row">
            <div className="col">
              <h4>Edit GroupDetails Table</h4>
              <button className="btn btn-primary">
                <Link to="/editGroupDetailsTable">Edit GroupDetails Table</Link>
              </button>
            </div>
          </div>
          <div className="row">
            <div className="col">
              <h4>Edit GroupDetails Table</h4>
              <button className="btn btn-primary">
                <Link to="/editGroupMembersTable">Edit GroupMembers Table</Link>
              </button>
            </div>
          </div>
          <div className="row">
            <div className="col">
              <h4>Edit Certified Table</h4>
              <button className="btn btn-primary">
                <Link to="/editCertifiedTable">Edit Certified Table</Link>
              </button>
            </div>
          </div>
          <div className="row">
            <div className="col">
              <h4>Edit Certifications Table</h4>
              <button className="btn btn-primary">
                <Link to="/editCertificationTable">Edit Certification Table</Link>
              </button>
            </div>
          </div>
          <div className="row">
            <div className="col">
              <h4>Edit Supervisor Table</h4>
              <button className="btn btn-primary">
                <Link to="/editSupervisorTable">Edit Supervisor Table</Link>
              </button>
            </div>
          </div>
          <div className="row">
            <div className="col">
              <h4>Edit Employees table</h4>
              <button className="btn btn-primary">
                <Link to="/editEmployeeTable">Edit Employee Table</Link>
              </button>
            </div>
          </div>
          <div className="row">
            <div className="col">
              <h4>Edit Users table</h4>
              <button className="btn btn-primary">
                <Link to="/editUserTable">Edit Users Table</Link>
              </button>
            </div>
          </div>
          <div className="row">
            <div className="col">
              <h4>Edit Messages table</h4>
              <button className="btn btn-primary">
                <Link to="/editMessagesTable">Edit Messages Table</Link>
              </button>
            </div>
          </div>
          <div className="row">
            <div className="col">
              <h4>Edit Department table</h4>
              <button className="btn btn-primary">
                <Link to="/editDepartmentTable">Edit Department Table</Link>
              </button>
            </div>
          </div>
          <div className="row">
            <div className="col">
              <h4>table editor</h4>
              <button className="btn btn-primary">
                <Link to="/test">table editor</Link>
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
