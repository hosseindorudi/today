import React, { lazy, useContext, useState } from "react";
import AppContext from "./AppContext";
const OperatorDashboard=lazy(()=>import('../Views/operatorDashboard/OperatorDashboard'))
export const TabContext = React.createContext({
  tabs: [],
  addRemoveTabs: () => [],
});

const TabContextProvider = (props) => {
  const [tabs, setTabs] = useState([{
    title: "dashboard",
    path: "/dashboard",
    Component:OperatorDashboard
  }]);
  const { app, setApp } = useContext(AppContext);
  const maxTabLength = 6;
  const addToTab = (item) => {
    const found = tabs.find((i) => i.path === item.path);
    if (!found) {
      if (tabs.length === maxTabLength) {
        setTabs(existingItems => {
            return existingItems.slice(1)
          })
          
        return (
          setTabs((prev) => [
            ...prev,
            item,
          ]),
          setApp((prev) => ({ ...prev, activeTab: item.path,title:item.title }))
        );
      }

      return (
        setTabs((prev) => [
          ...prev,
          item,
        ]),
        setApp((prev) => ({ ...prev, activeTab: item.path,title:item.title }))
      );
    }
    setApp((prev) => ({ ...prev, activeTab: item.path,title:item.title }));
  };
  const removeFromTab = (item) => {
    const isFound = (e) => e.path === item.path;
    let index = tabs.findIndex(isFound);
    let filtered = tabs.filter((e) => e.path !== item.path);
    setTabs(filtered);
    if (item.path === app.activeTab && filtered.length) {
      if (filtered[index - 1]) {
        setApp((prev) => ({ ...prev, activeTab: filtered[index - 1].path,title:filtered[index - 1].title }));
      } else {
        setApp((prev) => ({ ...prev, activeTab: filtered[index].path,title:filtered[index].title }));
      }
    }
  };
  const addTabs = (tab, action) => {
    switch (action) {
      case "add":
        addToTab(tab);
        break;
      case "remove":
        removeFromTab(tab);
        break;
      default:
        break;
    }
  };

  return (
    <TabContext.Provider value={{ tabs: tabs, addRemoveTabs: addTabs }}>
      {props.children}
    </TabContext.Provider>
  );
};

export default TabContextProvider;
