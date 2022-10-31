import SideNavItem from './SideNavItem.js';
import { SideNavData } from './SideNavData.js';
import { useState } from 'react';
import * as MdIcons from 'react-icons/md';
import '../css/SideNav.css';

const SideNav = (props) => {
  const [list, setList] = useState(SideNavData);
  const [isOpen, setOpen] = useState(true);

  function toggleCollapse() {
    setOpen(!isOpen);
    isOpen ? props.setActive('active') : props.setActive('');
  }

  function setItemActive(clickedItem) {
    const newList = list.map((newItem) => {
      (newItem.id === clickedItem.id) ? (newItem.toggleClass = 'active') : (newItem.toggleClass = '');

      return newItem;
    });
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
