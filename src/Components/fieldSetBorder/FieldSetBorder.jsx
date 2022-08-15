import React from "react";

const styles = {
  fieldset: {
    border: "1px solid lightgray",
    padding: 5,
    fontWeight: "bold",
    borderRadius:5,
    width:"100%"
  },
  legend: {
    width: "unset",
    fontSize: 14,
    float: "unset",
    padding: 2,
  },
};
const FieldSetBorder = (props) => {
  const { children, legend } = props;
  return (
    <fieldset style={styles.fieldset}>
      <legend style={styles.legend}>{legend}</legend>
      {children}
    </fieldset>
  );
};

export default FieldSetBorder;
