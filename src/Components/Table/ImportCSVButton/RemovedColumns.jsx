import { IconButton } from "@mui/material";
import React, { useCallback } from "react";
import ClearIcon from '@mui/icons-material/Clear';
const styles = {
  parent: {
    fontSize: 10,
    border: "1px dashed gray",
    height:230,
    width:"100%",
    overflow:"auto"
  },
  item: {
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
  },
};
const RemovedColumns = ({ removed,setColumns,setHeaders,setRemoved }) => {
  const handleClick=(accessor,card)=>{
      
    setColumns(oldArray => [...oldArray, card])
    setHeaders(oldArray => [...oldArray, card])
    setRemoved(removed=>removed.filter(header=>header.accessor!==accessor));
    return
  }
  const renderCard = useCallback((card, index) => {
  
    return (
      <div style={styles.item} key={index}>
         <b>{card.Header}</b>  <IconButton color="primary" size='small' aria-label="close" component="span" onClick={()=>handleClick(card.accessor,card)}>
          <ClearIcon fontSize="inherit"/>
        </IconButton>
      </div>
    );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div style={styles.parent}>{removed.map((card, i) => renderCard(card, i))}</div>
  );
};

export default RemovedColumns;
