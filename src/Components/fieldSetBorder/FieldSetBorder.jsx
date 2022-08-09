import React from "react";

const styles = {
  fieldset: {
    border: "double",
    padding: 5,
    fontWeight: "bold",
    borderRadius:5
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
