import React from 'react';
import * as MdIcons from 'react-icons/md';
import * as FaIcons from 'react-icons/fa';
import * as GiIcons from "react-icons/gi";
// https://react-icons.github.io/react-icons/

export const SideNavData = [
    { id: 0,
      icon: <MdIcons.MdSpaceDashboard />,
      title: "Dashboard",
      path: '/dashboard',
      toggleClass: 'active'
    },
    { id: 1,
      icon: <MdIcons.MdAccountCircle />,
      title: "Account",
      path: '/account',
      toggleClass: ''
    }
];
