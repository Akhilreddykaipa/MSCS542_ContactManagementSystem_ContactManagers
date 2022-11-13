import { Link } from "react-router-dom";
import { useEffect, useState } from 'react';
import TableEditor from "./TableEditor";
import $ from 'jquery';
import "../css/EditCertificationTable.css";
const utils = require('../utils/utils.js');

const EditCertificationTable = (props) => {
  const [certification, setCertification] = useState([]);
  const [firstRun, setFirstRun] = useState(true);
  const [showEdit, setShowEdit] = useState(false);
  const [colDat, setColDat] = useState(null);
  const [headers, setHeaders] = useState([]);

  useEffect(() => {
    getCertificationData();
  }, []);

  const getCertificationData = () => {
    window.dbConnection.getCertifications().then((result) => {
      setCertification(result);
      let keys = Object.keys(result[0]);
      setHeaders([...keys]);
    });
  }

  const submitEdit = (arg) => {
    window.dbConnection.setCertifications({
      ID: arg.ID,
      Name: arg.Name,
      Type: arg.Type,
    }).then((result) => {
      $(".successMessage").addClass("active");
      getCertificationData();
      setShowEdit(false);
      setTimeout(() => {
        $(".successMessage").removeClass("active");
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
      <div id="EditCertificationTable" className="container">
        <h1>Edit Certification Table</h1>
        <div className="resultMessages">
          <p className="successMessage">Successfully updated data</p>
          <p className="errorMessage"></p>
        </div>
        <hr/>
        <div id="CertificationTable">
          <TableEditor
            key={utils.newID()}
            tableName={"Certification"}
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
                <th scope="col">Name</th>
                <th scope="col">Type</th>
                <th scope="col">Certified_ID</th>
                <th scope="col">Edit</th>
              </tr>
            </thead>
            <tbody id="certificationBody">
              {certification.map((attr) => {
                return (
                  <>
                    <tr id={attr.ID}>
                      <td>{attr.ID}</td>
                      <td>{attr.Name}</td>
                      <td>{attr.Type}</td>
                      <td>{attr.Certified_ID}</td>
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

export default EditCertificationTable;
