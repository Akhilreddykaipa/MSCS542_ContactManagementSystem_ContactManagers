import SideNav from "../Components/SideNav";
import Login from "./Login";
import EditEmployeeTable from "./EditEmployeeTable";
import Test from "./Test";
import EditUserTable from "./EditUserTable";
import EditMessagesTable from "./EditMessagesTable";
import ChangePassword from "./ChangePassword";
import Department from "./Department";
import Messages from "./Messages";
import Employees from "./Employees";
import Users from "./Users";
import EmailHistory from "./EmailHistory";
import Groups from "./Groups";
import Contacts from "./Contacts";
import Profile from "./Profile";
import Settings from "./Settings";
import CreateAccount from "../Views/CreateAccount.js"
import DeleteAccount from "../Views/DeleteAccount.js"
import Admin from "../Views/Admin.js"
import { Routes, Route, Navigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import '../css/Main.css';
import $ from 'jquery';

const Main = (props) => {
  const [newClass, setClass] = useState("");
  const [firstRun, setFirstRun] = useState(true);

  useEffect(() => {
    if (firstRun) {
      // max hex color value is (16*16) * (16*16) * (16*16) - 1 = 16777215
      let newHexVal = [ String(Math.floor(Math.random() * 63) + 16).toString(16), String(Math.floor(Math.random() * 63) + 16).toString(16), String(Math.floor(Math.random() * 63) + 16).toString(16) ];
      let finalNum = "#";
      newHexVal.forEach((item, i) => {
        finalNum += item;
      });

      $("body").append("<style>.rngColor{background:" + finalNum + "!important;}</style>");
      setFirstRun(false);
    }
  }, []);

  return (
    <>
      <div id="main">
        <nav className={`sidenav p-3 py-4 ${newClass}`}>
          <SideNav setActive={setClass} admin={props.admin}/>
        </nav>
        <div id="userProfile" className="rngColor">
          <p className="userName">{props.name}</p>
          { props.admin ? <AdminView /> : null }
        </div>

        <div id="routes" className="p-4 p-md-5 pt-5">
          <Routes>
            <Route path="/" exact element={<Contacts />} />
            <Route path="/contacts" element={<Contacts/>}/>
            <Route path="/groups" element={<Groups/>}/>
            <Route path="/messages" element={<Messages/>}/>
            <Route path="/emailHistory" element={<EmailHistory/>}/>
            <Route path="/department" element={<Department/>}/>
            <Route path="/profile" element={<Profile/>}/>
            <Route path="/settings" element={<Settings/>}/>
            <Route path="/admin" element={<Admin admin={props.admin}/>}/>
            <Route path="/login" exact element={<Login />} />
            <Route path="/createAccount" element={<CreateAccount/>}/>
            <Route path="/deleteAccount" element={<DeleteAccount/>}/>
            <Route path="/editEmployeeTable" element={<EditEmployeeTable/>}/>
            <Route path="/editUserTable" element={<EditUserTable/>}/>
            <Route path="/editMessagesTable" element={<EditMessagesTable/>}/>
            <Route path="/changePassword" element={<ChangePassword/>}/>
            <Route path="/test" element={<Test/>}/>
            <Route render={
              ()=>(<Navigate to="/login"/>)}
            />
          </Routes>
        </div>
      </div>
    </>
  );
};

const AdminView = (props) => {
  return (
    <>
      <hr id="adminSeperator"/>
      <p className="admin">admin mode</p>
    </>
  );
};

export default Main;
