import { Link } from "react-router-dom";
import $ from 'jquery';
import "../css/ChangePassword.css";

const ChangePassword = (props) => {
  function submitNewPassword() {
    let passes = [ $("#newPassword1 .password").val(), $("#newPassword2 .password").val() ];
    if (passes[0] === passes[1]) {
      console.log("passwords match");
      let email = $("#userProfile p.userName").text();
      console.log(email, passes[0], passes[1]);
      window.dbConnection.newPassword({
        email: email,
        pass: passes[0]
      }).then((result) => {

        $("#changePassword .successMessage").addClass("active");
        setTimeout(() => {
          $("#changePassword .successMessage").removeClass("active");
        }, 4000);
      });
    } else {
      $("#changePassword .errorMessage").addClass("active");
      $("#changePassword .errorMessage").text("Passwords do not match");
      setTimeout(() => {
        $("#changePassword .errorMessage").removeClass("active");
      }, 4000);
    }
  }

  function togglePassword(e) {
    let inputType = $("#newPass" + e.target.id + " .password").attr("type");
    if (inputType === "text") {
      $("#newPass" + e.target.id + " .password").attr("type", "password");
    } else {
      $("#newPass" + e.target.id + " .password").attr("type", "text");
    }

    let inputTypeLabel = $("#newPass" + e.target.id + " label.password-helper").text();
    if (inputTypeLabel === "Show password") {
      $("#newPass" + e.target.id + " label.password-helper").text("Hide password");
    } else {
      $("#newPass" + e.target.id + " label.password-helper").text("Show password");
    }
  }

  return (
    <>
      <div id="changePassword" className="container">
        <button id="backButton" className="btn btn-warning">
          <Link to="/settings">&lt; Back</Link>
        </button>
        <h2>Change Password</h2>
        <div className="resultMessages">
          <p className="successMessage">Successfully changed password</p>
          <p className="errorMessage"></p></div>
        <hr/>

        <div className="row">
          <div id="newPassword1" className="col12">
            <p>Type your new password</p>
            <input name="newPassword1" className="password fullWidth" label="newPassword1" type="password" required></input>
            <div>
              <input type="checkbox" id="word1" onClick={togglePassword}></input>
              <label className="password-helper">Show password</label>
            </div>
          </div>

          <div id="newPassword2" className="col12">
            <p>Type your new password again to confirm</p>
            <input name="newPassword2" className="password fullWidth" label="newPassword2" type="password" required></input>
            <div>
              <input type="checkbox" id="word2" onClick={togglePassword}></input>
              <label className="password-helper">Show password</label>
            </div>
          </div>
        </div>
        <div>
          <button id="changePassSubmit" className="btn btn-primary" onClick={submitNewPassword}>Submit</button>
        </div>
      </div>
    </>
  );
};

export default ChangePassword;
