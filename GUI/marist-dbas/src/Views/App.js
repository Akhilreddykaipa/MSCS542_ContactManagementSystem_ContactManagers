import Login from "./Login";
import SideNav from "../Components/SideNav";
import Dashboard from "./Dashboard";
import Messages from "./Messages";
import Employees from "./Employees";
import Users from "./Users";
import EmailHistory from "./EmailHistory";
import Groups from "./Groups";
import Contacts from "./Contacts";
import Account from "./Account";
import Settings from "./Settings";
import CreateAccount from "../Views/CreateAccount.js"
import Admin from "../Views/Admin.js"

import { useState, useEffect } from "react";
import { Routes, Route, Navigate } from 'react-router-dom';
import Main from "./Main";
import "../css/App.css";

function App() {
  const [loggedIn, setLogin] = useState(false);
  const [username, setUserName] = useState("");
  const [admin, setAdmin] = useState(false);


  useEffect(() => {
    const script = document.createElement('script');
    script.src = "../electron/renderer.js";
    script.type = "text/babel";
    script.async = true;

    document.body.appendChild(script);

    return () => {
      document.body.removeChild(script);
    }

    window.addEventListener('beforeunload', (e) => {
      e.preventDefault();
    });
  }, []);

  return (
    <>
      <div className="App">
        { (loggedIn === true) ?
          <>
            <Main name={username} admin={admin}/>
          </> :
          <Login
            loggedIn={setLogin}
            setUserEmail={setUserName}
            setAdmin={setAdmin}
          /> }
      </div>
    </>
  );
}

export default App;
