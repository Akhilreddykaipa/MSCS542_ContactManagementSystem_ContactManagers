import { useEffect, useState } from 'react';
import $ from 'jquery';
import "../css/TableEditor.css";
const utils = require('../utils/utils.js');

const TableEditor = (props) => {
  const [tableHeaders, setTableHeaders] = useState(props.tableData);
  const [tableData, setTableData] = useState(props.rows);

  useEffect(() => {
    if (props.show) {
      $("#editContainer").show();
    } else {
      $("#editContainer").hide();
    }

    setTableHeaders(props.tableData);

    $(document).ready(() => {
      for (let i = 0; i < tableHeaders.length; i++) {
        let key = tableHeaders[i];
        console.log(key);
        console.log(props.rows);
        console.log(props.rows[key]);
        $("#editValues .init." + key).text(props.rows[key]);
        $("#insertValues .insert." + key + " input").val(props.rows[key]);
      }
    });
  });

  const cancel = () => {
    props.setShow(false);
  }

  const submit = () => {
    let res = {};
    for (const keys of tableHeaders) {
      res[keys] = $(".insert." + keys + " input").val();
    }
    props.submit(res);
  }

  return (
    <>
      <div className="rel">
        <div id="editContainer" className="container">
          <div>
            <div className="close">
              <div className="">
                <button className="btn btn-secondary" onClick={cancel}>X</button>
              </div>
            </div>
            <div className="row">
              <h2>Update data in {props.tableName} table</h2>
              <div className="resultMessages">
                <p className="successMessage">Successfully updated data</p>
                <p className="errorMessage"></p>
              </div>
              <hr/>
              <div id="originalData" className="col-6">
                <h2>Original {props.tableName} Data</h2>
                <div className="row">
                  <div className="col-3">
                    {props.tableData.map((item) => {
                      return (
                        <>
                          <hr/>
                          <div>{item}</div><span>:</span>
                        </>
                      )
                    })}
                    <hr/>
                  </div>
                  <div id="editValues" className="col-8">
                    {props.tableData.map((item) => {
                      return (
                        <>
                          <hr/>
                          <div className={`init ${item}`}></div>
                        </>
                      )
                    })}
                    <hr/>
                  </div>
                </div>
              </div>
              <div id="newData" className="col-6">
                <h2>New {props.tableName} Data</h2>
                <div className="row">
                  <div className="col-3">
                    {props.tableData.map((item) => {
                      return (
                        <>
                          <hr/>
                          <div>{item}</div><span>:</span>
                        </>
                      )
                    })}
                    <hr/>
                  </div>
                  <div id="insertValues" className="col-8">
                    {props.tableData.map((item) => {
                      return (
                        <>
                          <hr/>
                          <div className={`insert ${item}`}><input type="text"></input></div>
                        </>
                      )
                    })}
                    <hr/>
                  </div>
                </div>
              </div>
            </div>
            <hr/>
            <div className="action">
              <div>
                <button className="btn btn-warning cancel" onClick={cancel}>Discard Changes</button>
                <button className="btn btn-primary" onClick={submit}>Save Changes</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default TableEditor;
