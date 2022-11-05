import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import $ from 'jquery';
import validate from 'jquery-validation'
import "../css/Login.css";

let password = "1";

const Login = (props) => {
  function handleSubmit(e) {
    e.preventDefault();
    window.dbConnection.checkLogin({
      userEmail: $("#userEmail").val(),
      password: $("#password").val()
    }).then((result) => {
      console.log("authenticated?", result);
      if (result) {
        props.loggedIn(true);
        props.setUserEmail($("#userEmail").val());
      }
    });
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
          </form>
        </div>
      </div>
    </>
  );
};

export default Login;
