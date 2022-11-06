import { browserHistory } from 'react-router'
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
        <div>
          <button className="btn btn-danger" onClick={handleLogout}>Logout</button>
        </div>
      </div>
    </>
  );
};

export default Settings;
