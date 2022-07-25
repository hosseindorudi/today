import React, { useCallback } from "react";
import {Form} from 'react-bootstrap'
const styles = {
  parent: {
    width: "fit-content",
    fontSize: 10,
    border: "1px dashed gray",
  },
  item: {
    padding: "0.2rem 0.5rem",
    marginBottom: ".2rem",
    backgroundColor: "aqua",
    cursor: "pointer",
    border: "50% solid",
    width: "auto",
  },
};
const RemovedColumns = ({ removed,setColumns,setHeaders,setRemoved }) => {
  const renderCard = useCallback((card, index) => {
    const handleCheckBox=(checked,accessor,card)=>{
      if(checked)
      setColumns(oldArray => [...oldArray, card])
      setHeaders(oldArray => [...oldArray, card])
      setRemoved(removed=>removed.filter(header=>header.accessor!==accessor));
      return
    }
    return (
      <div style={styles.item}>
        {
          <Form.Check
            type="checkbox"
            label={card.Header}
            defaultChecked={false}
            onChange={(e) => handleCheckBox(e.target.checked, card.accessor, card)}
          />
        }
      </div>
    );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div style={styles.parent}>{removed.map((card, i) => renderCard(card, i))}</div>
  );
};

export default RemovedColumns;
