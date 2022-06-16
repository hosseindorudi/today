import { t } from "i18next";
import React, { useState } from "react";
import { Button, Form, Modal, Table } from "react-bootstrap";
import "./PermissionModal.css";
const PermissionModal = (props) => {
  const [permissions, setPermissions] = useState(props.permissions);

  const [filterValue, setFilterValue] = useState("")

  const handleCheck = (codePage, e) => {
    const checked = e.target.checked;
    const temp = [...permissions];
    let index = temp.findIndex((i) => i.CodePage === codePage);
    if (index != -1) {
      temp[index] = {
        ...temp[index],
        ["IsSelected"]: checked,
      };
    }
    setPermissions(temp);
  };
  const handleClickSave = () => {
    const filtered = permissions.filter((p) => p.IsSelected === true);
    let selectedNumbers = [];
    filtered.map((f) => selectedNumbers.push(f.CodePage));
    props.setPermission(selectedNumbers);
  };
  const handleChange = (key) => {
    let temp = [...permissions];
    switch (key) {
      case "NONE":
        temp.map((p) => (p.IsSelected = false));
        setPermissions(temp);

        break;
      case "READONLY":
        temp.map((p) =>
          p.IsReadOnly ? (p.IsSelected = true) : (p.IsSelected = false)
        );
        setPermissions(temp);
        break;
      case "ALL":
        temp.map((p) => (p.IsSelected = true));
        setPermissions(temp);
        break;

      default:
        break;
    }
  };
  const handleFilter=(e)=>{
    let arr = props.permissions;
    setFilterValue(e.target.value)
    let searchValue = e.target.value;

    arr = arr.filter(function (arr) {
      return arr.Page.toLowerCase().indexOf(searchValue) !== -1; // returns true or false
    });
    
    setPermissions(arr)
  }
  return (
    <Modal
      {...props}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
      className="modalPermission"
    >
      <Modal.Header closeButton></Modal.Header>
      <Modal.Body>
        <div className="filterCheckboxes">
        <div>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
           
              <Form.Control type="text" placeholder="page" onChange={handleFilter} value={filterValue}/>
            </Form.Group>
          </div>
          <div key={`inline-radio`} className="mb-3 checkboxes">
            <Form.Check
              inline
              label={t("all")}
              name="group1"
              key={"ALL"}
              onChange={() => handleChange("ALL")}
              type="radio"
              id={`inline-radio-1`}
            />
            <Form.Check
              inline
              key={"NONE"}
              label={t("none")}
              onChange={() => handleChange("NONE")}
              name="group1"
              type="radio"
              id={`inline-radio-2`}
            />
            <Form.Check
              inline
              key={"READONLY"}
              name="group1"
              onChange={() => handleChange("READONLY")}
              label={t("readOnly")}
              type="radio"
              id={`inline-radio-3`}
            />
          </div>
         
        </div>
        <Table className="tablePermission">
          <thead>
            <tr>
              {Object.keys(permissions[0])
                .filter((f) => f !== "CodePage")
                .map((k) => (
                  <th key={k}>{k}</th>
                ))}
            </tr>
          </thead>
          <tbody>
            {permissions.map((a, index) => (
              <tr key={index}>
                {Object.keys(a).map((key, index) => (
                  <td
                    key={key + index}
                    style={{ display: key === "CodePage" ? "none" : "" }}
                  >
                    {key === "IsSelected" ? (
                      <Form.Check
                        type="checkbox"
                        checked={a[key]}
                        onChange={(e) => handleCheck(a["CodePage"], e)}
                      />
                    ) : key === "IsReadOnly" ? (
                      <Form.Check
                        type="switch"
                        id="custom-switch"
                        defaultChecked={a[key]}
                        disabled
                      />
                    ) : (
                      a[key]
                    )}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </Table>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="primary" onClick={handleClickSave}>
          {t("save")}
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default PermissionModal;
