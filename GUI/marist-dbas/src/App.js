import { useState } from "react";
import Login from "./Components/Login";
import Dashboard from "./Components/Dashboard";
import "./css/App.css";

function App() {
  const [loggedIn, setLogin] = useState(false);
  const [page, setPage] = useState("login");

  return (
    <>
      <div className="App">
        {loggedIn == true ? <Dashboard /> : <Login loggedIn={setLogin} />}
      </div>
    </>
  );
}

export default App;
