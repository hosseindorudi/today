import { t } from "i18next";
import React, { useEffect, useState } from "react";
import { Button, Form, Modal, Table } from "react-bootstrap";
import "./PermissionModal.css";
import SelectedGroup from "./selectGroup/SelectedGroup";
import { groupTitle } from "../../../services/operatorService";
import useAxios from "../../../customHooks/useAxios";
import BackDrop from "../../backDrop/BackDrop";
import useRequest from "../../../customHooks/useRequest";
import * as fa from 'react-icons/fa'
const PermissionModal = (props) => {
  const [response, loading, fetchData] = useAxios();
  const request = useRequest();
  const abortController = new AbortController();
  const [type , setType] = useState("")
  const [groups, setGroups] = useState()
  const [modalGroup, setModalGroup] = useState(false)
  const [permissions, setPermissions] = useState([]);
  const [checked, setChecked] = useState("");
  const values = props.permissions;
  const [filterValue, setFilterValue] = useState("");
  const radioTypes = ["READONLY", "ALL", "NONE"];
  useEffect(() => {
    setPermissions(values);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const getPermissionGroup = () => {
    setType("READTITLE");
    fetchData({
      method: "POST",
      url: groupTitle,
      headers: request,
      signal: abortController.signal,
    });
  }

  useEffect(() => {
    response && handleResponse(response, type);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [response]);

  const handleResponse = (response, type) => {
    switch (type) {
      case "READTITLE":
        setGroups(response.Title);
        setType("")
        setModalGroup(true)
        break;
      default:
        break;
    }
  };

  const handleCheck = (codePage, e) => {
    const checked = e.target.checked;
    const temp = [...permissions];
    let index = temp.findIndex((i) => i.CodePage === codePage);
    if (index !== -1) {
      temp[index] = {
        ...temp[index],
        IsSelected: checked,
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
    setChecked(key);
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
  const handleFilter = (e) => {
    setChecked("");
    setFilterValue(e.target.value);
    let searchValue = e.target.value;

    let arr = values.filter(function (arr) {
      return t(arr.Page).toLowerCase().indexOf(searchValue) !== -1; // returns true or false
    });

    setPermissions(arr);
  };
  return (
    <>
    {loading && <BackDrop open={true} />}

    {modalGroup && (
        <SelectedGroup
          groups={groups}
          onHide={() => setModalGroup(false)}
          tableModalShow={modalGroup}
          setPermissions={setPermissions}
          setModalGroup={setModalGroup}
          permissions={permissions}
        />
      )}
    <Modal
      {...props}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
      className="modalPermission"
    >
      <Modal.Header closeButton></Modal.Header>
      <Modal.Body className="modalTopPad">
        <div className="filterCheckboxes">
          <div>
            <Form.Group className="mb-3 Row" controlId="exampleForm.ControlInput1">
              <Form.Control
                type="text"
                placeholder={t("Page")}
                onChange={handleFilter}
                value={filterValue}
              />
              <Button variant="outline-primary" size="sm" onClick={getPermissionGroup}>دسترسی</Button>

            </Form.Group>
          </div>
          <div key={`inline-radio`} className="mb-3 checkboxes">
            {radioTypes.map((r, i) => (
              <Form.Check
                inline
                value={checked}
                checked={checked===r?true:false}
                label={t(r.toLocaleLowerCase())}
                name="group1"
                key={i}
                onChange={() => handleChange(r)}
                type="radio"
                id={`inline-radio-1`}
              />
            ))}
          </div>
        </div>
        <Table className="tablePermission">
          <thead className="permissionTableRow">
            <tr >
              {Object.keys(permissions.length > 0 && permissions[0])
                .filter((f) => f !== "CodePage")
                .map((k) => (
                  <th key={k}>{t(k)}</th>
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
                      a[key] ? 
                       <fa.FaReadme style={{color:"green"}}/>
                       :
                       <fa.FaFileSignature style={{color:"red"}}/>
                      

                    ) : (
                      <>{t(a[key])}</>
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
    </>
  );
};

export default PermissionModal;
