import { IconButton } from '@mui/material'
import { useRef } from 'react'
import ClearIcon from '@mui/icons-material/Clear';
import { useDrag, useDrop } from 'react-dnd'
const style = {
  display:"flex",
  flexDirection:"Row",
  alignItems:"center",
  justifyContent:"space-between",
  // padding: '0.2rem 0.5rem',
  marginBottom: '.2rem',
  backgroundColor: 'aqua',
  cursor: 'pointer',
  border:"50% solid",
  width:"auto"
}
export const HeaderItem = ({ id, text, index, moveCard,accessor,handleClick,card }) => {
  const ref = useRef(null)
  const [{ handlerId }, drop] = useDrop({
    accept: "HEADER",
    collect(monitor) {
      return {
        handlerId: monitor.getHandlerId(),
      }
    },
    hover(item, monitor) {
      if (!ref.current) {
        return
      }
      const dragIndex = item.index
      const hoverIndex = index
      // Don't replace items with themselves
      if (dragIndex === hoverIndex) {
        return
      }
      // Determine rectangle on screen
      const hoverBoundingRect = ref.current?.getBoundingClientRect()
      // Get vertical middle
      const hoverMiddleY =
        (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2
      // Determine mouse position
      const clientOffset = monitor.getClientOffset()
      // Get pixels to the top
      const hoverClientY = clientOffset.y - hoverBoundingRect.top
      // Only perform the move when the mouse has crossed half of the items height
      // When dragging downwards, only move when the cursor is below 50%
      // When dragging upwards, only move when the cursor is above 50%
      // Dragging downwards
      if (dragIndex < hoverIndex && hoverClientY < hoverMiddleY) {
        return
      }
      // Dragging upwards
      if (dragIndex > hoverIndex && hoverClientY > hoverMiddleY) {
        return
      }
      // Time to actually perform the action
      moveCard(dragIndex, hoverIndex)
      // Note: we're mutating the monitor item here!
      // Generally it's better to avoid mutations,
      // but it's good here for the sake of performance
      // to avoid expensive index searches.
      item.index = hoverIndex
    },
  })
  const [{ isDragging }, drag] = useDrag({
    type: "HEADER",
    item: () => {
      return { id, index }
    },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  })
  const opacity = isDragging ? 0 : 1
  drag(drop(ref))
  return (
    <div ref={ref} style={{ ...style, opacity }} data-handler-id={handlerId}>
     <b>{text}</b>  <IconButton color="primary" size='small' aria-label="close" component="span" onClick={()=>handleClick(accessor,card)}>
          <ClearIcon fontSize="inherit"/>
        </IconButton>
    </div>
  )
}
