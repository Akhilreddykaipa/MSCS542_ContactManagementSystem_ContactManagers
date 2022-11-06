import SideNavItem from './SideNavItem.js';
import { SideNavData } from './SideNavData.js';
import { useState, useEffect } from 'react';
import * as MdIcons from 'react-icons/md';
import * as BsIcons from "react-icons/bs";
import '../css/SideNav.css';
const utils = require('../utils/utils.js');

const SideNav = (props) => {
  const [list, setList] = useState(SideNavData);
  const [isOpen, setOpen] = useState(true);
  const [admin, setAdmin] = useState(props.admin);
  const [firstRun, setfirstRun] = useState(true);

  useEffect(() => {
    if (firstRun && admin) {
      list.push(
        {
          id: utils.newID(),
          icon: <BsIcons.BsShieldLockFill />,
          title: "Admin",
          path: '/admin',
          toggleClass: ''
        }
      );
      setfirstRun(false);
    }
  });

  function toggleCollapse() {
    setOpen(!isOpen);
    isOpen ? props.setActive('active') : props.setActive('');
  }

  function setItemActive(clickedItem) {
    const newList = list.map((newItem) => {
      newItem.id === clickedItem.id ? newItem.toggleClass = 'active' : newItem.toggleClass = '';
      return newItem;
    });
    setList([...newList]);
  }

  function addToList(item) {
    let newList = list.push(item);
    setList(newList);
  }

  return (
    <>
      <div className="toggleNav">
        <button className="sidebarCollapse" onClick={toggleCollapse}>
          <span><MdIcons.MdKeyboardArrowLeft /></span>
        </button>
      </div>
      <h4>Menu</h4>
      <hr/>
      <ul className="list-unstyled components mb-5">
        <li className="nav-item">
          {list.map((navItem) =>
            <SideNavItem
              key={navItem.id.toString()}
              icon={navItem.icon}
              title={navItem.title}
              path={navItem.path}
              listItem={navItem}
              toggleClass={navItem.toggleClass}
              getActive={setItemActive}
            />
          )}
        </li>
      </ul>
    </>
  );
};

export default SideNav;
