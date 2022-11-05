import { useEffect } from "react";
import { Link } from "react-router-dom";
import "../css/Settings.css";
import TableCell from "../Components/TableCell"

const Settings = (props) => {
  function goToCreateAccount() {

  }

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
