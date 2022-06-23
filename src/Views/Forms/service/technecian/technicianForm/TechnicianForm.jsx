import "./technician.css";
import React, { useEffect, useContext, useState } from "react";
import { TabContext } from "../../../../../contexts/TabContextProvider";
import Technician from "../technicianList/Technician";
import { useTranslation } from "react-i18next";
import { toast } from "react-toastify";
import useAxios from "../../../../../customHooks/useAxios";
import useRequest from "../../../../../customHooks/useRequest";
import BackDrop from "../../../../../Components/backDrop/BackDrop";
import { CustomReactMultiSelect } from "../../../../../Components/Select/customReactSelect";
import { warrantyTypeReadTitle } from "../../../../../services/warrantyType";
import { reasonForCancellationOfWarrantyReadTitle } from "../../../../../services/warrantyCancellationService";
import { statusDeviceProgressReadTitle } from "../../../../../services/statusDeviceProgress";
import axios from "axios";
import { statusDeviceStartReadTitle } from "../../../../../services/statusDeviceStart";
import { statusDeviceEndReadTitle } from "../../../../../services/statusDeviceEndService";
import { additionalServiceReadTitle } from "../../../../../services/additionalServiceService";
import { createSelectOptions } from "../../../../../validation/functions";
import { Button } from "react-bootstrap";
import { technicianCreate } from "../../../../../services/technicianService";
const TechnicianForm = () => {
  const [type, setType] = useState("");
  const [techDescription, setTechDescription] = useState("");
  const [statusDeviceEndDescription, setStatusDeviceEndDescription] =
    useState("");
  const [statusDeviceEndOptions, setStatusDeviceEndOptions] = useState([]);
  const [statusDeviceEnd, setStatusDeviceEnd] = useState("");
  const [statusDeviceProgressOptions, setStatusDeviceProgressOptions] =
    useState([]);
  const [statusDeviceProgressDescription, setStatusDeviceProgressDescription] =
    useState("");
  const [statusDeviceProgress, setStatusDeviceProgress] = useState("");
  const [warrantyTypeDescription, setWarrantyTypeDescription] = useState("");
  const [warrantyType, setWarrantytype] = useState([]);
  const [warrantyTypeOptions, setWarrantyTypeOptions] = useState([]);
  const [warrantyCancelReason, setWarrantyCancelReason] = useState("");
  const [warrantyCancelReasonOptions, setWarrantyCancelReasonOptions] =
    useState([]);
  const [warrantyCancelReasonDescription, setWarrantyCancelReasonDescription] =
    useState("");
  const [statusDeviceStartDescription, setStatusDeviceStartDescription] =
    useState("");
  const [statusDeviceStartOptions, setStatusDeviceStartOptions] = useState([]);
  const [statusDeviceStart, setStatusDeviceStart] = useState("");
  const [files, setFiles] = useState([]);
  const [tip, setTip] = useState("");
  const [extraServicesOptions, setExtraServicesOptions] = useState([]);
  const [extraServicesValue, setExtraServicesValue] = useState([]);
  const tabContext = useContext(TabContext);
  const abortController = new AbortController();
  const [response, loading, fetchData, setResponse] = useAxios();
  const request = useRequest();
  const { t } = useTranslation();
  const createParams = (service) => {
    const params = {
      method: "POST",
      url: service,
      headers: {
        accept: "*/*",
      },
      data: request,
    };
    return params;
  };
  const getDatas = () => {
    const warrantyTypesTitles = axios.request(
      createParams(warrantyTypeReadTitle)
    );
    const warrantyCancellationTitles = axios.request(
      createParams(reasonForCancellationOfWarrantyReadTitle)
    );
    const statusDeviceStartTitles = axios.request(
      createParams(statusDeviceStartReadTitle)
    );
    const statusDeviceProgressTitles = axios.request(
      createParams(statusDeviceProgressReadTitle)
    );
    const statusDeviceEndTitles = axios.request(
      createParams(statusDeviceEndReadTitle)
    );
    const additionalServiceTitles = axios.request(
      createParams(additionalServiceReadTitle)
    );
    axios
      .all([
        warrantyTypesTitles,
        warrantyCancellationTitles,
        statusDeviceStartTitles,
        statusDeviceProgressTitles,
        statusDeviceEndTitles,
        additionalServiceTitles,
      ])
      .then(
        axios.spread((...allData) => {
          allData[0].data?.Result
            ? setWarrantyTypeOptions(createSelectOptions(allData[0].data.Title))
            : handleError(allData[0].data.Message);
          allData[1].data?.Result
            ? setWarrantyCancelReasonOptions(
                createSelectOptions(allData[1].data.Title)
              )
            : handleError(allData[1].data.Message);
          allData[2].data?.Result
            ? setStatusDeviceStartOptions(
                createSelectOptions(allData[2].data.Title)
              )
            : handleError(allData[2].data.Message);
          allData[3].data?.Result
            ? setStatusDeviceProgressOptions(
                createSelectOptions(allData[3].data.Title)
              )
            : handleError(allData[3].data.Message);
          allData[4].data?.Result
            ? setStatusDeviceEndOptions(
                createSelectOptions(allData[4].data.Title)
              )
            : handleError(allData[4].data.Message);
          allData[5].data?.Result
            ? setExtraServicesOptions(
                createSelectOptions(allData[5].data.Title)
              )
            : handleError(allData[5].data.Message);
        })
      )
      .catch((error) => {
        handleError(error.message);
      });
  };
  useEffect(() => {
    let loaded = false;
    if (!loaded) {
      getDatas();
    }
    return () => {
      loaded = true;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleError = (message) => {
    toast.error(message, {
      position: toast.POSITION.BOTTOM_CENTER,
    });
  };

  //   const handleSeccess=(message)=>{

  //     toast.success(message, {
  //       position: toast.POSITION.BOTTOM_CENTER,
  //     });
  //   }

  const handleSubmit = () => {
    fetchData({
      method: "POST",
      url: technicianCreate,
      headers: {
        accept: "*/*",
      },
      data: {
        Request: request,
        Id: 0,
        Admission_Id: 0,
        Customer_Id: 0,
        Group_Id: 0,
        Operator_Id: 0,
        WarrantyType_Id: 0,
        ReasonForCancellationOfWarranty_Id: 0,
        StatusDeviceStart_Id: 0,
        StatusDeviceProgress_Id: 0,
        StatusDeviceEnd_Id: 0,
        Description_WarrantyType: 0,
        Description_CancellationOfWarranty: 0,
        Description_StatusDeviceStart: "string",
        Description_StatusDeviceProgress: "string",
        Description_StatusDeviceEnd: "string",
        Fee: 0,
        Description: "string",
        SourceType: 0,
        Registrar: 0,
        DateSet: "2022-06-23T07:16:16.961Z",
        Admission_Title: "string",
        Customer_Title: "string",
        Group_Title: "string",
        Operator_Title: "string",
        WarrantyType_Title: "string",
        ReasonForCancellationOfWarranty_Title: "string",
        StatusDeviceStart_Title: "string",
        StatusDeviceProgress_Title: "string",
        StatusDeviceEnd_Title: "string",
        AdditionalService: [
            0
          ],
          Attachment: [
            "string"
          ]
      },
      signal: abortController.signal,
    });
  };

  return (
    <main className="maintech">
      <div className="techmainDiv">
        <div className="techFirstDiv">
          <div className="techRight">
            <div>
              {" "}
              <span>{t("tech.phoneOwnerName")}</span>
              <span>حسین درودی</span>{" "}
            </div>
            <div>
              {" "}
              <span>{t("tech.phoneFamilyname")}</span>
              <span>حسین درودی</span>{" "}
            </div>
            <div>
              {" "}
              <span>{t("tech.province")}</span>
              <span>تهران</span>{" "}
            </div>
            <div>
              <span>{t("tech.city")}</span>
              <span>تهران</span>{" "}
            </div>
          </div>
          <div className="tehMiddle">
            <div>
              {" "}
              <span>{t("tech.brand")}</span>
              <span>حسین درودی</span>{" "}
            </div>
            <div>
              {" "}
              <span>{t("tech.model")}</span>
              <span>حسین درودی</span>{" "}
            </div>
            <div>
              {" "}
              <span>{t("tech.type")}</span>
              <span>تهران</span>{" "}
            </div>
            <div>
              <span>{t("tech.serial")}</span>
              <span>تهران</span>{" "}
            </div>
            <div>
              <span>{t("tech.color")}</span>
              <span>تهران</span>{" "}
            </div>
            <div>
              <span>{t("tech.gig")}</span>
              <span>تهران</span>{" "}
            </div>
          </div>
          <div className="techLeft">
            <div>
              {" "}
              <span>{t("tech.admissionDate")}</span>
              <span>حسین درودی</span>{" "}
            </div>
            <div>
              {" "}
              <span>{t("tech.admissionTime")}</span>
              <span>حسین درودی</span>{" "}
            </div>
            <div>
              {" "}
              <span>{t("tech.admissionOperator")}</span>
              <span>تهران</span>{" "}
            </div>
          </div>
        </div>
        <hr className="techHR" />
        <div className="techSecondDiv">
          <div className="techWarrantyStatus">
            <div className="techWarranty">
              <div className="techWarrantyType">
                <label htmlFor="techW">{t("tech.warrantyStatus")}</label>
                <div id="techW" className="techWarDiv">
                  <div className="mSelectDiv">
                    <CustomReactMultiSelect
                      isMulti={false}
                      options={warrantyTypeOptions}
                      value={warrantyType}
                      onchangeHandler={(e) => setWarrantytype(e)}
                      placeholder={t("tech.warrantyStatus")}
                    />
                  </div>
                  <textarea
                    className="techWarrantyText1"
                    placeholder={t("Description")}
                    rows={"3"}
                    onChange={(e) => setWarrantyTypeDescription(e.target.value)}
                    value={warrantyTypeDescription}
                  />
                </div>
              </div>
              <div className="cancelReasonDiv">
                <label htmlFor="techWT">
                  {t("tech.warrantyCancellationReason")}
                </label>
                <div id="techWT" className="techWT">
                  <div className="mSelectDiv">
                    <CustomReactMultiSelect
                      isMulti={false}
                      options={warrantyCancelReasonOptions}
                      value={warrantyCancelReason}
                      onchangeHandler={(e) => setWarrantyCancelReason(e)}
                      placeholder={t("tech.warrantyCancellationReason")}
                    />
                  </div>
                  <textarea
                    className="techWarrantyText1"
                    placeholder={t("Description")}
                    rows={"3"}
                    value={warrantyCancelReasonDescription}
                    onChange={(e) =>
                      setWarrantyCancelReasonDescription(e.target.value)
                    }
                  />
                </div>
              </div>
            </div>
            <div className="techStatus">
              <div className="firstTechStatus">
                <label htmlFor="techSs">{t("tech.firstState")}</label>
                <div id="techSs" className="techSs">
                  <div className="mSelectDiv">
                    <CustomReactMultiSelect
                      isMulti={false}
                      options={statusDeviceStartOptions}
                      value={statusDeviceStart}
                      onchangeHandler={(e) => setStatusDeviceStart(e)}
                      placeholder={t("tech.firstState")}
                    />
                  </div>
                  <textarea
                    className="techWarrantyText"
                    placeholder={t("description")}
                    value={statusDeviceStartDescription}
                    onChange={(e) =>
                      setStatusDeviceStartDescription(e.target.value)
                    }
                  />
                </div>
              </div>
              <div className="statusInProgressDiv">
                <label htmlFor="techSProg">{t("tech.progressState")}</label>
                <div id="techSProg" className="techSProg">
                  <div className="mSelectDiv">
                    <CustomReactMultiSelect
                      isMulti={false}
                      options={statusDeviceProgressOptions}
                      value={statusDeviceProgress}
                      onchangeHandler={(e) => setStatusDeviceProgress(e)}
                      placeholder={t("tech.progressState")}
                    />
                  </div>
                  <textarea
                    className="techWarrantyText"
                    placeholder={t("description")}
                    value={statusDeviceProgressDescription}
                    onChange={(e) =>
                      setStatusDeviceProgressDescription(e.target.value)
                    }
                  />
                </div>
              </div>
              <div className="finalTechStatus">
                <label htmlFor="techSEnd">{t("tech.finalState")}</label>
                <div id="techSEnd" className="techSEnd">
                  <div className="mSelectDiv">
                    <CustomReactMultiSelect
                      isMulti={false}
                      options={statusDeviceEndOptions}
                      value={statusDeviceEnd}
                      onchangeHandler={(e) => setStatusDeviceEnd(e)}
                      placeholder={t("tech.finalState")}
                    />
                  </div>
                  <textarea
                    className="techWarrantyText"
                    placeholder={t("description")}
                    value={statusDeviceEndDescription}
                    onChange={(e) =>
                      setStatusDeviceEndDescription(e.target.value)
                    }
                  />
                </div>
              </div>
            </div>
          </div>
          <div className="techDescDiv">
            <label htmlFor="techdescription" className="techDescLabel">
              {t("tech.techDescription")}
            </label>
            <textarea
              className="technicalDescription"
              id="techdescription"
              rows="4"
              placeholder={t("tech.techDescription")}
              value={techDescription}
              onChange={(e) => setTechDescription(e.target.value)}
            />
          </div>
          <div className="techFooterDiv">
            <div className="techDownRight">
              <label htmlFor="" className="labelMargin">
                {t("tech.extraServices")}
              </label>
              <div className="techDownRightDiv">
                <div className="mSelectDiv">
                  <CustomReactMultiSelect
                    isMulti={true}
                    options={extraServicesOptions}
                    value={extraServicesValue}
                    onchangeHandler={(e) => setExtraServicesValue(e)}
                    placeholder={t("tech.extraServices")}
                  />
                </div>
              </div>
            </div>
            <div className="techDownMiddle">
              <label htmlFor="" className="labelMargin">
                {t("tech.additions")}
              </label>
              <div className="techDownRightDiv">
                <div className="accordingDiv">
                  <input
                    type="file"
                    name="filefield"
                    multiple="multiple"
                    onChange={(e) => setFiles(e.target.files)}
                    value={files}
                  />
                </div>
              </div>
            </div>

            <div className="techDownLeft">
              <label htmlFor="" className="labelMargin">
                {t("tech.pay")}
              </label>
              <div className="techDownRightDiv">
                <div className="tipDiv">
                  <input
                    type="number"
                    className="tip"
                    value={tip}
                    onChange={(e) => setTip(e.target.value)}
                  />
                  <span>تومان</span>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="submitBtnTech">
          <Button onClick={handleSubmit}>{t("submit")}</Button>
        </div>
      </div>
    </main>
  );
};

export default TechnicianForm;
