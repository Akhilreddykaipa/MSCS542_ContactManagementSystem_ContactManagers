import { Link } from "react-router-dom";
import Dashboard from "./Dashboard";
import CreateAccount from "./CreateAccount";
import $ from 'jquery';
import validate from 'jquery-validation'
import "../css/Login.css";
// const dbc = require('../server/db');
// console.log(dbc.db);

let password = "1";

const Login = (props) => {
  function handleSubmit(e) {
    e.preventDefault();
    $("#loginForm").validate({

    });

    if ($("#password").val() == password) {
      props.loggedIn(true);
      props.setName($("#name").val());
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
          <form id="loginForm" onSubmit={handleSubmit} >
            <div>
              <div>
                <label>Name</label>
              </div>
              <div>
                <input id="name" name="name" className="fullWidth mb-3" label="name" type="text" required></input>
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
              <button className="btn-primary btn" type="submit" onClick={window.dbConnection.checkLogin("test1", "test2")}>Login</button>
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
