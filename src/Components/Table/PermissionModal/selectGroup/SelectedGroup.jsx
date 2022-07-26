import React, { useEffect, useState } from "react";
import { Container, Row, Col, Form, Modal, Button } from "react-bootstrap";
import useAxios from "../../../../customHooks/useAxios";
import useRequest from "../../../../customHooks/useRequest";
import { groupGetPermission } from "../../../../services/groupService";
import BackDrop from "../../../backDrop/BackDrop";
const SelectedGroup = (props) => {
  const groups = props.groups;
  const [response,loading, fetchData] = useAxios();
  const request = useRequest();
  const abortController = new AbortController();
  const [type , setType] = useState("")


  const copyPermission = (id) => {
    console.log(id)
    setType("GETPERMISSION");
    fetchData({
      method: "POST",
      url: groupGetPermission,
      headers: request,
      data: {
        Id:id
      },
      signal: abortController.signal,
    });
  }
  const addNewPermission = (id) => {
    console.log(id)
    setType("GETNEWPERMISSION");
    fetchData({
      method: "POST",
      url: groupGetPermission,
      headers: request,
      data: {
        Id:id
      },
      signal: abortController.signal,
    });
  }

  const compareAndAdd =(res) => {
    console.log(res)

    let temp = [...props.permissions]
    const addTemp = [...res]

    for(let i=0; i< temp.length; i++) {
        if(temp[i].IsSelected === false & addTemp[i].IsSelected === true) {
            temp[i].IsSelected = true
        }
    }

    props.setPermissions(temp)
    props.setModalGroup(false)

  }

  useEffect(() => {
    response && handleResponse(response, type);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [response]);

  const handleResponse = (response, type) => {
    switch (type) {
      case "GETPERMISSION":
        props.setPermissions(response.AccessList);
        setType("")
        props.setModalGroup(false)
        break;
      case "GETNEWPERMISSION":
        compareAndAdd(response.AccessList);
        setType("")
        break;
      default:
        break;
    }
  };


  return (
    <>
    {loading && <BackDrop open={true} />}

    <Modal
      show={props.tableModalShow}
      size="md"
      aria-labelledby="contained-modal-title-vcenter"
      centered
      backdrop="static"
      keyboard={false}
      onHide={props.onHide}
      className="editModalPeriority"
    >
      <Modal.Header closeButton></Modal.Header>
      <Form>
        <Modal.Body>
          <Container>
            {groups.map((group) => (
              <Row className="mb-3 border-bottom border-lightgray d-flex justify-content-between" key={group.Id}>
                <Col>{group.Value}</Col>
                <Col className="d-flex justify-content-end mb-2">
                    <Button className="m-1" variant="outline-warning" size="sm" onClick={() => addNewPermission(group.Id)}>اضافه کردن</Button>
                    <Button className="m-1" variant="outline-info" size="sm" onClick={() => copyPermission(group.Id)}>کپی</Button>
                </Col>
              </Row>
            ))}
          </Container>
        </Modal.Body>

      </Form>
    </Modal>
    </>
  );
};

export default SelectedGroup;
