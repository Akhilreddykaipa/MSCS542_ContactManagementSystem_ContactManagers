import { Link } from "react-router-dom";
import "../css/Settings.css";

const Settings = (props) => {
  return (
    <>
      <div id="settings" className="container">
        <h2>Settings</h2>
        <hr/>
        <div>
          <button className="btn">
            <Link to="/createAccount">Create new user</Link>
          </button>
        </div>
      </div>
    </>
  );
};

export default Settings;
