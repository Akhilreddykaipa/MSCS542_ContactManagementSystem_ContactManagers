import { Link } from "react-router-dom";
import { useState, useEffect } from 'react';
import $ from 'jquery';
import "../css/Contacts.css";

const Contacts = (props) => {
  const [cont, setCont] = useState([]);
  let contacts = [];
  let employees, empID;
  let contList = [];

  useEffect(() => {
      window.dbConnection.getContacts().then((result) => {
        contacts = result;
        // setCont([...result]);
        console.log(contacts);

        window.dbConnection.getEmployees().then((result) => {
          employees = result;
          console.log(employees);

          employees.forEach((emp, i) => {
            if (emp.email == $("#userProfile .userName").text()) {
              console.log("match", emp);
              empID = emp;
            }
          });

          contacts.forEach((cont, i) => {
            employees.forEach((emp, i) => {
              if (cont.user2ID == emp.ID) {
                contList.push(emp);
              }
            });
          });
          console.log(contList);
          setCont([...contList]);
        });
      });
  }, []);

  const handleDelete = (el) => {
    console.log(el);
    window.dbConnection.deleteContact({
      user2ID: el
    }).then((result) => {
      console.log(result);
    });

    cont.forEach((item, i) => {
      // if (item.ID == el) {
        let tmp = cont;
        tmp = tmp.filter(tmp => tmp.ID != el);
        setCont(tmp);
      // }
    });

    console.log(cont);
  }

  return (
    <>
      <div id="contacts" className="container">
        <h2>Contacts</h2>
        <hr/>
        {cont.map((el, i) => {
          console.log(el)
          return (
            <>
            <div id={el.ID} className="contactWrapper row">
              <div className="contact col">
                <div className="row">
                  <div className="col-3">Name<span className="float-end">:</span></div>
                  <div className="col-9">{el.Fname + " " + el.Lname}</div>
                </div>
                <hr/>
                <div className="row">
                  <div className="col-3">Email<span className="float-end">:</span></div>
                  <div className="col-9">{el.email}</div>
                </div>
                <hr/>
                <div className="row">
                  <div className="col-3">Phone Number<span className="float-end">:</span></div>
                  <div className="col-9">{el.phoneNum}</div>
                </div>
                <hr/>
                <div className="row">
                  <div className="col-3">Work Number<span className="float-end">:</span></div>
                  <div className="col-9">{el.WorkNum}</div>
                </div>
                <hr/>
                <div className="row">
                  <div className="col-3">Gender<span className="float-end">:</span></div>
                  <div className="col-9">{el.gender}</div>
                </div>
                <hr/>
                <div className="row mb-0">
                  <div className="col-3">Age<span className="float-end">:</span></div>
                  <div className="col-9">{el.age}</div>
                </div>
                <hr/>
                <div className="float-end">
                  <button className="btn btn-danger" onClick={() => handleDelete(el.ID)}>Delete</button>
                </div>
              </div>
            </div>
            <hr/>
            </>
          )
        })}
        <Link to="/createContact">
          <button className="btn btn-primary">Create new Contact</button>
        </Link>
      </div>
    </>
  );
};

export default Contacts;
