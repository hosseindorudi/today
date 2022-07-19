import { useRef, useState, useContext, useEffect } from "react";
import { useTranslation } from "react-i18next";
import Select from "react-select";
import chroma from "chroma-js";
import { toast } from "react-toastify";
import SignaturePad from "./signaturePad/src";
import BackDrop from "../../../../Components/backDrop/BackDrop";
import { enums } from "../../../../data/Enums";
import { TabContext } from "../../../../contexts/TabContextProvider";
import useAxios from "../../../../customHooks/useAxios";
import useRequest from "../../../../customHooks/useRequest";
import { admitionCreate } from "../../../../services/admitionService";
import { admissionAccessoryReadTitle } from "../../../../services/admissionAccessory";
// import { productGroupCreate } from "../../../../services/productGroup";
import Admission from "./Admission";
import { defectReadTitle } from "../../../../services/defectService";
import PatternModal from "../../../../Components/Table/PatternModal/PatternModal";
import useWindowSize from "../../../../customHooks/useWindowSize";

const AmitionFinalForm = () => {
  const [type, setType] = useState("");
  const [textRecieved, setTextRecieved] = useState("");
  const [textDivVal, setTextDivVal] = useState(false);
  const [patternLock, setpatternLock] = useState(false);
  const [patternLockSize, setPatternLockSize] = useState("0");
  const [gmailVal, setGmailVal] = useState(false);
  const [passVal, setPassVal] = useState(false);
  const [agentDescVal, setAgentDescVal] = useState(false);
  const [patternArr, setPatternArr] = useState("");
  const [password, setPassword] = useState("");
  const [account, setAccount] = useState("");
  const [operatorDesc, setOperatorDesc] = useState("");

  const [accessoryTitles, setAccessoriesTitles] = useState([]);
  const [deffectTitles, setDeffectTitles] = useState([]);
  const [imeiInp, setIMEIInp] = useState("");
  const [selectesDeffect, setSelectedDeffect] = useState([]);
  const [selectesAccessory, setSelectedAccessory] = useState([]);
  const sigPad = useRef({});
  const sigPadCustomer = useRef({});
  const abortController = new AbortController();
  const [response, loading, fetchData, setResponse] = useAxios();
  const request = useRequest();
  const { t } = useTranslation();
  const tabContext = useContext(TabContext);
  const { width } = useWindowSize();

  const handleClickMenu = () => {
    tabContext.addRemoveTabs(
      {
        title: "routes.groupForm",
        path: "/operatorgroupcreate",
        Component: AmitionFinalForm,
        access: enums.AfterSales_New_Admission_Create_w,
      },
      "remove"
    );
    tabContext.addRemoveTabs(
      {
        title: "routes.admission",
        path: "/AfterSales/Admission/Read",
        Component: Admission,
        access: enums.AfterSales_New_Admission_Read_r,
      },

      "add"
    );
  };

  useEffect(() => {
    handleFunctions("Accessory");
    // eslint-disable-next-line react-hooks/exhaustive-deps
  },[]);

  const handleFunctions = (type) => {
    switch (type) {
      case "Accessory":
        setType("Accessory");
        fetchData({
          method: "POST",
          url: admissionAccessoryReadTitle,
          headers: request,
          
          signal: abortController.signal,
        });
        break;
      case "Deffect":
        setType("Deffect");
        fetchData({
          method: "POST",
          url: defectReadTitle,
          headers: request,
          
          signal: abortController.signal,
        });
        break;

      default:
        break;
    }
  };

  const handleSeccess = (message) => {
    toast.success(message, {
      position: toast.POSITION.BOTTOM_CENTER,
    });
  };
  

  const handleResponse = (response, type) => {
    switch (type) {
      case "Accessory":

        response.Title.map((m, i) =>
          setAccessoriesTitles((prev) => [
            ...prev,
            { value: m.Id, label: m.Title, color: `#${m.Color}` },
          ])
        );

        setResponse(undefined);
        handleFunctions("Deffect");

        break;
      case "Deffect":

        response.Title.map((m, i) =>
          setDeffectTitles((prev) => [
            ...prev,
            { value: m.Id, label: m.Title, color: `#${m.Color}` },
          ])
        );

        setResponse(undefined);

        break;
      case "SUBMIT":
        handleSeccess(t("customer.created"));
        handleClickMenu();
        break;

      default:
        break;
    }
  };


  useEffect(() => {
    response&&handleResponse(response, type)
    
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [response]);

  



  const submitAdmitionForm = (e) => {
    e.preventDefault();
    let myDeffects = [];
    selectesDeffect.map((d, i) => myDeffects.push(d.value));
    let myAccessory = [];
    selectesAccessory.map((d, i) => myAccessory.push(d.value));

    setType("SUBMIT");
    fetchData({
      method: "POST",
      url: admitionCreate,
      headers: request,

      data: {
        Id: 0,
        Customer_Id: 21,
        ProductGroup_Id: 5,
        Product_Id: 4,
        Part_Id: 2,
        AdmissionStep_EId: 1,
        IsArchive: true,
        ModelName: "iPhone",
        ModelNumber: "09368659286",
        SerialNumber: "phone",
        IMEI1: imeiInp,
        IMEI2: "asdasdasd",
        CodeNumber: "asdasdasd",
        AdmissionNumber: "asdasdasd",
        IsHavePassword: password.length ? true : false, //
        Password: password,
        IsHavePattern: patternArr.length ? true : false,
        Pattern: patternArr.length ? patternArr : "",
        IsHaveAccount: account.length ? true : false,
        Account: account.length ? account : "",
        AdmissionDefect: myDeffects,
        AdmissionAccessory: myAccessory,
        Customer_Description: textRecieved,
        Customer_Signature: String(sigPadCustomer.current.toDataURL()),
        Operator_Description: operatorDesc,
        Operator_Signature: String(sigPad.current.toDataURL()),
        SourceType: 1,
        Registrar: 1,
        DateSet: "2022-06-20T04:46:16.961Z",
        Customer_Title: "",
        ProductGroup_Title: "",
        Product_Title: "",
        Part_Title: "",
        
      },
      signal: abortController.signal,
    });
  };

  const colourStyles = {
    control: (styles) => ({ ...styles, backgroundColor: "white" }),
    option: (styles, { data, isDisabled, isFocused, isSelected }) => {
      const color = chroma(data.color);
      return {
        ...styles,
        backgroundColor: isDisabled
          ? undefined
          : isSelected
          ? data.color
          : isFocused
          ? color.alpha(0.1).css()
          : undefined,
        color: isDisabled
          ? "#ccc"
          : isSelected
          ? chroma.contrast(color, "white") > 2
            ? "white"
            : "black"
          : data.color,
        cursor: isDisabled ? "not-allowed" : "default",

        ":active": {
          ...styles[":active"],
          backgroundColor: !isDisabled
            ? isSelected
              ? data.color
              : color.alpha(0.3).css()
            : undefined,
        },
      };
    },
    multiValue: (styles, { data }) => {
      const color = chroma(data.color);
      return {
        ...styles,
        backgroundColor: color.alpha(0.1).css(),
      };
    },
    multiValueLabel: (styles, { data }) => ({
      ...styles,
      color: data.color,
    }),
    multiValueRemove: (styles, { data }) => ({
      ...styles,
      color: data.color,
      ":hover": {
        backgroundColor: data.color,
        color: "white",
      },
    }),
  };

  return (
    <>
     {loading && <BackDrop open={true} />}
      {patternLock && (
        <PatternModal
          setPatternArr={setPatternArr}
          size={patternLockSize}
          setpatternLock={setpatternLock}
          onHide={() => setpatternLock(false)}
          tableModalShow={patternLock}
          show={patternLock}
          width={width}
        />
      )}

      <div className="mainAdmitionDiv">
        <div className="recievedmainDiv">
          <span className="recievedSpan">{t("recievtionID")}</span>
          <div className="recievedDiv">
            <span></span>
            <span>555555555555555</span>
            <button className="recievedNew">{t("admissionNew")}</button>
          </div>
          <input
            type="text"
            className="admissionIMEI"
            placeholder="IMEI"
            value={imeiInp}
            onChange={(e) => setIMEIInp(e.target.value)}
          />
        </div>
        <div className="admitionSecondDiv">
          <div className="customerList">
            <span className="customerSpan">{t("routes.CustomerList")}</span>
            <div className="customerDiv">
              <div className="infoCustomerDiv">
                <div className="firstNameDiv">
                  <span className="firstNameSpanKey">{t("name")}:</span>
                  <span className="firstNameSpanValue">حسین</span>
                </div>
                <div className="firstNameDiv">
                  <span className="firstNameSpanKey">{t("lastName")}:</span>
                  <span className="firstNameSpanValue">درودی</span>
                </div>
                <div className="firstNameDiv">
                  <span className="firstNameSpanKey">{t("idcode")}:</span>
                  <span className="firstNameSpanValue">000000000</span>
                </div>
                <div className="firstNameDiv">
                  <span className="firstNameSpanKey">{t("admissionHomeNumber")}:</span>
                  <span className="firstNameSpanValue">0210000000</span>
                </div>
                <div className="firstNameDiv">
                  <span className="firstNameSpanKey">{t("phoneNumber")}:</span>
                  <span className="firstNameSpanValue">09120000000</span>
                </div>
                <div className="firstNameDiv">
                  <span className="firstNameSpanKey">{t("personInformationAddress")}:</span>
                  <span className="firstNameSpanValue">
                    یوسف آباد ابن سینا شایان 23 پلاک 9 ساختمان سی تلکام
                  </span>
                </div>
              </div>
              <div className="buttonCustomerEditDiv">
                <button className="editCustomer">{t("admissionEdit")}</button>
              </div>
            </div>
          </div>
          <div className="groupList">
            <span className="groupSpan">گروه</span>
            <div className="groupDiv">
              <div className="grouptDivRight">
                <div className="grouptDivRightMainDiv">
                  <span className="groupDivSpanKey">{t("admissionproductGroup")}:</span>
                  <span className="groupDivSpanValue">09120000000</span>
                </div>
                <div className="grouptDivRightMainDiv">
                  <span className="groupDivSpanKey">{t("routes.product")}:</span>
                  <span className="groupDivSpanValue">09120000000</span>
                </div>
                <div className="grouptDivRightMainDiv">
                  <span className="groupDivSpanKey">{t("admissionpart")}:</span>
                  <span className="groupDivSpanValue">09120000000</span>
                </div>
                <div className="grouptDivRightMainDiv">
                  <span className="groupDivSpanKey">{t("ModelName")}:</span>
                  <span className="groupDivSpanValue">09120000000</span>
                </div>
                <div className="grouptDivRightMainDiv">
                  <span className="groupDivSpanKey">{t("tech.serial")}:</span>
                  <span className="groupDivSpanValue">09120000000</span>
                </div>
                <div className="grouptDivRightMainDiv">
                  <span className="groupDivSpanKey">{t("CodeNumber")}:</span>
                  <span className="groupDivSpanValue">09120000000</span>
                </div>
              </div>
              <div className="grouptDivLeft">
                <div className="grouptDivRightMainDiv">
                  <span className="groupDivSpanKey">{t("admissionRam")}:</span>
                  <span className="groupDivSpanValue">09120000000</span>
                </div>
                <div className="grouptDivRightMainDiv">
                  <span className="groupDivSpanKey">{t("deviceColor")}:</span>
                  <span className="groupDivSpanValue">09120000000</span>
                </div>
                <div className="grouptDivRightMainDiv">
                  <span className="groupDivSpanKey">{t("deviceCreator")}:</span>
                  <span className="groupDivSpanValue">09120000000</span>
                </div>
                <div className="grouptDivRightMainDiv">
                  <span className="groupDivSpanKey">{t("admissionBuyDate")}:</span>
                  <span className="groupDivSpanValue">09120000000</span>
                </div>
                <div className="grouptDivRightMainDiv">
                  <span className="groupDivSpanKey">{t("nameLastNameINFODateTimeLabel")}:</span>
                  <span className="groupDivSpanValue">09120000000</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="admitionThirdDiv">
          <span className="admitionSpan">{t("menu.admission")}</span>
          <div className="admitionItemsDiv">
            <div className="deviceExtraDiv">
              <span className="extraDeviceSpan">{t("admissionDeffect")}</span>
              <div className="extraDeviceDiv" style={{ direction: "ltr" }}>
                <div className="multiSelectDiv">
                  <Select
                    closeMenuOnSelect={false}
                    isMulti
                    options={deffectTitles}
                    styles={colourStyles}
                    value={selectesDeffect}
                    onChange={(e) => setSelectedDeffect(e)}
                    placeholder={t("admissionDeffect")}
                  />
                </div>
              </div>
            </div>
            <div className="deviceExtraDiv">
              <span className="extraDeviceSpan1">{t("routes.accessories")}</span>
              <div className="extraDeviceDiv1" style={{ direction: "ltr" }}>
                <div className="multiSelectDiv">
                  {/* <Multiselect
                            onSelect={(e) => {setSelectedAccessory(e)}}
                            onRemove={(e) => {setSelectedAccessory(e)}}
                            emptyRecordMsg="آیتمی برای نمایش وجود ندارد"
                            id='multiSelected'
                            options={accessoryTitles}

                            displayValue="name" // Property name to display in the dropdown options
                            placeholder="لوازم همراه"
                            hidePlaceholder ={true}
                            showArrow={false}
                            /> */}
                  <Select
                    closeMenuOnSelect={false}
                    isMulti
                    options={accessoryTitles}
                    styles={colourStyles}
                    value={selectesAccessory}
                    onChange={(e) => setSelectedAccessory(e)}
                    placeholder={t("routes.accessories")}
                  />
                </div>
              </div>
            </div>

            <div className="acountPatternDiv">
              <span className="acountpatternSpan">{t("admissionpattern")}</span>
              <div className="paternAcountDiv">
                <div className="patternAcountButtons">
                  <button
                    className="btnPattern"
                    onClick={() => {
                      setpatternLock(!patternLock);
                      console.log(patternLock);
                    }}
                  >
                    {t("nameLastNameINFOBtnPattern")}
                  </button>
                  <div className="sectionDiv">
                    <select
                      className="selectionLock"
                      onChange={(e) => setPatternLockSize(e.target.value)}
                      onClick={() => setpatternLock(false)}
                    >
                      <option value="0">3*3</option>
                      <option value="1">4*3</option>
                      <option value="2">4*4</option>
                      <option value="3">5*4</option>
                      <option value="4">5*5</option>
                    </select>
                  </div>
                </div>
              </div>
            </div>

            <div className="acountInformationDiv">
              <span className="aountCustomerSpan">{t("admissionAcount")}</span>
              <div className="acountCustomerDiv">
                <div
                  className={gmailVal ? "acountDmailDiv2" : "acountDmailDiv"}
                >
                  <span
                    className={
                      gmailVal ? "acountDivGmailSpan2" : "acountDivGmailSpan"
                    }
                  >
                    {t("Email")}
                  </span>
                  <input
                    type="email"
                    value={account}
                    onFocus={(e) => setGmailVal(true)}
                    onBlur={(e) => setGmailVal(false)}
                    onChange={(e) => setAccount(e.target.value)}
                    className="acountInputSpan"
                  />
                </div>

                <div className={passVal ? "acountDmailDiv2" : "acountDmailDiv"}>
                  <span
                    className={
                      passVal ? "acountDivGmailSpan2" : "acountDivGmailSpan"
                    }
                  >
                    {t("password")}
                  </span>
                  <input
                    type="password"
                    value={password}
                    onFocus={(e) => setPassVal(true)}
                    onBlur={(e) => setPassVal(false)}
                    onChange={(e) => setPassword(e.target.value)}
                    className="acountInputSpan"
                  />
                </div>
              </div>
            </div>
            <div className="textFieldDescDiv">
              <span
                className={textDivVal ? "failedDescSpan2" : "failedDescSpan"}
              >
               {t("admissionDescription")}
              </span>
              <div className={textDivVal ? "DescDivFinal2" : "DescDivFinal"}>
                <textarea
                  name=""
                  className="textFieldDesc"
                  onFocus={(e) => setTextDivVal(true)}
                  onBlur={(e) => setTextDivVal(false)}
                  cols="30"
                  rows="10"
                  value={textRecieved}
                  onChange={(e) => setTextRecieved(e.target.value)}
                ></textarea>
              </div>
            </div>
            <div className="agentSignatur">
              <span className="agentSigSpan">{t("admissionSignature1")}</span>
              <div className="signaturePadDiv">
                <div className="sigMainDiv">
                  <SignaturePad
                    ref={sigPadCustomer}
                    sigType={"customer"}
                    clearButton="true"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="admitionForthDiv">
          <span className="agentSpan">{t("admissionAgent")}</span>
          <div className="agentItemsDiv">
            <div className="agentDescription">
              <div className="agentescriptionDiv">
                <span
                  className={
                    agentDescVal
                      ? "agentDescriptionSpan2"
                      : "agentDescriptionSpan"
                  }
                >
                  {t("admissionDescription")}
                </span>
                <div
                  className={
                    agentDescVal
                      ? "agentDescriptionInputDiv2"
                      : "agentDescriptionInputDiv"
                  }
                >
                  <textarea
                    onChange={(e) => setOperatorDesc(e.target.value)}
                    value={operatorDesc}
                    onFocus={(e) => setAgentDescVal(true)}
                    onBlur={(e) => setAgentDescVal(false)}
                    className="agenttextAreaDesc"
                    cols="30"
                    rows="10"
                  ></textarea>
                </div>
              </div>
            </div>
            <div className="agentSigPadDiv">
              <span className="agentSigSpan1">{t("admissionSignature1")}</span>
              <div className="signaturePadDiv1">
                <div className="sigMainDiv">
                  <SignaturePad
                    ref={sigPad}
                    sigType={"agent"}
                    clearButton="true"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="admitionButtonDiv">
          <button
            className="admitionFinalFormSubmit"
            onClick={(e) => submitAdmitionForm(e)}
          >
            {t("operatorGroupFormSubmit")}
          </button>
        </div>
      </div>
    </>
  );
};

export default AmitionFinalForm;
