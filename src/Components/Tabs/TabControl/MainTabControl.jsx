
import React, { useContext } from "react";
import { Tabs,Tab } from "react-bootstrap";
import { useTranslation } from "react-i18next";
import AppContext from "../../../contexts/AppContext";
import { TabContext } from "../../../contexts/TabContextProvider";
import "./MainTabControl.css";

function MainTabControl() {
  const { app, setApp } = useContext(AppContext);
  const tabContext = useContext(TabContext);
  const { t } = useTranslation();
  const handleClickRemove = (event,menu) => {
    event.stopPropagation();
    tabContext.addRemoveTabs(menu,"remove")
  };
  const updateState = (key, value) => {
    setApp((prev) => ({ ...prev, [key]: value }));
  };
 
  return (
    <div className="tabParrentDiv">
     
      {tabContext.tabs.length > 0 && (
        <Tabs
          activeKey={app.activeTab}
          onSelect={(k) => updateState("activeTab",k)}
          name="tabNav"
          id="mainTab"
          className="mb-3"
        >
          {/* height:`calc(100vh - 25px - 40px - ${document.getElementsByName("tabNav")[0].clientHeight})` */}
          {tabContext.tabs.map((menu, index) => (
            <Tab
              key={index}
              eventKey={menu.path}
              title={
                <span className="spanTab">
                  {t(menu.title)}{" "}
                  <span
                    onClick={(e) => handleClickRemove(e,menu)}
                    title= {t("TabExit")}
                    className="tabExitBtn"
                  >
                    <i className="fa fa-times" aria-hidden="true" />
                  </span>
                </span>
              }
            >
              {<menu.Component/>}
              
             
            </Tab>
          ))}
        </Tabs>
      )}
    </div>
  );
}

export default MainTabControl;
