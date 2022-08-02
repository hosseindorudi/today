import { t } from 'i18next'
import { useDrop } from 'react-dnd'
import { NativeTypes } from 'react-dnd-html5-backend'
import * as fa from 'react-icons/fa'
import { toast } from 'react-toastify'
export const TargetBox = (props) => {
  const { onDrop,handleClickAdd,inputId } = props
  const [{ canDrop, isOver }, drop] = useDrop(
    () => ({
      accept: [NativeTypes.FILE],
      drop(item) {
        if (onDrop) {
            if(item.files[0].type==="text/csv")
            return onDrop(item)

            toast.info(t("uploadOnlyCSv"), {
                position: toast.POSITION.TOP_CENTER,
              });
        }
      },
      canDrop(item) {
      
        return true
      },
      hover(item) {
     
      },
      collect: (monitor) => {
        const item = monitor.getItem()
        if (item) {
        
        }
        return {
          isOver: monitor.isOver(),
          canDrop: monitor.canDrop(),
        }
      },
    }),
    [props],
  )
  const isActive = canDrop && isOver
  return (
    <label ref={drop} className={isActive ? "drag-active" : "" } id="label-file-upload" htmlFor={inputId}>
    <div>
      
      <button onClick={handleClickAdd} className="upload-button"><fa.FaPlus className="dndPlusBtn"/></button>
    </div>
    <label className='labelDrop'>{t("dropFile")}</label>
  </label>
  )
}
