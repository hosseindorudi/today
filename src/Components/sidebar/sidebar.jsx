import React, { useState } from 'react';
import './sidebar.css'
import { Routes } from '../../Routes';
import SubMenu from './SubMenu';
import "./sidebar.css"
import Search from './search';
import { useTranslation } from 'react-i18next';
import logo from '../../assets/imgs/logo.png'


const Sidebar = () => {
    const [foundMenues,setFoundMenues]=useState([])
    const [search,setSearch]=useState('')
    const {t}=useTranslation()
   
    const handleChangeSearchValue=(e)=>{
      setFoundMenues([])
      setSearch(e.target.value)
      if(e.target.value.length){
       
        return  findMenu(Routes,e.target.value)
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
              Component:prop.Component,
              icon: prop.icon
            }
          
            setFoundMenues(prevState=>[...prevState,obj])
            
          }
          
      });
    }
   
  return (
    <>
 
        <nav id="sidebarNav" >
          <div  className='sidebarWrapper'>
            <div className='logo'>
              <img src={logo} alt='ctelecomlogo'/>
            </div>
            <hr className='hrSideNavbar'/>
            <div className="searchSidebar">
              <Search handleChange={handleChangeSearchValue} />
            </div>
            {search.length>0?
            foundMenues.map((item,index)=>{
              return <SubMenu item={item} key={index} />;
            })
            :
            Routes.map((item, index) => {
              return <SubMenu item={item} key={index} />;
            })}
          </div>
        </nav>
    </>
  );
};

export default Sidebar;
