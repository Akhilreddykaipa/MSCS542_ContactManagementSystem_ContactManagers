import { Link } from "react-router-dom";
import { useState, useEffect } from 'react';
import $ from 'jquery';
import "../css/CreateContact.css";

const CreateContact = (props) => {
  const [employees, setEmployees] = useState([]);
  const [contactVal, setContactVal] = useState("-");
  let contacts;

  useEffect(() => {
      window.dbConnection.getEmployees().then((result) => {
        setEmployees([...result]);
      });

      $(document).ready(() => {
        $(".defOp").attr("disabled", "");
      });
  }, []);

  function handleSubmit(e) {
    e.preventDefault();
    console.log(employees);
    let userID = null;

    employees.forEach((emp, i) => {
      if (emp.email ==  $("#userProfile .userName").text()) {
        console.log(emp);
        userID = emp.ID;
      }
    });

    window.dbConnection.getContacts().then((result) => {
      contacts = result;
      console.log(contacts);
      let err = false;

      // if (!err) {
        if (contacts.length > 0) {
          console.log("checking contacts");
          contacts.forEach((item, i) => {
            console.log(item);
            console.log(item.user2ID, $("#userToAdd").val());

            if (item.user2ID == $("#userToAdd").val()) {
              console.log("error!!!!!", item);
              $("#createContact .errorMessage").addClass("active");
              setTimeout(() => {
                $("#createContact .errorMessage").removeClass("active");
              }, 4000);
              err = true;
            }
          });
        } else {
          console.log("no contacts, making one");
          window.dbConnection.createContact({
            user1ID: userID,
            user2ID: $("#userToAdd").val(),
            Rstatus: "active"
          }).then((result) => {
            console.log(result);
          });

          $("#createContact .successMessage").addClass("active");
          setTimeout(() => {
            $("#createContact .successMessage").removeClass("active");
          }, 4000);
        }

        if (!err) {
          window.dbConnection.createContact({
            user1ID: userID,
            user2ID: $("#userToAdd").val(),
            Rstatus: "active"
          }).then((result) => {
            console.log(result);
          });

          $("#createContact .successMessage").addClass("active");
          setTimeout(() => {
            $("#createContact .successMessage").removeClass("active");
          }, 4000);
        }
    });
  }

  return (
    <>
      <div id="contacts" className="container">
        <div className="container">
          <button id="backButton" className="btn btn-warning">
            <Link to="/contacts">&lt; Back</Link>
          </button>
        </div>
        <div id="createContact" className="container">
          <div>
            <div className="header">Create new contact</div>
            <div className="resultMessages">
              <p className="successMessage">Successfully created contact</p>
              <p className="errorMessage">This contact already exists!</p>
            </div>
            <form id="createAccountForm" onSubmit={handleSubmit} >
              <div>
                <div>
                  <label>Add user:</label>
                </div>
                <div>
                  <select id="userToAdd" className="fullWidth mb-3" onChange={(e) => setContactVal(e.target.value)}  required>
                    <option className="defOp" defaultValue>-</option>
                    {employees.map((item, i) => {
                      return (
                        <>
                          <option value={item.ID} id={item.ID}>{(item.Fname == null ? "" : item.Fname) + " " + (item.Lname == null ? "" : item.Lname)}</option>
                        </>
                      )
                    })}
                  </select>
                </div>
              </div>
              <div>
                <button className="btn-primary btn">Create contact</button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default CreateContact;
