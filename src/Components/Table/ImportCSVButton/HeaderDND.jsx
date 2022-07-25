import update from 'immutability-helper'
import { useCallback } from 'react'
import { HeaderItem } from './HeaderItem'

const style = {
  width: "fit-content",
  fontSize:10,
  border: '1px dashed gray',
}
export const HeaderDND = ({headers,columns, setColumns,setHeaders}) => {
  
    const moveCard = useCallback((dragIndex, hoverIndex) => {
      setColumns((prevCards) =>
        update(prevCards, {
          $splice: [
            [dragIndex, 1],
            [hoverIndex, 0, prevCards[dragIndex]],
          ],
        }),
      )
      setHeaders((prevCards) =>
        update(prevCards, {
          $splice: [
            [dragIndex, 1],
            [hoverIndex, 0, prevCards[dragIndex]],
          ],
        }),
      )
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])
    const handleCheckBox=useCallback((checked,accessor)=>{
        if(!checked)
        return setColumns(columns=>columns.filter(column=>column.accessor!==accessor))
        console.log(headers,columns)
          // eslint-disable-next-line react-hooks/exhaustive-deps
    },[])
    const renderCard = useCallback((card, index) => {
      return (
        <HeaderItem
          key={card.index}
          index={index}
          id={card.index}
          text={card.Header}
          accessor={card.accessor}
          moveCard={moveCard}
          handleCheckBox={handleCheckBox}
        />
      )
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])
    return (
      <>
        <div style={style}>{headers.map((card, i) => renderCard(card, i))}</div>
      </>
    )
  
}
