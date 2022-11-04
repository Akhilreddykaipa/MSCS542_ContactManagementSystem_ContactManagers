import SideNav from "../Components/SideNav";
import Login from "./Login";
import Dashboard from "./Dashboard";
import Messages from "./Messages";
import Employees from "./Employees";
import Users from "./Users";
import EmailHistory from "./EmailHistory";
import Groups from "./Groups";
import Contacts from "./Contacts";
import Account from "./Account";
import Settings from "./Settings";
import { Routes, Route, Link } from 'react-router-dom';
import { useState, useEffect } from 'react';
import '../css/Main.css';
import $ from 'jquery';

const Main = (props) => {
  const [newClass, setClass] = useState("");
  const [firstRun, setFirstRun] = useState(true);

  useEffect(() => {
    if (firstRun) {
      // max hex color value is (16*16) * (16*16) * (16*16) - 1 = 16777215
      let hex2Dec = hex => parseInt(hex, 16);
      let randomHex = [ Math.floor(Math.random() * 64).toString(16), Math.floor(Math.random() * 64).toString(16), Math.floor(Math.random() * 64).toString(16) ];
      let finalNum = "#";
      randomHex.forEach((item, i) => {
        finalNum += item;
      });

      $("#userProfile").css({ "background": finalNum });
      setFirstRun(false);
    }
  });

  return (
    <>
      <div id="main">
        <nav className={`sidenav p-3 py-4 ${newClass}`}>
          <SideNav setActive={setClass}/>
        </nav>
        <div id="userProfile">
          <p>{props.name}</p>
        </div>

        <div id="routes" className="p-4 p-md-5 pt-5">
          <Routes>
            <Route path="/" exact element={<Dashboard />} />
            <Route path="/dashboard" element={<Dashboard/>}/>
            <Route path="/messages" element={<Messages/>}/>
            <Route path="/employees" element={<Employees/>}/>
            <Route path="/users" element={<Users/>}/>
            <Route path="/emailHistory" element={<EmailHistory/>}/>
            <Route path="/groups" element={<Groups/>}/>
            <Route path="/contacts" element={<Contacts/>}/>
            <Route path="/account" element={<Account/>}/>
            <Route path="/settings" element={<Settings/>}/>
          </Routes>
        </div>
        <button className="btn btn-primary" onClick={window.dbConnection.doThing}>Beeg button</button>
      </div>
    </>
  );
};

export default Main;
