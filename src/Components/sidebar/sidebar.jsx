import React from 'react';
import './sidebar.css'
import { SidebarData } from './SidebarData';
import SubMenu from './SubMenu';
import Clock from '../clock';
import "./sidebar.css"
import Search from './search';


const Sidebar = () => {
 

  return (
    <>
        <nav id="sidebarNav" >
          <div  className='sidebarWrapper'>
            <div className='time'>
                <Clock />
            </div>
            <hr className='hrSideNavbar'/>
            <div className="searchSidebar">
              <Search/>
            </div>
            {SidebarData.map((item, index) => {
              return <SubMenu item={item} key={index} />;
            })}
          </div>
        </nav>
    </>
  );
};

export default Sidebar;
