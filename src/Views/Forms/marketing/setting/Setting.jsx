import React, { useEffect, useState } from "react";
import { Button, Form } from "react-bootstrap";
import { useTranslation } from "react-i18next";
import { toast } from "react-toastify";
import BackDrop from "../../../../Components/backDrop/BackDrop";
import useAxios from "../../../../customHooks/useAxios";
import useRequest from "../../../../customHooks/useRequest";
import { enums } from "../../../../data/Enums";
import {
  SettingAccessList,
  SettingFavorite,
  SettingLog,
  SettingRead,
  SettingUpdate,
} from "../../../../services/settingService";
import SideButtons from "../../../../Components/sideButtons/SideButtons";
const styles = {
  ParentSetting: {
    display: "flex",
  },
  side:{
    display:"flex",
    flexDirection:"column",
    justifyContent:"center",
    flexGrow:2
  },
  main:{
    flexGrow:8,
    display:"flex",
    justifyContent:"center"
  },
  form:{
    display:"flex",
    flexDirection:"column",
    alignItems:"center",
    width:"80%"
  }
};
const Setting = () => {
  const [response, loading, fetchData] = useAxios();
  const [IsFavorite, setIsFavorite] = useState(false);
  const [data, setData] = useState(null);
  const [type, setType] = useState("");
  const { t } = useTranslation();
  const request = useRequest();
  useEffect(() => {
    setType("READ");
    fetchData({
      method: "POST",
      url: SettingRead,
      headers: request,
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    response && handleResponse(response, type);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [response]);
  const handleResponse = (response, type) => {
    switch (type) {
      case "READ":
        setData(response.Record);
        setIsFavorite(response.IsFavorite)
        break;
      case "UPDATE":
        toast.success(t("updatedRecord"), {
          position: toast.POSITION.TOP_CENTER,
        });
        break;
      default:
        break;
    }
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    setType("UPDATE");
    fetchData({
      method: "POST",
      url: SettingUpdate,
      headers: request,
      data: data,
    });
  };
  const handleChange = (name, value) => {
    setData({ ...data, [name]: value });
  };

  return (
    <div style={styles.ParentSetting}>
      {loading && <BackDrop open={true} />}
      <div style={styles.side}>
        <SideButtons
          logApi={SettingLog}
          favApi={SettingFavorite}
          accessListApi={SettingAccessList}
          logAccess={enums.Setting_Setting_Log_r}
          accessListAccess={enums.Setting_Setting_Read_r}
          IsFavorite={IsFavorite}
          setIsFavorite={setIsFavorite}
        />
      </div>
      <div style={styles.main}>
        <Form style={styles.form} onSubmit={handleSubmit}>
          <b>{t("Setting")}</b>
          {data && (
            <>
              <div className="Row ">
                <Form.Group className="mb-3" controlId={"Activated"}>
                  <Form.Label>{t("Hamta_IsActive")}</Form.Label>
                  <Form.Check
                    style={{ textAlign: "center" }}
                    type="switch"
                    checked={data.Hamta_IsActive}
                    name="Hamta_IsActive"
                    onChange={(e) =>
                      handleChange(e.target.name, e.target.checked)
                    }
                  />
                </Form.Group>
              </div>
              <div className="Row ">
                <Form.Group className="mb-3" controlId={"Hamta_Url"}>
                  <Form.Label>{t("Hamta_Url")}</Form.Label>
                  <Form.Control
                    value={data.Hamta_Url}
                    name="Hamta_Url"
                    onChange={(e) =>
                      handleChange(e.target.name, e.target.value)
                    }
                    disabled={!data.Hamta_IsActive}
                  />
                </Form.Group>
                <Form.Group className="mb-3" controlId={"Hamta_Username"}>
                  <Form.Label>{t("Hamta_Username")}</Form.Label>
                  <Form.Control
                    value={data.Hamta_Username}
                    name="Hamta_Username"
                    onChange={(e) =>
                      handleChange(e.target.name, e.target.value)
                    }
                    disabled={!data.Hamta_IsActive}
                  />
                </Form.Group>
                <Form.Group className="mb-3" controlId={"Hamta_Password"}>
                  <Form.Label>{t("Hamta_Password")}</Form.Label>
                  <Form.Control
                    value={data.Hamta_Password}
                    name="Hamta_Password"
                    type="password"
                    onChange={(e) =>
                      handleChange(e.target.name, e.target.value)
                    }
                    disabled={!data.Hamta_IsActive}
                  />
                </Form.Group>
              </div>
              <div className="Row ">
                <Form.Group className="mb-3" controlId={"Email_IsActive"}>
                  <Form.Label>{t("Email_IsActive")}</Form.Label>
                  <Form.Check
                    style={{ textAlign: "center" }}
                    type="switch"
                    checked={data.Email_IsActive}
                    name="Email_IsActive"
                    onChange={(e) =>
                      handleChange(e.target.name, e.target.checked)
                    }
                  />
                </Form.Group>
                <Form.Group className="mb-3" controlId={"Email_IsSsl"}>
                  <Form.Label>{t("Email_IsSsl")}</Form.Label>
                  <Form.Check
                    style={{ textAlign: "center" }}
                    type="switch"
                    checked={data.Email_IsSsl}
                    name="Email_IsSsl"
                    onChange={(e) =>
                      handleChange(e.target.name, e.target.checked)
                    }
                  />
                </Form.Group>
              </div>
              <div className="Row ">
                <Form.Group className="mb-3" controlId={"Email_Address"}>
                  <Form.Label>{t("Email_Address")}</Form.Label>
                  <Form.Control
                    value={data.Email_Address}
                    name="Email_Address"
                    onChange={(e) =>
                      handleChange(e.target.name, e.target.value)
                    }
                    disabled={!data.Email_IsActive}
                  />
                </Form.Group>
                <Form.Group className="mb-3" controlId={"Email_Password"}>
                  <Form.Label>{t("Email_Password")}</Form.Label>
                  <Form.Control
                    value={data.Email_Password}
                    name="Email_Password"
                    type="password"
                    onChange={(e) =>
                      handleChange(e.target.name, e.target.value)
                    }
                    disabled={!data.Email_IsActive}
                  />
                </Form.Group>
              </div>
              <div className="Row ">
                <Form.Group className="mb-3" controlId={"Email_SMTPHost"}>
                  <Form.Label>{t("Email_SMTPHost")}</Form.Label>
                  <Form.Control
                    value={data.Email_SMTPHost}
                    name="Email_SMTPHost"
                    onChange={(e) =>
                      handleChange(e.target.name, e.target.value)
                    }
                    disabled={!data.Email_IsActive}
                  />
                </Form.Group>
                <Form.Group className="mb-3" controlId={"Email_SMTPPort"}>
                  <Form.Label>{t("Email_SMTPPort")}</Form.Label>
                  <Form.Control
                    value={data.Email_SMTPPort}
                    name="Email_SMTPPort"
                    type="number"
                    onChange={(e) =>
                      handleChange(e.target.name, e.target.value)
                    }
                    disabled={!data.Email_IsActive}
                  />
                </Form.Group>
              </div>
              <div className="Row ">
                <Form.Group className="mb-3" controlId={"SMS_IsActive"}>
                  <Form.Label>{t("SMS_IsActive")}</Form.Label>
                  <Form.Check
                    style={{ textAlign: "center" }}
                    type="switch"
                    checked={data.SMS_IsActive}
                    name="SMS_IsActive"
                    onChange={(e) =>
                      handleChange(e.target.name, e.target.checked)
                    }
                  />
                </Form.Group>
              </div>
              <div className="Row ">
                <Form.Group className="mb-3" controlId={"SMS_Url"}>
                  <Form.Label>{t("SMS_Url")}</Form.Label>
                  <Form.Control
                    value={data.SMS_Url}
                    name="SMS_Url"
                    onChange={(e) =>
                      handleChange(e.target.name, e.target.value)
                    }
                    disabled={!data.SMS_IsActive}
                  />
                </Form.Group>
                <Form.Group className="mb-3" controlId={"SMS_Number"}>
                  <Form.Label>{t("SMS_Number")}</Form.Label>
                  <Form.Control
                    value={data.SMS_Number}
                    name="SMS_Number"
                    onChange={(e) =>
                      handleChange(e.target.name, e.target.value)
                    }
                    disabled={!data.SMS_IsActive}
                  />
                </Form.Group>
                <Form.Group className="mb-3" controlId={"SMS_Username"}>
                  <Form.Label>{t("SMS_Username")}</Form.Label>
                  <Form.Control
                    value={data.SMS_Username}
                    name="SMS_Username"
                    onChange={(e) =>
                      handleChange(e.target.name, e.target.value)
                    }
                    disabled={!data.SMS_IsActive}
                  />
                </Form.Group>
              </div>
              <div className="Row ">
                <Form.Group className="mb-3" controlId={"SMS_Password"}>
                  <Form.Label>{t("SMS_Password")}</Form.Label>
                  <Form.Control
                    value={data.SMS_Password}
                    name="SMS_Password"
                    type="password"
                    onChange={(e) =>
                      handleChange(e.target.name, e.target.value)
                    }
                    disabled={!data.SMS_IsActive}
                  />
                </Form.Group>
                <Form.Group className="mb-3" controlId={"SMS_Company"}>
                  <Form.Label>{t("SMS_Company")}</Form.Label>
                  <Form.Control
                    value={data.SMS_Company}
                    name="SMS_Company"
                    onChange={(e) =>
                      handleChange(e.target.name, e.target.value)
                    }
                    disabled={!data.SMS_IsActive}
                  />
                </Form.Group>
              </div>
              <div className="Row ">
                <Form.Group className="mb-3" controlId={"WhatsApp_IsActive"}>
                  <Form.Label>{t("WhatsApp_IsActive")}</Form.Label>
                  <Form.Check
                    style={{ textAlign: "center" }}
                    type="switch"
                    checked={data.WhatsApp_IsActive}
                    name="WhatsApp_IsActive"
                    onChange={(e) =>
                      handleChange(e.target.name, e.target.checked)
                    }
                  />
                </Form.Group>
              </div>
              <div className="Row ">
                <Form.Group className="mb-3" controlId={"WhatsApp_Url"}>
                  <Form.Label>{t("WhatsApp_Url")}</Form.Label>
                  <Form.Control
                    value={data.WhatsApp_Url}
                    name="WhatsApp_Url"
                    onChange={(e) =>
                      handleChange(e.target.name, e.target.value)
                    }
                    disabled={!data.WhatsApp_IsActive}
                  />
                </Form.Group>
                <Form.Group className="mb-3" controlId={"WhatsApp_Number"}>
                  <Form.Label>{t("WhatsApp_Number")}</Form.Label>
                  <Form.Control
                    value={data.WhatsApp_Number}
                    name="WhatsApp_Number"
                    onChange={(e) =>
                      handleChange(e.target.name, e.target.value)
                    }
                    disabled={!data.WhatsApp_IsActive}
                  />
                </Form.Group>
              </div>
              <div className="Row ">
                <Form.Group className="mb-3" controlId={"Hamvar_IsActive"}>
                  <Form.Label>{t("Hamvar_IsActive")}</Form.Label>
                  <Form.Check
                    style={{ textAlign: "center" }}
                    type="switch"
                    checked={data.Hamvar_IsActive}
                    name="Hamvar_IsActive"
                    onChange={(e) =>
                      handleChange(e.target.name, e.target.checked)
                    }
                  />
                </Form.Group>
              </div>
              <div className="Row ">
                <Form.Group className="mb-3" controlId={"Hamvar_Url"}>
                  <Form.Label>{t("Hamvar_Url")}</Form.Label>
                  <Form.Control
                    value={data.Hamvar_Url}
                    name="Hamvar_Url"
                    onChange={(e) =>
                      handleChange(e.target.name, e.target.value)
                    }
                    disabled={!data.Hamvar_IsActive}
                  />
                </Form.Group>
                <Form.Group className="mb-3" controlId={"Hamvar_Username"}>
                  <Form.Label>{t("Hamvar_Username")}</Form.Label>
                  <Form.Control
                    value={data.Hamvar_Username}
                    name="Hamvar_Username"
                    onChange={(e) =>
                      handleChange(e.target.name, e.target.value)
                    }
                    disabled={!data.Hamvar_IsActive}
                  />
                </Form.Group>
                <Form.Group className="mb-3" controlId={"Hamvar_Password"}>
                  <Form.Label>{t("Hamvar_Password")}</Form.Label>
                  <Form.Control
                    value={data.Hamvar_Password}
                    name="Hamvar_Password"
                    type="password"
                    onChange={(e) =>
                      handleChange(e.target.name, e.target.value)
                    }
                    disabled={!data.Hamvar_IsActive}
                  />
                </Form.Group>
              </div>
              <div className="Row ">
                <Form.Group
                  className="mb-3"
                  controlId={"Setting_ComplexityOfPassword"}
                >
                  <Form.Label>{t("Setting_ComplexityOfPassword")}</Form.Label>
                  <Form.Check
                    style={{ textAlign: "center" }}
                    type="switch"
                    checked={data.Setting_ComplexityOfPassword}
                    name="Setting_ComplexityOfPassword"
                    onChange={(e) =>
                      handleChange(e.target.name, e.target.checked)
                    }
                  />
                </Form.Group>
              </div>
            </>
          )}
          <Button disabled={loading} type="submit">
            {t("edit")}
          </Button>
        </Form>
      </div>
    </div>
  );
};

export default Setting;
