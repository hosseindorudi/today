import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import {  NavLink } from 'react-router-dom';




const SubMenu = ({ item }) => {
  const [subnav, setSubnav] = useState(false);

  const showSubnav = () => setSubnav(!subnav);
  const {t}=useTranslation()
  return (
    <>
     
     {item.subNav?
      <div className="SidebarLink" onClick={item.subNav && showSubnav}>
        <div>
          {item.icon}
          <span className='SidebarLabel'>{t(item.title)}</span>
        </div>
        <div>
          {item.subNav && subnav
            ? item.iconOpened
            : item.subNav
            ? item.iconClosed
            : null}
        </div>
        </div>
      :
      <NavLink className="SidebarLink" to={item.path} >
        <div >
          {item.icon}
          <span className='SidebarLabel'>{t(item.title)}</span>
        </div>
        <div>
          {item.subNav && subnav
            ? item.iconOpened
            : item.subNav
            ? item.iconClosed
            : null}
        </div>
      </NavLink>
     }
      {subnav &&
        item.subNav.map((item, index) => {
          return (
            <NavLink className="DropdownLink" to={item.path} key={index}>
              {item.icon}
              <span className='SidebarLabel'>{t(item.title)}</span>
            </NavLink>
          );
        })}
        
          
    </>
  );
};

export default SubMenu;
