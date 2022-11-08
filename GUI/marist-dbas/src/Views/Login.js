import $ from 'jquery';
import "../css/Login.css";
const utils = require('../utils/utils.js');

const Login = (props) => {
  function handleSubmit(e) {
    e.preventDefault();
    window.dbConnection.checkLogin({
      userEmail: $("#userEmail").val(),
      password: $("#password").val()
    }).then((result) => {
      console.log(result);
      if (result.authenticated) {
        props.setAdmin(result.admin);
        props.loggedIn(true);
        props.setUserEmail($("#userEmail").val());
        // window.dbConnection.setLastLogin($("#userEmail").val()).then((result) => {
        //   console.log(result);
        // });
      } else {
        let loginError = "<p class='error'>Incorrect Email or Password</p>";
        $("#loginForm").before(loginError);
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
                <label>Email</label>
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
