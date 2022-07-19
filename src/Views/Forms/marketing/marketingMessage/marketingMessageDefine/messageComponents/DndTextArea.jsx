import React from 'react'
import { ItemTypes } from './ItemTypes';
import { useDrop } from "react-dnd";
import { Form } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';
const style = {
   
    color: "black"
  
  };
const DndTextArea = ({value,handleChange}) => {
  const {t}=useTranslation()
    const [{ canDrop, isOver }, drop] = useDrop(() => ({
        accept: ItemTypes.ITEM,
        drop: () => ({ name: "dropTextField" }),
        collect: (monitor) => ({
          isOver: monitor.isOver(),
          canDrop: monitor.canDrop()
        })
      }));
      const isActive = canDrop && isOver;
      let backgroundColor = "white";
      if (isActive) {
        backgroundColor = "#F1F0E6";
      } else if (canDrop) {
        backgroundColor = "white";
      }
  return (
    <Form.Control placeholder={t("marketing.enterYourMessage")}   style={{ ...style, backgroundColor }} data-testid="dropTextField"  ref={drop} as={"textarea"} value={value} onChange={handleChange} rows={"5"} />
  )
}

export default DndTextArea