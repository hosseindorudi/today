import { useEffect } from "react";
import { Button, Form, Modal } from "react-bootstrap";
import { useTranslation } from "react-i18next";
import useAxios from "../../../customHooks/useAxios";
import useRequest from "../../../customHooks/useRequest";
import { toast } from "react-toastify";
import { useState } from "react";

const PasswordModal = (props) => {
  const [response, loading, fetchData] = useAxios();
  const request = useRequest();
  const { t } = useTranslation();
  const abortController = new AbortController();
  const [oldPass, setOldPass] = useState("");
  const [newPass, setNewPass] = useState("");
  const [newpassConfirm, setNewPassConfirm] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (newPass === newpassConfirm) {
      fetchData({
        method: "POST",
        url: props.changePasswordURL,
        headers: request,
        signal: abortController.signal,
        data: {
          Id: props.rowValues,
          Old: oldPass,
          New: newPass,
        },
      });
    } else {
      toast.error(t("passwordsDoesntMatch"), {
        position: toast.POSITION.BOTTOM_CENTER,
      });
    }
  };

  useEffect(() => {
    response && props.updated();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [response]);
  return (
    <Modal
      show={props.show}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
      onHide={props.onHide}
    >
      <Modal.Header closeButton></Modal.Header>
      <Modal.Body>
        <div className="tableModal">
          <form onSubmit={handleSubmit}>
            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label>{t("operatorOldPass")}</Form.Label>
              <Form.Control
                value={oldPass}
                type="Password"
                placeholder={t("operatorOldPass")}
                onChange={(e) => setOldPass(e.target.value)}
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label>{t("operatornewPass")}</Form.Label>
              <Form.Control
                value={newPass}
                type="Password"
                placeholder={t("operatornewPass")}
                onChange={(e) => setNewPass(e.target.value)}
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label>{t("operatornewPassConfirm")}</Form.Label>
              <Form.Control
                value={newpassConfirm}
                type="Password"
                placeholder={t("operatornewPassConfirm")}
                onChange={(e) => setNewPassConfirm(e.target.value)}
              />
            </Form.Group>

            <Modal.Footer>
              <Button type="submit" disabled={loading}>
                {" "}
                {t("operatorGroupFormSubmit")}
              </Button>
            </Modal.Footer>
          </form>
        </div>
      </Modal.Body>
    </Modal>
  );
};

export default PasswordModal;
