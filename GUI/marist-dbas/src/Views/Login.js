import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import $ from 'jquery';
import validate from 'jquery-validation'
import "../css/Login.css";

let password = "1";

const Login = (props) => {
  useEffect(() => {
    console.log(window.checkLogin);
    // ipcRenderer.send('app-start', 'starting application');
    // window.dbConnection.checkLogin(
    //   {
    //     name: $("#name").val(),
    //     password: $("#password").val()
    //   }
    // );
  });

  function handleSubmit(e) {
    e.preventDefault();

    // $("#loginForm").validate({
    //   // submitHandler: function(form) {
    //   //   console.log('validating form');
    //   // }
    // });
    let test123 = window.dbConnection.checkLogin(
      {
        userEmail: $("#userEmail").val(),
        password: $("#password").val()
      }
    );

    console.log(test123);

    if ($("#password").val() === password) {
      props.loggedIn(true);
      props.setUserEmail($("#userEmail").val());
    }
  }

  function togglePassword(e) {
    let inputType = $("#password").attr("type");
    if (inputType === "text") {
      $("#password").attr("type", "password");
    } else {
      $("#password").attr("type", "text");
    }

    let inputTypeLabel = $("label.password-helper").text();
    if (inputTypeLabel === "Show password") {
      $("label.password-helper").text("Hide password");
    } else {
      $("label.password-helper").text("Show password");
    }
  }

  function createAccount() {
    props.createAccount(true);
  }

  return (
    <>
      <div id="login" className="container">
        <div>
          <h4 id="loginTitle" className="text-start">Marist DBAs</h4>
          <div className="header">
            Sign in
          </div>
          <form id="loginForm" onSubmit={handleSubmit}>
            <div>
              <div>
                <label>Name</label>
              </div>
              <div>
                <input id="userEmail" name="userEmail" className="fullWidth mb-3" label="userEmail" type="text" required></input>
              </div>
              <div>
                <label>Password</label>
              </div>
              <div>
                <input id="password" name="password" className="fullWidth" label="password" type="password" required></input>
              </div>
              <div>
                <input type="checkbox" onClick={togglePassword}></input>
                <label className="password-helper">Show password</label>
              </div>
            </div>
            <div>
              <button className="btn-primary btn" type="submit">Login</button>
            </div>
            <div id="newAccount">
              <Link onClick={createAccount}>Create new account</Link>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default Login;
