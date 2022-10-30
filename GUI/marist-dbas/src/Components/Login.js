import Dashboard from "./Dashboard";
import "../css/Login.css";
import {
    Routes,
    Route,
    Link
}
from 'react-router-dom';

const Login = (props) => {
  function runLogin() {
    console.log("logging in");
    props.loggedIn(true);
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
              <input id="name" label="name" type="text"></input>
            </div>
            <div>
              <label>Password</label>
            </div>
            <div>
              <input id="password" label="password" type="text"></input>
            </div>
            <div>
              <button className="btn-primary btn" onClick={runLogin}>Login</button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Login;
