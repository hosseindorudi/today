
import React, { useContext } from "react";
import { Tabs,Tab } from "react-bootstrap";
import { useTranslation } from "react-i18next";
import AppContext from "../../../contexts/AppContext";
import "./MainTabControl.css";

function MainTabControl() {
  const { app, setApp } = useContext(AppContext);
  const { t } = useTranslation();
  const handleClickRemove = (event,path,index) => {
    event.stopPropagation();
    let selected = app.forms.filter((e) => e.path !== path);
    updateState("forms",selected)
    if(path===app.activeTab &&selected.length){
     if(selected[index-1]){
      updateState("activeTab",selected[index-1].path)
     }else{
      updateState("activeTab",selected[index].path)
     }
    }
    

  };
  const updateState = (key, value) => {
    setApp((prev) => ({ ...prev, [key]: value }));
  };
 
  return (
    <div>
      {app.forms.length > 0 && (
        <Tabs
          activeKey={app.activeTab}
          onSelect={(k) => updateState("activeTab",k)}
    
          id="mainTab"
          className="mb-3"
        >
          {app.forms.map((Menu, index) => (
            <Tab
              key={index}
              eventKey={Menu.path}
              title={
                <span className="spanTab">
                  {t(Menu.title)}{" "}
                  <span
                    onClick={(e) => handleClickRemove(e,Menu.path,index)}
                    title= {t("TabExit")}
                  >
                    <i className="fa fa-times" aria-hidden="true" />
                  </span>
                </span>
              }
            >
              {Menu.Component}
            </Tab>
          ))}
        </Tabs>
      )}
    </div>
  );
}

export default MainTabControl;
