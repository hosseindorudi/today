import React, { useContext, useState } from "react";
import { useTranslation } from "react-i18next";
import { TabContext } from "../../contexts/TabContextProvider";
import * as cg from "react-icons/cg";
import AppContext from "../../contexts/AppContext";

const SubMenu = ({ item, search }) => {
  const [subnav, setSubnav] = useState(false);
  const tabContext = useContext(TabContext);
  const {app,setApp}=useContext(AppContext)
  const AccessList=app.AccessList
  const showSubnav = () => setSubnav(!subnav);
  const { t } = useTranslation();
  const handleClickMenu = (item) => {
    setApp((prev)=>({
      ...prev,
      sidebarOpen:false,
    }))
    tabContext.addRemoveTabs(item, "add");
  };
  const handleClickButton=(item)=>{
    tabContext.tabs.find(f=>f.path===item.path)&& tabContext.addRemoveTabs(item, "remove")
    handleClickMenu(item.button)
  }
  return (
    <>
      {item.subNav
        ? AccessList?.includes(item.access) && (
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
        )
          
        : AccessList?.includes(item.access) && (
          <div className="sidebarWithBtn">
          <button
            className="DropdownLinkBtn"
            onClick={() => handleClickMenu(item)}
          >
            {item.icon}
            <span className="SidebarLabel">{t(item.title)}</span>
          </button>
          
          {item.button&& AccessList?.includes(item.button.access) && (
            <button
              className="btnIconSidebar"
              onClick={() => handleClickButton(item)}
            >
              <cg.CgAddR size={20} />
            </button>
          )}
        </div>
            // <button
            //   className="SidebarLink"
            //   onClick={() => handleClickMenu(item)}
            // >
            //   <div>
            //     {item.icon}
            //     <span className="SidebarLabel">{t(item.title)}</span>
            //   </div>
            //   <div>
            //     {item.subNav && subnav
            //       ? item.iconOpened
            //       : item.subNav
            //       ? item.iconClosed
            //       : null}
            //   </div>
            // </button>
          )}
      {!search &&
        subnav &&
        item.subNav.map(
          (item, index) =>
            item.button
              ? AccessList?.includes(item.access) && (
                  <div className="sidebarWithBtn" key={index}>
                    <button
                      className="DropdownLinkBtn"
                      key={index}
                      onClick={() => handleClickMenu(item)}
                    >
                      {item.icon}
                      <span className="SidebarLabel">{t(item.title)}</span>
                    </button>
                    {AccessList?.includes(item.button.access) && (
                      <button
                        className="btnIconSidebar"
                        onClick={() => handleClickButton(item)}
                      >
                        <cg.CgAddR size={20} />
                      </button>
                    )}
                  </div>
                )
              : AccessList?.includes(item.access) && (
                  <button
                    className="DropdownLink"
                    key={index}
                    onClick={() => handleClickMenu(item)}
                  >
                    {item.icon}
                    <span className="SidebarLabel">{t(item.title)}</span>
                  </button>
                )
        )}
    </>
  );
};

export default SubMenu;
