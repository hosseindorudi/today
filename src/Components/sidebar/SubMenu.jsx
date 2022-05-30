import React, { useContext, useState } from "react";
import { useTranslation } from "react-i18next";
import { TabContext } from "../../contexts/TabContextProvider";
import * as cg from "react-icons/cg";

const SubMenu = ({ item, search }) => {
  const [subnav, setSubnav] = useState(false);
  const role = [
    100001, 100002, 100003, 100004, 100005, 100006, 100007, 100010, 100011,
    100012, 100013, 100014, 100015, 100016, 100017, 100020, 100021, 100022,
    100023, 100024, 100025, 100026, 100027, 100030, 100031, 100032, 100033,
    100034, 100035, 100036, 100037, 100040, 100050, 100051, 100052, 100053,
    100054, 100055, 100056, 100047,
  ];
  const tabContext = useContext(TabContext);
  const showSubnav = () => setSubnav(!subnav);
  const { t } = useTranslation();
  const handleClickMenu = (item) => {
    tabContext.addRemoveTabs(item, "add");
  };

  return (
    <>
      {item.subNav
        ? role.includes(item.access) && (
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
        : role.includes(item.access) && (
            <button
              className="SidebarLink"
              onClick={() => handleClickMenu(item)}
            >
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
      {!search &&
        subnav &&
        item.subNav.map((item, index) =>
          item.button
            ? role.includes(item.access) && (
                <div className="sidebarWithBtn">
                  <button
                    className="DropdownLinkBtn"
                    key={index}
                    onClick={() => handleClickMenu(item)}
                  >
                    {item.icon}
                    <span className="SidebarLabel">{t(item.title)}</span>
                  </button>
                  {role.includes(item.button.access) && (
                    <button
                      className="btnIconSidebar"
                      onClick={() => handleClickMenu(item.button)}
                    >
                      <cg.CgAddR size={20} />
                    </button>
                  )}
                </div>
              )
            : role.includes(item.access) && (
                <button
                  className="DropdownLink"
                  key={index}
                  onClick={() => handleClickMenu(item)}
                >
                  {item.icon}
                  <span className="SidebarLabel">{t(item.title)}</span>
                </button>
              )
          // return (
          //   <button
          //     className="DropdownLink"
          //     key={index}
          //     onClick={() => handleClickMenu(item)}
          //   >
          //     {item.icon}
          //     <span className="SidebarLabel">{t(item.title)}</span>
          //   </button>

          // );
        )}
    </>
  );
};

export default SubMenu;
