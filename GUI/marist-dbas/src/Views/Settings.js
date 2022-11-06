import { Link } from "react-router-dom";
import "../css/Settings.css";

const Settings = (props) => {
  function handleLogout(e) {
    e.preventDefault();
    window.location.reload();
  }

  return (
    <>
      <div id="settings" className="container">
        <h2>Settings</h2>
        <hr/>
        <div>
          <button className="btn btn-danger" onClick={handleLogout}>Logout</button>
        </div>
        <hr/>
        <div>
          {props.admin ?
          <>
            <h3>Admin</h3>
            <hr/>
            <button className="btn btn-primary">
              <Link to="/createAccount">Create new user</Link>
            </button>
          </>
          : null}
        </div>
      </div>
    </>
  );
};

export default Settings;
