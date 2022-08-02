import update from 'immutability-helper'
import { useCallback } from 'react'
import { HeaderItem } from './HeaderItem'

const style = {
  fontSize:10,
  border: '1px dashed gray',
  height:300,
  overflow:"auto",
  width:"100%"
}
export const HeaderDND = ({headers,columns, setColumns,setHeaders,setRemoved}) => {
  
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
    const handleClick=useCallback((accessor,card)=>{
        setColumns(columns=>columns.filter(column=>column.accessor!==accessor))
        setHeaders(headers=>headers.filter(header=>header.accessor!==accessor))
        setRemoved(oldArray => [...oldArray, card]);
        return
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
          handleClick={handleClick}
          card={card}
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
