import { useContext, useRef } from "react";
import { Badge, Button } from "react-bootstrap";
import { useTranslation } from "react-i18next";
import { TabContext } from "../../contexts/TabContextProvider";
import Tooltip from '@mui/material/Tooltip';
import * as bs from 'react-icons/bs'
import useButtonAccess from "../../customHooks/useButtonAccess";
function CircularMenuItem({ 
    item,
    rotation, 
    menuIsOpen, 
    transitionDelay 
})
{
    const tabContext = useContext(TabContext);
    const [havAccess]=useButtonAccess()
    const target = useRef(null);
    const { t } = useTranslation();
    const handleClick = (i) => {
        const item={
            title: i.title,
            path: i.path,
            Component:i.Component
        }
      tabContext.addRemoveTabs(item, "add");
    };
    return (
        <> 
        <Tooltip
                PopperProps={{
                  disablePortal: true,
                }}
                open={item.button && havAccess(item.button.access)?true:false}
                disableFocusListener
                disableHoverListener
                disableTouchListener
                title={<bs.BsPlusLg className="btnFormCircularMenu" onClick={()=>handleClick(item.button)}/>}
                arrow
                placement={rotation>=60&&rotation<180 ?"bottom":"top"}
              >
        <Button
            disabled={!havAccess(item.access)}
            className="menu-item"
            ref={target}
            style={{
              backgroundColor: item.color,
              transform: `rotate(${rotation}deg) translate(${menuIsOpen ? 175 : 0}%)`,
              transitionDelay: `${menuIsOpen ? transitionDelay : 0}ms`
            }}
            onClick={()=>handleClick(item)}
        >
            <div className="buttonTextsAndBadge" style={{
                transform: `rotate(${-rotation}deg)`,display:'flex',flexDirection:'row'
            }}>
            <span >{t(item.title)}</span> <div className="badgeDiv"> <Badge className={item.no!==0 &&"blink_me"} bg="danger">{item.no}</Badge></div>
            </div>
        </Button>
        </Tooltip>
       </>
      
    );
}

export default CircularMenuItem;