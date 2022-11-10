import { Link } from "react-router-dom";
import "../css/Settings.css";

const Settings = (props) => {
  function handleLogout(e) {
    e.preventDefault();
    window.history.replaceState(null, null, "/");
    window.location.reload();
  }

  return (
    <>
      <div id="settings" className="container">
        <h2>Settings</h2>
        <hr/>
        <div className="row">
          <p>Change your password</p>
          <Link to="/changePassword">
            <button className="btn btn-danger">Change Password</button>
          </Link>
        </div>
        <hr/>
        <div className="row">
          <p>Log out of system</p>
          <div>
            <button className="btn btn-danger" onClick={handleLogout}>Logout</button>
          </div>
        </div>
        <hr/>
      </div>
    </>
  );
};

export default Settings;
