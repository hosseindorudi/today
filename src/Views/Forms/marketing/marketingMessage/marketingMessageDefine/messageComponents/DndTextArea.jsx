import React from "react";
import { ItemTypes } from "./ItemTypes";
import { useDrop } from "react-dnd";
import { Form } from "react-bootstrap";
import { useTranslation } from "react-i18next";
const style = {
  color: "black",
};
// /[`{}[\]/]/gi
const DndTextArea = ({ value, handleChange }) => {
  const { t } = useTranslation();
  const onChange = (e) => {
    handleChange(e.target.value);
  };
  const handleKeypress = (e) => {
    if (e.key.match(/[{}]/)) {
      e.preventDefault();
      return false;
    }
  };
  const [{ canDrop, isOver }, drop] = useDrop(() => ({
    accept: ItemTypes.ITEM,
    drop: () => ({ name: "dropTextField" }),
    collect: (monitor) => ({
      isOver: monitor.isOver(),
      canDrop: monitor.canDrop(),
    }),
  }));
  const isActive = canDrop && isOver;
  let backgroundColor = "white";
  if (isActive) {
    backgroundColor = "#F1F0E6";
  } else if (canDrop) {
    backgroundColor = "white";
  }
  return (
    <Form.Control
      onKeyPress={handleKeypress}
      required
      placeholder={t("marketing.enterYourMessage")}
      style={{ ...style, backgroundColor }}
      data-testid="dropTextField"
      ref={drop}
      as={"textarea"}
      value={value}
      onChange={onChange}
      rows={"5"}
    />
  );
};

export default DndTextArea;
