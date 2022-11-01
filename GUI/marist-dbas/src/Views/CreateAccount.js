import { Link } from "react-router-dom";
import $ from 'jquery';
import "../css/CreateAccount.css";
import "../css/Login.css";

const CreateAccount = (props) => {
  function handleSubmit(e) {
    e.preventDefault();
    $("#createAccountForm").validate({

    });

    props.loggedIn(true);
    props.setName($("#name").val());
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
      <div id="createAccount" className="container">
        <div>
          <h4 id="createAccountTitle" className="text-start">Marist DBAs</h4>
          <div className="header">
            Create Account
          </div>
          <form id="createAccountForm" onSubmit={handleSubmit} >
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
              <button className="btn-primary btn" type="submit">Create</button>
            </div>
            <div id="newAccount">
              <Link to="/login">Log in</Link>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default CreateAccount;
