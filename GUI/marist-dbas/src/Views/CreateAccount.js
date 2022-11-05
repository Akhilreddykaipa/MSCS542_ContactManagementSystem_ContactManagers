import { Link } from "react-router-dom";
import $ from 'jquery';
import "../css/CreateAccount.css";
import "../css/Login.css";

const CreateAccount = (props) => {
  function handleSubmit(e) {
    e.preventDefault();

    window.dbConnection.createAccount({
      userEmail: $("#userEmail").val(),
      password: $("#password").val()
    }).then((result) => {
      console.log("authenticated?", result);
      if (result) {
        props.loggedIn(true);
        props.setUserEmail($("#userEmail").val());
      }
    });



    props.loggedIn(true);
    props.setUserEmail($("#userEmail").val());
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

  function goToLogin() {
    props.setLoginView(false);
  }

  return (
    <>
      <div id="createAccount" className="container">
        <div>
          <h4 id="createAccountTitle" className="text-start">Marist DBAs</h4>
          <div className="header">
            Create Account
          </div>
          <form id="createAccountForm" onSubmit={handleSubmit} >
            <div>
              <div>
                <label>User Email</label>
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
              <button className="btn-primary btn" type="submit">Create</button>
            </div>
            <div id="newAccount">
              <Link onClick={goToLogin}>Log in</Link>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default CreateAccount;
