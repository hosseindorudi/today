import React, { lazy, useContext } from "react";
import { TabContext } from "../../contexts/TabContextProvider";
const Dashboard=lazy(()=>import('../../Views/operatorDashboard/OperatorDashboard'))
const Home = () => {
  const tabContext = useContext(TabContext);
  const dashboard = {
    title: "dashboard",
    path: "/dashboard",
    Component: <Dashboard />
  };
  const handleClick = () => {
    tabContext.addRemoveTabs(dashboard,"add")
  };
  return (
    <div className="secondIcon" onClick={handleClick}>
      <div>
        <i className="fa fa-home" aria-hidden="true"></i>
      </div>
    </div>
  );
};

export default Home;
