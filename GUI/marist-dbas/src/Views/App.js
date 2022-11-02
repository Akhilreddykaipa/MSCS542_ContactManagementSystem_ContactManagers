import { useState } from "react";
import Login from "./Login";
import Main from "./Main";
import CreateAccount from "./CreateAccount";
import "../css/App.css";

function App() {
  const [loggedIn, setLogin] = useState(false);
  const [createAccount, setCreateAccount] = useState(false);
  const [page, setPage] = useState("login");
  const [username, setUserName] = useState("");

  return (
    <>
      <div className="App">
        { (loggedIn == true) ?
          <Main name={username}/> :
          (createAccount == true) ?
            <CreateAccount
              loggedIn={setLogin}
              setName={setUserName}
              setLoginView={setCreateAccount}
            /> :
            <Login
              loggedIn={setLogin}
              setName={setUserName}
              createAccount={setCreateAccount}
            /> }
      </div>
    </>
  );
}

export default App;
