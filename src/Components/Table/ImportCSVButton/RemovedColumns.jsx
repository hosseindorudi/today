import React from 'react'

const RemovedColumns = ({headers}) => {
  const style = {
    width: "fit-content",
    fontSize:10,
    border: '1px dashed gray',
  }
  return (
    <div style={style}>{headers.map((card, i) => renderCard(card, i))}</div>
  )
}

export default RemovedColumns