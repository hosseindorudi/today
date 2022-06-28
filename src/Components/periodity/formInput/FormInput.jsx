import React from "react";
import { Form } from "react-bootstrap";
import "./formInput.css";

const FormInput = (props) => {
  const { label, errorMessage, onChange, id, ...inputProps } = props;

  return (
      <Form.Group className="mb-3" controlId={inputProps.name}>
        <Form.Label>{label}</Form.Label>
        <Form.Control {...inputProps} onChange={onChange} />
        <Form.Control.Feedback type="invalid">
          {errorMessage}
        </Form.Control.Feedback>
      </Form.Group>

  );
};

export default FormInput;
