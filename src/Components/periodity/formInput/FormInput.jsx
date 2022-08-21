import React from "react";
import { Form } from "react-bootstrap";
import "./formInput.css";

const FormInput = (props) => {
  const { label, errorMessage, onChange, id, ...inputProps } = props;

  return (
    <div className="Row">
      <Form.Group className="mb-3" style={{width:props.isRepair ? "100%" : null}} controlId={inputProps.name}>
        <Form.Label>{label}</Form.Label>
        <Form.Control style={{width:props.isRepair ? "100%" : null}} {...inputProps} onChange={onChange} />
        <Form.Control.Feedback type="invalid">
          {errorMessage}
        </Form.Control.Feedback>
      </Form.Group>
      </div>

  );
};

export default FormInput;
