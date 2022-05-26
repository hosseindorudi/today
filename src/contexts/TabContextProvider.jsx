import React, { useContext, useState } from "react";
import AppContext from "./AppContext";

export const TabContext = React.createContext({
  tabs: [],
  addRemoveTabs: () => [],
});

const TabContextProvider = (props) => {
  const [tabs, setTabs] = useState([]);
  const { app, setApp } = useContext(AppContext);
  const maxTabLength = 6;
  const addToTab = (item) => {
    const found = tabs.find((i) => i.path === item.path);
    if (!found) {
      if (tabs.length === maxTabLength) {
        const newState = [...tabs];
        newState[0] = {
          title: item.title,
          path: item.path,
          Component: item.Component,
        };
        return (
          setTabs(newState),
          setApp((prev) => ({ ...prev, activeTab: item.path }))
        );
      }

      return (
        setTabs((prev) => [
          ...prev,
          { title: item.title, path: item.path, Component: item.Component },
        ]),
        setApp((prev) => ({ ...prev, activeTab: item.path }))
      );
    }
    setApp((prev) => ({ ...prev, activeTab: item.path }));
  };
  const removeFromTab = (item) => {
    const isFound = (e) => e.path === item.path;
    let index = tabs.findIndex(isFound);
    let filtered = tabs.filter((e) => e.path !== item.path);
    setTabs(filtered);
    if (item.path === app.activeTab && filtered.length) {
      if (filtered[index - 1]) {
        setApp((prev) => ({ ...prev, activeTab: filtered[index - 1].path }));
      } else {
        setApp((prev) => ({ ...prev, activeTab: filtered[index].path }));
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
