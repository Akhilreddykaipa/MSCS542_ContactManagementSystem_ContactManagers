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
        <h1>Settings</h1>
        <hr/>
        <h2 className="sectionHeader">User options:</h2>
        <div className="container">
          <div className="row">
            <h4>Change your password:</h4>
            <Link to="/changePassword">
              <button className="btn btn-danger">Change Password</button>
            </Link>
          </div>
        </div>
        <hr/>
        <h2 className="sectionHeader">System:</h2>
        <div className="container">
          <div className="row">
            <h4>Log out of system</h4>
            <div>
              <button className="btn btn-danger" onClick={handleLogout}>Logout</button>
            </div>
          </div>
        </div>
        <hr/>
      </div>
    </>
  );
};

export default Settings;
