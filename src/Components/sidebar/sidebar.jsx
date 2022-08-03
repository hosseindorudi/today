import React, { useState } from "react";
import "./sidebar.css";
import { Routes } from "../../Routes";
import SubMenu from "./SubMenu";
import "./sidebar.css";
import Search from "./search";
import { useTranslation } from "react-i18next";
// import logo from "../../assets/imgs/logo.png";

const Sidebar = () => {
  const [foundMenues, setFoundMenues] = useState([]);
  const [search, setSearch] = useState("");
  const { t } = useTranslation();
  const handleChangeSearchValue = (e) => {
    setFoundMenues([]);
    setSearch(e.target.value);
    if (e.target.value.length) {
      return findMenu(Routes, e.target.value);
    }
  };
  const findMenu = (data, searchValue) => {
    data.forEach((prop) => {
      if (prop.subNav) {
        return findMenu(prop.subNav, searchValue);
      }
      if (t(prop.title).indexOf(searchValue) !== -1) {
        let obj = {
          title: prop.title,
          path: prop.path,
          Component: prop.Component,
          button: prop.button && {
            Component: prop.button.Component,
            path: prop.button.path,
            title: prop.button.title,
            access: prop.button.access,
          },
          icon: prop.icon,
          access: prop.access,
        };

        setFoundMenues((prevState) => [...prevState, obj]);
      }
    });
  };

  return (
    <>
      <nav id="sidebarNav">
        <div className="sidebarWrapper">
          <div className="mainCtDiv">
            <div className="logo">
              <a
                href={localStorage.getItem("Website")}
                target="_blank"
                rel="noopener noreferrer"
              >
                <img src={"data:image/png;base64," + localStorage.getItem("Logo")} alt="ctelecomlogo" />
              </a>
            </div>
            <span>{localStorage.getItem("Domain")}</span>
            <hr className="hrSideNavbar" />
            <Search handleChange={handleChangeSearchValue} />
          

          </div>

          <div className="searchSidebar">
            
          
          {search.length > 0
            ? foundMenues.map((item, index) => {
                return <SubMenu item={item} key={index} search={search} />;
              })
            : Routes.map((item, index) => {
                return <SubMenu item={item} key={index} search={search} />;
              })}
              </div>
        </div>
      </nav>
    </>
  );
};

export default Sidebar;
