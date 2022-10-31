import Dashboard from "./Dashboard";
import $ from 'jquery';
import "../css/Login.css";

const Login = (props) => {
  function runLogin() {
    console.log("logging in");
    props.loggedIn(true);
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
          <div className="header">
            Login
          </div>
          <div>
            <div>
              <label>Name</label>
            </div>
            <div>
              <input id="name" className="fullWidth mb-3" label="name" type="text"></input>
            </div>
            <div>
              <label>Password</label>
            </div>
            <div>
              <input id="password" className="fullWidth" label="password" type="password"></input>
            </div>
            <div>
              <input type="checkbox" onClick={togglePassword}></input>
              <label className="password-helper">Show password</label>
            </div>
          </div>
          <div>
            <button className="btn-primary btn" onClick={runLogin}>Login</button>
          </div>
        </div>
      </div>
    </>
  );
};

export default Login;
