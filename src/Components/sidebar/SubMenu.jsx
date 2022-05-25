import React, { useContext, useState } from "react";
import { useTranslation } from "react-i18next";
import { TabContext } from "../../contexts/TabContextProvider";

const SubMenu = ({ item }) => {
  const [subnav, setSubnav] = useState(false);
  const tabContext=useContext(TabContext)
  const showSubnav = () => setSubnav(!subnav);
  const { t } = useTranslation();
  const handleClickMenu = (item) => {
  tabContext.addRemoveTabs(item,"add")
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
