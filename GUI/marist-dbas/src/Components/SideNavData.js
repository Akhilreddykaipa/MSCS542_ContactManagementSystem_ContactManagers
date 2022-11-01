import React from 'react';
import * as MdIcons from 'react-icons/md';
import * as FaIcons from 'react-icons/fa';
import * as RiIcons from "react-icons/ri";
const utils = require('../utils/utils.js');
// https://react-icons.github.io/react-icons/

export const SideNavData = [
    { id: utils.newID(),
      icon: <MdIcons.MdSpaceDashboard />,
      title: "Dashboard",
      path: '/dashboard',
      toggleClass: 'active'
    },
    { id: utils.newID(),
      icon: <MdIcons.MdAccountCircle />,
      title: "Account",
      path: '/account',
      toggleClass: ''
    },
    { id: utils.newID(),
      icon: <MdIcons.MdAccountCircle />,
      title: "Contacts",
      path: '/contacts',
      toggleClass: ''
    },
    { id: utils.newID(),
      icon: <RiIcons.RiSettings3Fill />,
      title: "Settings",
      path: '/settings',
      toggleClass: ''
    }
];
