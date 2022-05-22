import React, { lazy, useContext } from "react";
import AppContext from "../../contexts/AppContext";
const Dashboard=lazy(()=>import('../../Views/operatorDashboard/OperatorDashboard'))
const Home = () => {
  const { app, setApp } = useContext(AppContext);
  const maxTabLength=process.env.REACT_APP_MAX_TAB_LENGTH
  const dashboard = {
    title: "dashboard",
    path: "/dashboard",
    Component: <Dashboard />
  };
  const handleClick = () => {
    const form = app.forms;
    const found = form.find((f) => f.path === dashboard.path);
    if (!found) {
      if (form.length === maxTabLength) {
        const updatedData = form.map((obj, index) => {
          if (index === 0) {
            return {
              ...obj,
              title: dashboard.title,
              path: dashboard.path,
              Component: dashboard.Component,
            };
          } else return obj;
        });
        setApp((prev) => ({ ...prev, forms: updatedData,activeTab:dashboard.path }));
        return;
      }
      form.push({
        title: dashboard.title,
        path: dashboard.path,
        Component: dashboard.Component,
      });
      setApp((prev) => ({ ...prev, forms: form,activeTab:dashboard.path }));
      return;
    }
    setApp((prev) => ({ ...prev,activeTab:dashboard.path }));
    
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
