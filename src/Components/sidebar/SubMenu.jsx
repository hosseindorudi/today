import React, { useContext, useState } from "react";
import { useTranslation } from "react-i18next";
import AppContext from "../../contexts/AppContext";

const SubMenu = ({ item }) => {
  const [subnav, setSubnav] = useState(false);
  const maxTabLength=6
  const { app, setApp } = useContext(AppContext);
  const showSubnav = () => setSubnav(!subnav);
  const { t } = useTranslation();

  const updateState = (key, value) => {
    setApp((prev) => ({ ...prev, [key]: value }));
  };
  const handleClickMenu = (item) => {
    const form = app.forms;
    const found = form.find((f) => f.path === item.path);
    if (!found) {
      if (form.length === maxTabLength) {
        const updatedData = form.map((obj, index) => {
          if (index === 0) {
            return {
              ...obj,
              title: item.title,
              path: item.path,
              Component: item.Component,
            };
          } else return obj;
        });
         updateState("forms", updatedData)
        updateState("activeTab",item.path)
        return
      }
      form.push({
        title: item.title,
        path: item.path,
        Component: item.Component,
      });
       updateState("forms", form);
       updateState("activeTab",item.path);
       return
    }
    updateState("activeTab",item.path)
  };

  return (
    <>
      {item.subNav ? (
        <div className="SidebarLink" onClick={item.subNav && showSubnav}>
          <div>
            {item.icon}
            <span className="SidebarLabel">{t(item.title)}</span>
          </div>
          <div>
            {item.subNav && subnav
              ? item.iconOpened
              : item.subNav
              ? item.iconClosed
              : null}
          </div>
        </div>
      ) : (
        <button className="SidebarLink" onClick={() => handleClickMenu(item)}>
          <div>
            {item.icon}
            <span className="SidebarLabel">{t(item.title)}</span>
          </div>
          <div>
            {item.subNav && subnav
              ? item.iconOpened
              : item.subNav
              ? item.iconClosed
              : null}
          </div>
        </button>
      )}
      {subnav &&
        item.subNav.map((item, index) => {
          return (
            <button
              className="DropdownLink"
              key={index}
              onClick={() => handleClickMenu(item)}
            >
              {item.icon}
              <span className="SidebarLabel">{t(item.title)}</span>
            </button>
          );
        })}
    </>
  );
};

export default SubMenu;
