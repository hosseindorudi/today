import React, { useState } from "react";
import { Form } from "react-bootstrap";
const FormInputTest = (props) => {
  const { label, errorMessage, onChange, id, ...inputProps } = props;
  return (
    <div>
      <Form.Group className="mb-3" controlId={inputProps.name}>
        <Form.Label>{label}</Form.Label>
        <Form.Control {...inputProps} onChange={onChange} />
        <Form.Control.Feedback type="invalid">
          {errorMessage}
        </Form.Control.Feedback>
      </Form.Group>
    </div>
  );
};

export default FormInputTest;
