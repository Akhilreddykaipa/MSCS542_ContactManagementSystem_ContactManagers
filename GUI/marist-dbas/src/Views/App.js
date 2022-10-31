import { useState } from "react";
import Login from "./Login";
import Main from "./Main";
import "../css/App.css";

function App() {
  const [loggedIn, setLogin] = useState(false);
  const [page, setPage] = useState("login");

  return (
    <>
      <div className="App">
        { loggedIn == true ? <Main/> : <Login loggedIn={setLogin}/> }
      </div>
    </>
  );
}

export default App;
