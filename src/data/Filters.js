const Filters = {
  "/Customer/Customer/Read": [
    {
      field: "Flt_CustomerName",
      type: "string",
      default: "",
    },
    {
      field: "Flt_CustomerNumber",
      type: "string",
      default: "",
    },
    {
      field: "Flt_IsReal",
      type: "boolean",
      default: null,
      options: [
        {
          name: "all",
          value: 0,
        },
        {
          name: "real",
          value: true,
        },
        {
          name: "legal",
          value: false,
        },
      ],
    },
    {
      field: "Flt_Real_NationalCode",
      type: "string",
      default: "",
    },
    {
      field: "Flt_Real_FirstName",
      type: "string",
      default: "",
    },
    {
      field: "Flt_Real_LastName",
      type: "string",
      default: "",
    },
    {
      field: "Flt_Legal_NationalID",
      type: "number",
      default: 0,
    },
    {
      field: "Flt_Legal_CompanyName",
      type: "string",
      default: "",
    },
    {
      field: "Flt_Legal_EconomicCode",
      type: "number",
      default: 0,
    },
    {
      field: "Flt_FromDate",
      type: "date",
      default: null,
    },
    {
      field: "Flt_ToDate",
      type: "date",
      default: null,
    },
  ],
  "/Definition/AdditionalService/Read": [
    {
      field: "Flt_Title",
      type: "string",
      default: "",
    },
    {
      field: "Flt_FromDate",
      type: "date",
      default: null,
    },
    {
      field: "Flt_ToDate",
      type: "date",
      default: null,
    },
  ],
  "/AfterSales/Admission/Read": [
    {
      field: "Flt_AdmissionNumber",
      type: "string",
      default: "",
    },
    {
      field: "Flt_ModelNumber",
      type: "string",
      default: "",
    },
    {
      field: "Flt_SerialNumber",
      type: "string",
      default: "",
    },
    {
      field: "Flt_CodeNumber",
      type: "string",
      default: "",
    },
    {
      field: "Flt_IMEI1",
      type: "string",
      default: "",
    },
    {
      field: "Flt_IMEI2",
      type: "string",
      default: "",
    },
    {
      field: "Flt_FromDate",
      type: "date",
      default: null,
    },
    {
      field: "Flt_ToDate",
      type: "date",
      default: null,
    },
  ],
  "/Definition/AdmissionAccessory/Read": [
    {
      field: "Flt_Title",
      type: "string",
      default: "",
    },
    {
      field: "Flt_FromDate",
      type: "date",
      default: null,
    },
    {
      field: "Flt_ToDate",
      type: "date",
      default: null,
    },
  ],
  "/Poll/AnswerPage/Read": [
    {
      field: "Flt_QuestionPage_Id",
      type: "number",
      default: 0,
    },
    {
      field: "Flt_AnswerPageFailed_Id",
      type: "number",
      default: 0,
    },
    {
      field: "Flt_NationalCode",
      type: "string",
      default: "",
    },
    {
      field: "Flt_FirstName",
      type: "string",
      default: "",
    },
    {
      field: "Flt_LastName",
      type: "string",
      default: "",
    },
    {
      field: "Flt_Mobile",
      type: "string",
      default: "",
    },
    {
      field: "Flt_Phone",
      type: "string",
      default: "",
    },
    {
      field: "Flt_TimeElapsed",
      type: "number",
      default: 0,
    },
    {
      field: "Flt_FromDate",
      type: "date",
      default: null,
    },
    {
      field: "Flt_ToDate",
      type: "date",
      default: null,
    },
  ],
  "/Definition/AnswerPageFailed/Read": [
    {
      field: "Flt_Title",
      type: "string",
      default: "",
    },
    {
      field: "Flt_FromDate",
      type: "date",
      default: null,
    },
    {
      field: "Flt_ToDate",
      type: "date",
      default: null,
    },
  ],
  "/Definition/Area/Read": [
    {
      field: "Flt_Title",
      type: "string",
      default: "",
    },
    {
      field: "Flt_FromDate",
      type: "date",
      default: null,
    },
    {
      field: "Flt_ToDate",
      type: "date",
      default: null,
    },
  ],
  "/Operator/BruteForce/Read": [
    {
      field: "Flt_OS",
      type: "string",
      default: "",
    },
    {
      field: "Flt_IP",
      type: "string",
      default: "",
    },
    {
      field: "Flt_Browser",
      type: "string",
      default: "",
    },
    {
      field: "Flt_FromDate",
      type: "date",
      default: null,
    },
    {
      field: "Flt_ToDate",
      type: "date",
      default: null,
    },
  ],
  "/Customer/BruteForce/Read": [
    {
      field: "Flt_OS",
      type: "string",
      default: "",
    },
    {
      field: "Flt_IP",
      type: "string",
      default: "",
    },
    {
      field: "Flt_Browser",
      type: "string",
      default: "",
    },
    {
      field: "Flt_FromDate",
      type: "date",
      default: null,
    },
    {
      field: "Flt_ToDate",
      type: "date",
      default: null,
    },
  ],
  "/Definition/CancellationOfAdmission/Read": [
    {
      field: "Flt_Title",
      type: "string",
      default: "",
    },
    {
      field: "Flt_FromDate",
      type: "date",
      default: null,
    },
    {
      field: "Flt_ToDate",
      type: "date",
      default: null,
    },
  ],
  "/Definition/CancellationOfWarranty/Read": [
    {
      field: "Flt_Title",
      type: "string",
      default: "",
    },
    {
      field: "Flt_FromDate",
      type: "date",
      default: null,
    },
    {
      field: "Flt_ToDate",
      type: "date",
      default: null,
    },
  ],
  "/Definition/City/Read": [
    {
      field: "Flt_Title",
      type: "string",
      default: "",
    },
    {
      field: "Flt_FromDate",
      type: "date",
      default: null,
    },
    {
      field: "Flt_ToDate",
      type: "date",
      default: null,
    },
  ],
  "/Definition/Color/Read": [
    {
      field: "Flt_Title",
      type: "string",
      default: "",
    },
    {
      field: "Flt_FromDate",
      type: "date",
      default: null,
    },
    {
      field: "Flt_ToDate",
      type: "date",
      default: null,
    },
  ],
  "/Definition/Company/Read": [
    {
      field: "Flt_Title",
      type: "string",
      default: "",
    },
    {
      field: "Flt_FromDate",
      type: "date",
      default: null,
    },
    {
      field: "Flt_ToDate",
      type: "date",
      default: null,
    },
  ],
  "/Definition/Country/Read": [
    {
      field: "Flt_Title",
      type: "string",
      default: "",
    },
    {
      field: "Flt_FromDate",
      type: "date",
      default: null,
    },
    {
      field: "Flt_ToDate",
      type: "date",
      default: null,
    },
  ],
  "/Definition/Currency/Read": [
    {
      field: "Flt_Title",
      type: "string",
      default: "",
    },
    {
      field: "Flt_FromDate",
      type: "date",
      default: null,
    },
    {
      field: "Flt_ToDate",
      type: "date",
      default: null,
    },
  ],
  "/Definition/Defect/Read": [
    {
      field: "Flt_Title",
      type: "string",
      default: "",
    },
    {
      field: "Flt_FromDate",
      type: "date",
      default: null,
    },
    {
      field: "Flt_ToDate",
      type: "date",
      default: null,
    },
  ],
  "/Definition/Device/Read": [
    {
      field: "Flt_Title",
      type: "string",
      default: "",
    },
    {
      field: "Flt_FromDate",
      type: "date",
      default: null,
    },
    {
      field: "Flt_ToDate",
      type: "date",
      default: null,
    },
  ],
  "/Operator/Event/Read": [
    {
      field: "Flt_OS",
      type: "string",
      default: "",
    },
    {
      field: "Flt_IP",
      type: "string",
      default: "",
    },
    {
      field: "Flt_Browser",
      type: "string",
      default: "",
    },
    {
      field: "Flt_OperatorName",
      type: "string",
      default: "",
    },
    {
      field: "Flt_FromDate",
      type: "date",
      default: null,
    },
    {
      field: "Flt_ToDate",
      type: "date",
      default: null,
    },
  ],
  "/Customer/Event/Read": [
    {
      field: "Flt_OS",
      type: "string",
      default: "",
    },
    {
      field: "Flt_IP",
      type: "string",
      default: "",
    },
    {
      field: "Flt_Browser",
      type: "string",
      default: "",
    },
    {
      field: "Flt_CustomerName",
      type: "string",
      default: "",
    },
    {
      field: "Flt_FromDate",
      type: "date",
      default: null,
    },
    {
      field: "Flt_ToDate",
      type: "date",
      default: null,
    },
  ],
  "/Operator/FailedHistory/Read": [
    {
      field: "Flt_OS",
      type: "string",
      default: "",
    },
    {
      field: "Flt_IP",
      type: "string",
      default: "",
    },
    {
      field: "Flt_Browser",
      type: "string",
      default: "",
    },
    {
      field: "Flt_OperatorName",
      type: "string",
      default: "",
    },
    {
      field: "Flt_FromDate",
      type: "date",
      default: null,
    },
    {
      field: "Flt_ToDate",
      type: "date",
      default: null,
    },
  ],
  "/Customer/FailedHistory/Read": [
    {
      field: "Flt_OS",
      type: "string",
      default: "",
    },
    {
      field: "Flt_IP",
      type: "string",
      default: "",
    },
    {
      field: "Flt_Browser",
      type: "string",
      default: "",
    },
    {
      field: "Flt_CustomerName",
      type: "string",
      default: "",
    },
    {
      field: "Flt_FromDate",
      type: "date",
      default: null,
    },
    {
      field: "Flt_ToDate",
      type: "date",
      default: null,
    },
  ],
  "/Operator/Group/Read": [
    {
      field: "Flt_Title",
      type: "string",
      default: "",
    },
    {
      field: "Flt_FromDate",
      type: "date",
      default: null,
    },
    {
      field: "Flt_ToDate",
      type: "date",
      default: null,
    },
  ],
  "/Customer/Group/Read": [
    {
      field: "Flt_Title",
      type: "string",
      default: "",
    },
    {
      field: "Flt_FromDate",
      type: "date",
      default: null,
    },
    {
      field: "Flt_ToDate",
      type: "date",
      default: null,
    },
  ],
  "/Definition/ImportingCompany/Read": [
    {
      field: "Flt_Title",
      type: "string",
      default: "",
    },
    {
      field: "Flt_FromDate",
      type: "date",
      default: null,
    },
    {
      field: "Flt_ToDate",
      type: "date",
      default: null,
    },
  ],
  "/AfterSales/InitialAdmission/Read": [
    {
      field: "Flt_ModelNumber",
      type: "string",
      default: "",
    },
    {
      field: "Flt_SerialNumber",
      type: "string",
      default: "",
    },
    {
      field: "Flt_CodeNumber",
      type: "string",
      default: "",
    },
    {
      field: "Flt_IMEI1",
      type: "string",
      default: "",
    },
    {
      field: "Flt_IMEI2",
      type: "string",
      default: "",
    },
    {
      field: "Flt_FromDate",
      type: "date",
      default: null,
    },
    {
      field: "Flt_ToDate",
      type: "date",
      default: null,
    },
  ],
  "/Definition/InputQualityControl/Read": [
    {
      field: "Flt_Title",
      type: "string",
      default: "",
    },
    {
      field: "Flt_FromDate",
      type: "date",
      default: null,
    },
    {
      field: "Flt_ToDate",
      type: "date",
      default: null,
    },
  ],
  "/Operator/LoginHistory/Read": [
    {
      field: "Flt_OS",
      type: "string",
      default: "",
    },
    {
      field: "Flt_IP",
      type: "string",
      default: "",
    },
    {
      field: "Flt_Browser",
      type: "string",
      default: "",
    },
    {
      field: "Flt_OperatorName",
      type: "string",
      default: "",
    },
    {
      field: "Flt_FromDate",
      type: "date",
      default: null,
    },
    {
      field: "Flt_ToDate",
      type: "date",
      default: null,
    },
  ],
  "/Customer/LoginHistory/Read": [
    {
      field: "Flt_OS",
      type: "string",
      default: "",
    },
    {
      field: "Flt_IP",
      type: "string",
      default: "",
    },
    {
      field: "Flt_Browser",
      type: "string",
      default: "",
    },
    {
      field: "Flt_CustomerName",
      type: "string",
      default: "",
    },
    {
      field: "Flt_FromDate",
      type: "date",
      default: null,
    },
    {
      field: "Flt_ToDate",
      type: "date",
      default: null,
    },
  ],
  "/Marketing/Message/Read": [
    {
      field: "Flt_Title",
      type: "string",
      default: "",
    },
    {
      field: "Flt_Subject",
      type: "string",
      default: "",
    },
    {
      field: "Flt_Body",
      type: "string",
      default: "",
    },
    {
      field: "Flt_FromDate",
      type: "date",
      default: null,
    },
    {
      field: "Flt_ToDate",
      type: "date",
      default: null,
    },
  ],
  "/Definition/Model/Read": [
    {
      field: "Flt_Title",
      type: "string",
      default: "",
    },
    {
      field: "Flt_FromDate",
      type: "date",
      default: null,
    },
    {
      field: "Flt_ToDate",
      type: "date",
      default: null,
    },
  ],
  "/Customer/OnlineCustomer/Read": [
    {
      field: "Flt_CustomerName",
      type: "string",
      default: "",
    },
    {
      field: "Flt_OS",
      type: "string",
      default: "",
    },
    {
      field: "Flt_IP",
      type: "string",
      default: "",
    },
    {
      field: "Flt_Browser",
      type: "string",
      default: "",
    },
    {
      field: "Flt_FromDate",
      type: "date",
      default: null,
    },
    {
      field: "Flt_ToDate",
      type: "date",
      default: null,
    },
  ],
  "/Operator/OnlineOperator/Read": [
    {
      field: "Flt_OS",
      type: "string",
      default: "",
    },
    {
      field: "Flt_IP",
      type: "string",
      default: "",
    },
    {
      field: "Flt_Browser",
      type: "string",
      default: "",
    },
    {
      field: "Flt_OperatorName",
      type: "string",
      default: "",
    },
    {
      field: "Flt_FromDate",
      type: "date",
      default: null,
    },
    {
      field: "Flt_ToDate",
      type: "date",
      default: null,
    },
  ],
  "/Operator/Operator/Read": [
    {
      field: "Flt_OperatorName",
      type: "string",
      default: "",
    },
    {
      field: "Flt_Mobile",
      type: "string",
      default: "",
    },
    {
      field: "Flt_FromDate",
      type: "date",
      default: null,
    },
    {
      field: "Flt_ToDate",
      type: "date",
      default: null,
    },
  ],
  "/Definition/OrganizationalRole/Read": [
    {
      field: "Flt_Title",
      type: "string",
      default: "",
    },
    {
      field: "Flt_FromDate",
      type: "date",
      default: null,
    },
    {
      field: "Flt_ToDate",
      type: "date",
      default: null,
    },
  ],
  "/Marketing/Outbox/Read": [
    {
      field: "Flt_From",
      type: "string",
      default: "",
    },
    {
      field: "Flt_To",
      type: "string",
      default: "",
    },
    {
      field: "Flt_FromDate",
      type: "date",
      default: null,
    },
    {
      field: "Flt_ToDate",
      type: "date",
      default: null,
    },
  ],
  "/Definition/OutputQualityControl/Read": [
    {
      field: "Flt_Title",
      type: "string",
      default: "",
    },
    {
      field: "Flt_FromDate",
      type: "date",
      default: null,
    },
    {
      field: "Flt_ToDate",
      type: "date",
      default: null,
    },
  ],
  "/Definition/Part/Read": [
    {
      field: "Flt_Title",
      type: "string",
      default: "",
    },
    {
      field: "Flt_FromDate",
      type: "date",
      default: null,
    },
    {
      field: "Flt_ToDate",
      type: "date",
      default: null,
    },
  ],
  "/Definition/PartGroup/Read": [
    {
      field: "Flt_Title",
      type: "string",
      default: "",
    },
    {
      field: "Flt_FromDate",
      type: "date",
      default: null,
    },
    {
      field: "Flt_ToDate",
      type: "date",
      default: null,
    },
  ],
  "/Marketing/PhoneBook/Read": [
    {
      field: "Flt_Title",
      type: "string",
      default: "",
    },
    {
      field: "Flt_FromDate",
      type: "date",
      default: null,
    },
    {
      field: "Flt_ToDate",
      type: "date",
      default: null,
    },
  ],
  "/Marketing/PhoneNumber/Read": [
    {
      field: "Flt_Number",
      type: "string",
      default: "",
    },
    {
      field: "Flt_FromDate",
      type: "date",
      default: null,
    },
    {
      field: "Flt_ToDate",
      type: "date",
      default: null,
    },
  ],
  "/Marketing/PoolLink/Read": [
    {
      field: "Flt_Mobile",
      type: "string",
      default: "",
    },
    {
      field: "Flt_FromDate",
      type: "date",
      default: null,
    },
    {
      field: "Flt_ToDate",
      type: "date",
      default: null,
    },
  ],
  "/Definition/Province/Read": [
    {
      field: "Flt_Title",
      type: "string",
      default: "",
    },
    {
      field: "Flt_FromDate",
      type: "date",
      default: null,
    },
    {
      field: "Flt_ToDate",
      type: "date",
      default: null,
    },
  ],
  "/Definition/Quality/Read": [
    {
      field: "Flt_Title",
      type: "string",
      default: "",
    },
    {
      field: "Flt_FromDate",
      type: "date",
      default: null,
    },
    {
      field: "Flt_ToDate",
      type: "date",
      default: null,
    },
  ],
  "/Definition/QuestionnaireType/Read": [
    {
      field: "Flt_Title",
      type: "string",
      default: "",
    },
    {
      field: "Flt_FromDate",
      type: "date",
      default: null,
    },
    {
      field: "Flt_ToDate",
      type: "date",
      default: null,
    },
  ],
  "/Poll/QuestionPage/Read": [
    {
      field: "Flt_Title",
      type: "string",
      default: "",
    },
    {
      field: "Flt_FromDate",
      type: "date",
      default: null,
    },
    {
      field: "Flt_ToDate",
      type: "date",
      default: null,
    },
  ],
  "/Business/RegistrationGood/Read": [
    {
      field: "Flt_Company_Id",
      type: "number",
      default: 0,
    },
    {
      field: "Flt_Device_Id",
      type: "number",
      default: 0,
    },
    {
      field: "Flt_Model_Id",
      type: "number",
      default: 0,
    },
    {
      field: "Flt_ImportingCompany_Id",
      type: "number",
      default: 0,
    },
    {
      field: "Flt_ModelNumber",
      type: "string",
      default: "",
    },
    {
      field: "Flt_SerialNumber",
      type: "string",
      default: "",
    },
    {
      field: "Flt_CodeNumber",
      type: "string",
      default: "",
    },
    {
      field: "Flt_IMEI1",
      type: "string",
      default: "",
    },
    {
      field: "Flt_IMEI2",
      type: "string",
      default: "",
    },
    {
      field: "Flt_Cottage",
      type: "number",
      default: 0,
    },
    {
      field: "Flt_CommodityID",
      type: "number",
      default: 0,
    },
    {
      field: "Flt_ActivationCode",
      type: "number",
      default: 0,
    },
    {
      field: "Flt_InternalCode",
      type: "number",
      default: 0,
    },
    {
      field: "Flt_FromDate",
      type: "date",
      default: null,
    },
    {
      field: "Flt_ToDate",
      type: "date",
      default: null,
    },
  ],

  "/Definition/ReplacementType/Read": [
    {
      field: "Flt_Title",
      type: "string",
      default: "",
    },
    {
      field: "Flt_FromDate",
      type: "date",
      default: null,
    },
    {
      field: "Flt_ToDate",
      type: "date",
      default: null,
    },
  ],
  "/Definition/Section/Read": [
    {
      field: "Flt_Title",
      type: "string",
      default: "",
    },
    {
      field: "Flt_FromDate",
      type: "date",
      default: null,
    },
    {
      field: "Flt_ToDate",
      type: "date",
      default: null,
    },
  ],
  "/Definition/SendType/Read": [
    {
      field: "Flt_Title",
      type: "string",
      default: "",
    },
    {
      field: "Flt_FromDate",
      type: "date",
      default: null,
    },
    {
      field: "Flt_ToDate",
      type: "date",
      default: null,
    },
  ],
  "/Definition/StatusDeviceEnd/Read": [
    {
      field: "Flt_Title",
      type: "string",
      default: "",
    },
    {
      field: "Flt_FromDate",
      type: "date",
      default: null,
    },
    {
      field: "Flt_ToDate",
      type: "date",
      default: null,
    },
  ],
  "/Definition/StatusDeviceProgress/Read": [
    {
      field: "Flt_Title",
      type: "string",
      default: "",
    },
    {
      field: "Flt_FromDate",
      type: "date",
      default: null,
    },
    {
      field: "Flt_ToDate",
      type: "date",
      default: null,
    },
  ],
  "/Definition/StatusDeviceStart/Read": [
    {
      field: "Flt_Title",
      type: "string",
      default: "",
    },
    {
      field: "Flt_FromDate",
      type: "date",
      default: null,
    },
    {
      field: "Flt_ToDate",
      type: "date",
      default: null,
    },
  ],
  "/Definition/VehicleType/Read": [
    {
      field: "Flt_Title",
      type: "string",
      default: "",
    },
    {
      field: "Flt_FromDate",
      type: "date",
      default: null,
    },
    {
      field: "Flt_ToDate",
      type: "date",
      default: null,
    },
  ],
  "/Definition/WarrantyType/Read": [
    {
      field: "Flt_Title",
      type: "string",
      default: "",
    },
    {
      field: "Flt_FromDate",
      type: "date",
      default: null,
    },
    {
      field: "Flt_ToDate",
      type: "date",
      default: null,
    },
  ],
};
module.exports = { Filters };
