import SideNav from "../Components/SideNav";
import Dashboard from "./Dashboard";
import Account from "./Account";
import { Routes, Route, Link } from 'react-router-dom';
import { useState, useEffect } from 'react';
import '../css/Main.css';
import $ from 'jquery';

const Main = (props) => {
  const [newClass, setClass] = useState("");

  useEffect(() => {
    document.getElementById("userProfile").style.background = "#" + Math.floor(Math.random() * 16777215).toString(16); // max hex color value is 256 * 256 * 256
  });

  function setActive(newClass) {
    setClass(newClass);
  }

  return (
    <>
      <nav className={`sidenav p-3 py-4 ${newClass}`}>
        <SideNav setActive={setActive}/>
      </nav>
      <div id="userProfile">

      </div>

      <div className="main p-4 p-md-5 pt-5">
        <Routes>
          <Route path="/" exact element={<Main/>}/>
          <Route path="/dashboard" element={<Dashboard/>}/>
          <Route path="/account" element={<Account/>}/>
        </Routes>
      </div>
    </>
  );
};

export default Main;
