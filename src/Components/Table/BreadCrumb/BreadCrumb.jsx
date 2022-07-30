import React from "react";
import Breadcrumb from "react-bootstrap/Breadcrumb";

const BreadCrumb = (props) => {
  return (
    <div style={{ direction: "ltr" }}>
      <Breadcrumb>
        {props.BcItems?.map((item, i) => (
          <Breadcrumb.Item active key={i}>
            {item}
          </Breadcrumb.Item>
        ))}
      </Breadcrumb>
    </div>
  );
};

export default BreadCrumb;
