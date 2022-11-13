import { Link } from "react-router-dom";
import { useEffect, useState } from 'react';
import TableEditor from "./TableEditor";
import $ from 'jquery';
import "../css/EditRelationshipTable.css";
const utils = require('../utils/utils.js');

const EditRelationshipTable = (props) => {
  const [relationship, setRelationship] = useState([]);
  const [firstRun, setFirstRun] = useState(true);
  const [showEdit, setShowEdit] = useState(false);
  const [colDat, setColDat] = useState(null);
  const [headers, setHeaders] = useState([]);

  useEffect(() => {
    getRelationshipData();
  }, []);

  const getRelationshipData = () => {
    window.dbConnection.getContacts().then((result) => {
      console.log(result);
      setRelationship(result);
      let keys = Object.keys(result[0]);
      setHeaders([...keys]);
    });
  }

  const submitEdit = (arg) => {
    window.dbConnection.setContacts({
      ID: arg.ID,
      user1ID: arg.user1ID,
      user2ID: arg.user2ID,
      Rstatus: arg.Rstatus,
      Rdate: arg.Rdate,
    }).then((result) => {
      console.log(result);
      $(".successMessage").addClass("active");
      getRelationshipData();
      setShowEdit(false);
      setTimeout(() => {
        $("#EditRelationshipTable .successMessage").removeClass("active");
      }, 4000);
    });
  }

  const handleEdit = (data) => {
    setColDat(data);
    setShowEdit(true);
  }

  return (
    <>
      <div className="container">
        <button id="backButton" className="btn btn-warning">
          <Link to="/admin">&lt; Back</Link>
        </button>
      </div>
      <div id="EditRelationshipTable" className="container">
        <h1>Edit Relationship Table</h1>
        <div className="resultMessages">
          <p className="successMessage">Successfully updated data</p>
          <p className="errorMessage"></p>
        </div>
        <hr/>
        <div id="RelationshipTable">
          <TableEditor
            key={utils.newID()}
            tableName={"Relationship"}
            show={showEdit}
            setShow={setShowEdit}
            submit={submitEdit}
            tableData={headers}
            rows={colDat}
          />
          <table className="table table-dark table-hover">
            <thead>
              <tr>
                <th scope="col">ID</th>
                <th scope="col">user1ID</th>
                <th scope="col">user2ID</th>
                <th scope="col">Rstatus</th>
                <th scope="col">Rdate</th>
                <th scope="col">Edit</th>
              </tr>
            </thead>
            <tbody id="relationshipBody">
              {relationship.map((attr) => {
                return (
                  <>
                    <tr id={attr.ID}>
                      <td>{attr.ID}</td>
                      <td>{attr.user1ID}</td>
                      <td>{attr.user2ID}</td>
                      <td>{attr.Rstatus}</td>
                      <td>{utils.formatDate(attr.Rdate)}</td>
                      <td><button className="btn btn-warning" onClick={() => handleEdit(attr)}>Edit</button></td>
                    </tr>
                  </>
                )
              })}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
};

export default EditRelationshipTable;
