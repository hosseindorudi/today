import { ListGroup } from "react-bootstrap";
import { useDrag } from "react-dnd";
import { ItemTypes } from "./ItemTypes.js";
const style = {
    backgroundColor: "white",
  };
export const DndItem = function DndItem({ i, index, dropped }) {
  const [{ isDragging }, drag] = useDrag(() => ({
    type: ItemTypes.ITEM,
    item: { i },
    end: (item, monitor) => {
      const dropResult = monitor.getDropResult();
      if (item && dropResult) {
        dropped(i);
      }
    },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
      handlerId: monitor.getHandlerId(),
    }),
  }));
  const opacity = isDragging ? 0.4 : 1;
  return (
    <ListGroup.Item
      style={{ ...style, opacity }}
      data-testid={`item`}
      ref={drag}
      key={index}
      action
    >
      {i.Value}
    </ListGroup.Item>
  );
};
