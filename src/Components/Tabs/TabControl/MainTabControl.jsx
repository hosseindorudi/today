import { Tab } from "bootstrap";
import React, { useContext } from "react";
import { Tabs } from "react-bootstrap";
import FormTabsContext from "../../../contexts/FormTabsContex";
import Dashboard from "../../../Views/Forms/Dashboard";
import Dashboard2 from "../../../Views/Forms/Dashboard2";
import Profile from "../../../Views/Forms/Profile";
import "./MainTabControl.css"


function MainTabControl() {
  const { selectedForms, setSelectedForms } = useContext(FormTabsContext);

  const handleClickRemove = (key) => {
    let selected = selectedForms.filter((e) => e.key !== key);
    setSelectedForms(selected);
  };
  const findComponent = (key) => {
    switch (key) {
      case "profile":
        return <Profile />;

      case "dashboard2":
        return <Dashboard2 />;

      case "dashboard3":
        return <Dashboard />;

      default:
        break;
    }
  };
  return (
    <div>
    {selectedForms.length>0 && 
      <Tabs
        defaultActiveKey="profile"
        id="uncontrolled-tab-example"
        className="mb-3"
      >
        {selectedForms.map((form, index) => (
          <Tab
            key={index}
            eventKey={form.key}
            title={
              <span className="spanTab">
                {form.name}{" "}
                <span onClick={() => handleClickRemove(form.key)} title="حذف">
                  <i className="fa fa-times" aria-hidden="true" />
                </span>
              </span>
            }
          >
            {findComponent(form.key)}
          </Tab>
        ))}
      </Tabs>
          }
    </div>

  );
}

export default MainTabControl;
