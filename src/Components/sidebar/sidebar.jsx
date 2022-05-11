import React, { useState } from 'react';
import './sidebar.css'
import { SidebarData } from './SidebarData';
import SubMenu from './SubMenu';
import Clock from '../clock';
import "./sidebar.css"
import Search from './search';
import { useTranslation } from 'react-i18next';



const Sidebar = () => {
    const [foundMenues,setFoundMenues]=useState([])
    const {t}=useTranslation()
   
    const handleChangeSearchValue=(e)=>{
      setFoundMenues([])
      if(e.target.value.length){
        return  findMenu(SidebarData,e.target.value)
      }
      
     
    }
    const findMenu=(data,searchValue)=>{
      data.forEach((prop) => {
          if (prop.subNav) {
            return findMenu(prop.subNav,searchValue)
          }
          if (t(prop.title).indexOf(searchValue) !== -1) {
            let obj={
              title: prop.title,
              path: prop.path,
              icon: prop.icon
            }
          
            setFoundMenues(prevState=>[...prevState,obj])
            
          }
          
      });
    }
   
  return (
    <>
    <button onClick={()=>console.log(foundMenues,SidebarData)}>s</button>
        <nav id="sidebarNav" >
          <div  className='sidebarWrapper'>
            <div className='time'>
                <Clock />
            </div>
            <hr className='hrSideNavbar'/>
            <div className="searchSidebar">
              <Search handleChange={handleChangeSearchValue} />
            </div>
            {foundMenues.length>0?
            foundMenues.map((item,index)=>{
              return <SubMenu item={item} key={index} />;
            })
            :
            SidebarData.map((item, index) => {
              return <SubMenu item={item} key={index} />;
            })}
          </div>
        </nav>
    </>
  );
};

export default Sidebar;
