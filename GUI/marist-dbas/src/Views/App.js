import { useState, useEffect } from "react";
import { Routes, Route, Navigate } from 'react-router-dom';
import Login from "./Login";
import Main from "./Main";
import "../css/App.css";

function App() {
  const [loggedIn, setLogin] = useState(false);
  const [username, setUserName] = useState("");
  const [admin, setAdmin] = useState(false);


  useEffect(() => {
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
