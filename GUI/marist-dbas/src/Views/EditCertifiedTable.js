import { Link } from "react-router-dom";
import { useEffect, useState } from 'react';
import TableEditor from "./TableEditor";
import $ from 'jquery';
import "../css/EditCertifiedTable.css";
const utils = require('../utils/utils.js');

const EditCertifiedTable = (props) => {
  const [certified, setCertified] = useState([]);
  const [firstRun, setFirstRun] = useState(true);
  const [showEdit, setShowEdit] = useState(false);
  const [colDat, setColDat] = useState(null);
  const [headers, setHeaders] = useState([]);

  useEffect(() => {
    getCertifiedData();
  }, []);

  const getCertifiedData = () => {
    window.dbConnection.getCertified().then((result) => {
      console.log(result);
      setCertified(result);
      let keys = Object.keys(result[0]);
      setHeaders([...keys]);
    });
  }

  const submitEdit = (arg) => {
    window.dbConnection.setCertified({
      ID: arg.ID,
      UserID: arg.UserID,
      CertificationID: arg.CertificationID,
      CertDate: utils.formatDate(arg.CertDate)
    }).then((result) => {
      console.log(result);
      $(".successMessage").addClass("active");
      getCertifiedData();
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
      <div id="EditCertifiedTable" className="container">
        <h1>Edit Certified Table</h1>
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
                <th scope="col">UserID</th>
                <th scope="col">CertificationID</th>
                <th scope="col">CertDate</th>
                <th scope="col">Edit</th>
              </tr>
            </thead>
            <tbody id="certificationBody">
              {certified.map((attr) => {
                console.log(attr)
                return (
                  <>
                    <tr id={attr.ID}>
                      <td>{attr.ID}</td>
                      <td>{attr.UserID}</td>
                      <td>{attr.CertificationID}</td>
                      <td>{utils.formatDate(attr.CertDate)}</td>
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

export default EditCertifiedTable;
