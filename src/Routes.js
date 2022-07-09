
import * as IoIcons from "react-icons/io"
import * as RiIcons from "react-icons/ri"
import { enums } from "./data/Enums";
import React, { lazy } from 'react'
const CustomerGroup = lazy(() =>
  import("./Views/Forms/customer/group/List/CustomerGroup")
);
const AccessoriesDefine = lazy(() =>
  import("./Views/Forms/definations/accessories/accessoriesDefine/AccessoriesDefine")
);
const StatusDeviceStartDefine = lazy(() =>
  import("./Views/Forms/definations/statusDeviceStart/statusDeviceStartDefine/StatusDeviceStartDefine")
);
const StatusDeviceStart = lazy(() =>
  import("./Views/Forms/definations/statusDeviceStart/StatusDeviceStart")
);
const Registered = lazy(() =>
  import("./Views/Forms/service/registered/Registered")
);
const SentCustomer = lazy(() =>
  import("./Views/Forms/service/sentCustomer/SentCustomer")
);
const SentCustomerForm = lazy(() =>
  import("./Views/Forms/service/sentCustomer/SentCustomerForm")
);
const StatusDeviceProgress = lazy(() =>
  import("./Views/Forms/definations/statusDeviceProgress/StatusDeviceProgress")
);
const StatusDeviceProgressDefine = lazy(() =>
  import("./Views/Forms/definations/statusDeviceProgress/statusDeviceProgressDefine/StatusDeviceProgressDefine")
);
const StatusDeviceEnd = lazy(() =>
  import("./Views/Forms/definations/statusDeviceEnd/StatusDeviceEnd")
);
const StatusDeviceEndDefine = lazy(() =>
  import("./Views/Forms/definations/statusDeviceEnd/statusDeviceEndDefine/StatusDeviceEndDefine")
);
const AnswerList = lazy(() =>
  import("./Views/Forms/Survey/answerPage/answerList/AnswerList")
);
const AnswerForm = lazy(() =>
  import("./Views/Forms/Survey/answerPage/answerForm/AnswerForm")
);
const QuestionnaireType = lazy(() =>
  import("./Views/Forms/definations/questionnaireType/QuestionnaireType")
);
const QuestionnaireTypeDefine = lazy(() =>
  import("./Views/Forms/definations/questionnaireType/questionnaireTypeDefine/QuestionnaireTypeDefine")
);
const Model = lazy(() =>
  import("./Views/Forms/definations/model/Model")
);
const ModelDefine = lazy(() =>
  import("./Views/Forms/definations/model/modelDefine/ModelDefine")
);
const OrganizationRole = lazy(() =>
  import("./Views/Forms/definations/organizationRole/OrganizationRole")
);
const OrganizationRoleDefine = lazy(() =>
  import("./Views/Forms/definations/organizationRole/organizationRoleDefine/OrganizationRoleDefine")
);
const OutputQualityControl = lazy(() =>
  import("./Views/Forms/definations/outputQualityControl/OutputQualityControl")
);
const OutputQualityControlDefine = lazy(() =>
  import("./Views/Forms/definations/outputQualityControl/outputQualityControlDefine/OutputQualityControlDefine")
);
const ProvinceDefine = lazy(() =>
  import("./Views/Forms/definations/province/ProvinceDefine/ProvinceDefine")
);
const Province = lazy(() =>
  import("./Views/Forms/definations/province/Province")
);
const QualityDefine = lazy(() =>
  import("./Views/Forms/definations/quality/qualityDefine/QualityDefine")
);
const Quality = lazy(() =>
  import("./Views/Forms/definations/quality/Quality")
);
const ReplacementTypeDefine = lazy(() =>
  import("./Views/Forms/definations/replacementType/replacementTypeDefine/ReplacementTypeDefine")
);
const ReplacementType = lazy(() =>
  import("./Views/Forms/definations/replacementType/ReplacementType")
);
const PartGroup = lazy(() =>
  import("./Views/Forms/definations/partGroup/PartGroup")
);
const PartGroupDefine = lazy(() =>
  import("./Views/Forms/definations/partGroup/partGroupDefine/PartGroupDefine")
);
const RepairsPerformed = lazy(() =>
  import("./Views/Forms/definations/repairsPerformed/RepairsPerformed")
);
const Section = lazy(() =>
  import("./Views/Forms/definations/section/Section")
);
const SectionDefine = lazy(() =>
  import("./Views/Forms/definations/section/sectionDefine/SectionDefine")
);
const SendType = lazy(() =>
  import("./Views/Forms/definations/sendType/SendType")
);
const SendTypeDefine = lazy(() =>
  import("./Views/Forms/definations/sendType/sendTypeDefine/SendTypeDefine")
);
const RegistrationGoodDefine = lazy(() =>
  import("./Views/Forms/business/registrationGood/registrationGoodDefine/RegistrationGoodDefine")
);
const RegistrationGood = lazy(() =>
  import("./Views/Forms/business/registrationGood/RegistrationGood")
);
const CurrencyDefine = lazy(() =>
  import("./Views/Forms/definations/currency/currencyDefine/CurrencyDefine")
);
const Currency = lazy(() =>
  import("./Views/Forms/definations/currency/Currency")
);
const AllowedIpForm = lazy(() =>
  import("./Views/Forms/panel/virtualIpForm/AllowedIpForm")
);
const AllowedIp = lazy(() =>
  import("./Views/Forms/panel/virtualIpForm/AllowedIp")
);

const OnlineOperator = lazy(() =>
  import("./Views/Forms/panel/onlineOperator/OnlineOperator")
);
const CustomerGroupForm = lazy(() =>
  import("./Views/Forms/customer/group/CustomerGroupForm")
);
const CustomerList = lazy(() =>
  import("./Views/Forms/customer/customer/list/CustomerList")
);
const CustomerForm = lazy(() =>
  import("./Views/Forms/customer/customer/CustomerForm")
);

const ExtraServicesDefine = lazy(() =>
  import(
    "./Views/Forms/definations/extraServices/extraServicesDefine/ExtraServicesDefine"
  )
);

const Delivery = lazy(() =>
  import("./Views/Forms/service/delivery/deliveryList/Delivery")
);
const TechnicianForm = lazy(() =>
  import("./Views/Forms/service/technecian/technicianForm/TechnicianForm")
);
const Technician = lazy(() =>
  import("./Views/Forms/service/technecian/technicianList/Technician")
);
const Allocation = lazy(() =>
  import("./Views/Forms/service/alocation/Allocation")
);
const QcExitForm = lazy(() =>
  import("./Views/Forms/service/QcExit/qcExitList/QcExitList")
);
const QcExit = lazy(() => import("./Views/Forms/service/QcExit/qcExitForm/Qc"));
const QcEntry = lazy(() =>
  import("./Views/Forms/service/QCEntry/qcEntryForm/Qc")
);
const QcFormEntry = lazy(() =>
  import("./Views/Forms/service/QCEntry/qcEntryList/QcForm")
);
const Archive = lazy(() => import("./Views/Forms/service/archive/Archive"));
const Sent = lazy(() =>
  import("./Views/Forms/service/sent/sentFormList/SentFormList")
);
const Change = lazy(() =>
  import("./Views/Forms/service/change/changeList/Change")
);
const ChangeForm = lazy(() =>
  import("./Views/Forms/service/change/changeForm/ChangeForm")
);
const SentForm = lazy(() =>
  import("./Views/Forms/service/sent/sentForm/SentForm")
);

const WorkFlow = lazy(() => import("./Views/Forms/service/workFlow/WorkFlow"));
const Accessories = lazy(() =>
  import("./Views/Forms/definations/accessories/Accessories")
);
const ProductGroupForm = lazy(() =>
  import(
    "./Views/Forms/definations/productGroup/productGroupDefine/ProductGroupDefine"
  )
);
const ProductGroup = lazy(() =>
  import("./Views/Forms/definations/productGroup/ProductGroup")
);
const Product = lazy(() => import("./Views/Forms/definations/product/Product"));
const ProductForm = lazy(() =>
  import("./Views/Forms/definations/product/productDefine/ProductDefine")
);
const WarrantyCancelationForm = lazy(() =>
  import(
    "./Views/Forms/definations/warrantyCancelation/warrantyCancelationDefine/WarrantyCancelationDefine"
  )
);
const WarrantyCancelation = lazy(() =>
  import("./Views/Forms/definations/warrantyCancelation/WarrantyCancelation")
);
const ExtraServices = lazy(() =>
  import("./Views/Forms/definations/extraServices/ExtraServices")
);
const WarrantyType = lazy(() =>
  import("./Views/Forms/definations/warrantyType/WarrantyType")
);
const WarrantyTypeForm = lazy(() =>
  import(
    "./Views/Forms/definations/warrantyType/warrantyTypeDefine/WarrantyTypeDefine"
  )
);
const PartsDefine = lazy(() =>
  import("./Views/Forms/definations/parts/partsDefine/PartsDefine")
);
const Parts = lazy(() => import("./Views/Forms/definations/parts/Parts"));

const Group = lazy(() =>
  import("./Views/Forms/panel/operatorGroupForm/List/Group")
);
const OperatorGroupForm = lazy(() =>
  import("./Views/Forms/panel/operatorGroupForm/OperatorGroupForm")
);
const Operator = lazy(() =>
  import("./Views/Forms/panel/operator/List/Operator")
);
const OperatorForm = lazy(() =>
  import("./Views/Forms/panel/operator/OperatorForm")
);

const Attacks = lazy(() => import("./Views/Forms/panel/attacks/Attacks"));
const Incident = lazy(() => import("./Views/Forms/panel/incident/Incident"));
const FailedLogin = lazy(() =>
  import("./Views/Forms/panel/loginlogs/FailedLogin")
);
const SuccessLogin = lazy(() =>
  import("./Views/Forms/panel/loginlogs/SuccessLogin")
);
const Admission = lazy(() =>
  import("./Views/Forms/service/admission/Admission")
);

const AddmitionFirstForm = lazy(() =>
  import("./Views/Forms/service/admission/AdmitionFirstForm")
);
const QuestionForm = lazy(() =>
  import("./Views/Forms/Survey/questionPage/questionForm/QuestionForm")
);
const QuestionList = lazy(() =>
  import("./Views/Forms/Survey/questionPage/questionList/QuestionList")
);
const ComponyList = lazy(() =>
  import("./Views/Forms/definations/compony/ComponyList")
);
const ComponyForm = lazy(() =>
  import("./Views/Forms/definations/compony/componyForm/ComponyForm")
);
const CountryList = lazy(() =>
  import("./Views/Forms/definations/country/Countrylist")
);
const CountryForm = lazy(() =>
  import("./Views/Forms/definations/country/countryForm/CountryForm")
);
const DefectList = lazy(() =>
  import("./Views/Forms/definations/deffect/DeffectList")
);
const DefectForm = lazy(() =>
  import("./Views/Forms/definations/deffect/deffectForm/DeffectForm")
);
const DeviceList = lazy(() =>
  import("./Views/Forms/definations/device/DeviceList")
);
const DeviceForm = lazy(() =>
  import("./Views/Forms/definations/device/deviceForm/DeviceForm")
);
const ImportingCompanyList = lazy(() =>
  import("./Views/Forms/definations/importingCompany/ImportingCompanyList")
);
const ImportingCompanyForm = lazy(() =>
  import(
    "./Views/Forms/definations/importingCompany/importingCompanyForm/ImportingCompanyForm"
  )
);
const InputQualityControlList = lazy(() =>
  import(
    "./Views/Forms/definations/inputQualityControl/InputQualityControlList"
  )
);
const InputQualityControlForm = lazy(() =>
  import(
    "./Views/Forms/definations/inputQualityControl/inputQualityControlForm/InputQualityControlForm"
  )
);
const VehicleTypeList = lazy(() =>
  import("./Views/Forms/definations/vehicleType/VehicleTypeList")
);
const VehicleTypeForm = lazy(() =>
  import(
    "./Views/Forms/definations/vehicleType/vehicleTypeForm/VehicleTypeForm"
  )
);
const CityList = lazy(() => import("./Views/Forms/definations/city/CityList"));
const CityForm = lazy(() =>
  import("./Views/Forms/definations/city/cityForm/CityForm")
);
const AreaList = lazy(() => import("./Views/Forms/definations/area/AreaList"));
const AreaForm = lazy(() =>
  import("./Views/Forms/definations/area/areaForm/AreaForm")
);
const ColorList = lazy(() =>
  import("./Views/Forms/definations/color/ColorList")
);
const ColorForm = lazy(() =>
  import("./Views/Forms/definations/color/colorForm/ColorForm")
);
const AnswerPageFailedList = lazy(() =>
  import("./Views/Forms/definations/answerPageFailed/AnswerPageFailed")
);
const AnswerPageFailedForm = lazy(() =>
  import(
    "./Views/Forms/definations/answerPageFailed/answerPageFailedForm/AnswerPageFailedForm"
  )
);
const CancellationOfAdmission = lazy(() =>
  import(
    "./Views/Forms/definations/CancellationOfAdmission/CancellationOfAdmission"
  )
);
const CancellationOfAdmissionDefine = lazy(() =>
  import(
    "./Views/Forms/definations/CancellationOfAdmission/cancellationOfAdmission/CancellationOfAdmissionDefine"
  )
);
export const Routes = [
  {
    title: "routes.panel",
    access: enums.Module_Operator,
    icon: <IoIcons.IoIosPaper />,
    iconClosed: <RiIcons.RiArrowDownSFill />,
    iconOpened: <RiIcons.RiArrowUpSFill />,
    subNav: [
      {
        title: "/Operator/OnlineOperator/Read",
        path: "/Operator/OnlineOperator/Read",
        Component: OnlineOperator,
        icon: <IoIcons.IoIosPaper />,
        cName: "sub-nav",
        access: enums.Operator_OnlineOperator_Read_r,
      },
      {
        title: "routes.group",
        path: "/Operator/Group/Read",
        access: enums.Operator_Group_Read_r,
        Component: Group,

        button: {
          Component: OperatorGroupForm,
          path: "/Operator/Group/Create",
          title: "/Operator/Group/Create",
          access: enums.Operator_Group_Create_w,
        },
        icon: <IoIcons.IoIosPaper />,
        cName: "sub-nav",
      },
      {
        title: "/Operator/Operator/Read",
        path: "/Operator/Operator/Read",
        access: enums.Operator_Operator_Read_r,
        Component: Operator,
        button: {
          Component: OperatorForm,
          path: "/Operator/Operator/Create",
          title: "/Operator/Operator/Create",
          access: enums.Operator_Operator_Create_w,
        },
        icon: <IoIcons.IoIosPaper />,
        cName: "sub-nav",
      },
      {
        title: "/Operator/AllowedIp/Read",
        path: "/Operator/AllowedIp/Read",
        access: enums.Operator_AllowedIp_Read_r,
        Component: AllowedIp,
        button: {
          Component: AllowedIpForm,
          path: "/Operator/AllowedIp/write",
          title: "/Operator/AllowedIp/write",
          access: enums.Operator_AllowedIp_Create_w,
        },
        icon: <IoIcons.IoIosPaper />,
        cName: "sub-nav",
      },
      {
        title: "routes.attacks",
        path: "/optbruteforce",
        access: enums.Operator_BruteForce_Read_r,
        Component: Attacks,
        icon: <IoIcons.IoIosPaper />,
        cName: "sub-nav",
      },
      {
        title: "/Operator/Event/Read",
        path: "/Operator/Event/Read",
        access: enums.Operator_Event_Read_r,
        Component: Incident,
        icon: <IoIcons.IoIosPaper />,
        cName: "sub-nav",
      },
      {
        title: "routes.unsuccesslogin",
        path: "/optfailedhistory",
        access: enums.Operator_FailedHistory_Read_r,
        Component: FailedLogin,
        icon: <IoIcons.IoIosPaper />,
        cName: "sub-nav",
      },
      {
        title: "routes.sucesslogin",
        path: "/oprloginhistory",
        access: enums.Operator_LoginHistory_Read_r,
        Component: SuccessLogin,
        icon: <IoIcons.IoIosPaper />,
        cName: "sub-nav",
      },
    ],
  },
  {
    title: "routes.customer",
    access: enums.Module_Customer,
    icon: <IoIcons.IoIosPaper />,
    iconClosed: <RiIcons.RiArrowDownSFill />,
    iconOpened: <RiIcons.RiArrowUpSFill />,
    subNav: [
      {
        title: "routes.group",
        path: "/Customer/Group/Read",
        Component: CustomerGroup,
        button: {
          Component: CustomerGroupForm,
          path: "/customergroupform",
          title: "routes.groupForm",
          access: enums.Customer_Group_Create_w,
        },
        icon: <IoIcons.IoIosPaper />,
        cName: "sub-nav",
        access: enums.Customer_Group_Read_r,
      },
      {
        title: "routes.CustomerList",
        path: "/Customer/Customer/Read",
        Component: CustomerList,
        button: {
          Component: CustomerForm,
          path: "/customerform",
          title: "routes.customerForm",
          access: enums.Customer_Customer_Create_w,
        },
        icon: <IoIcons.IoIosPaper />,
        cName: "sub-nav",
        access: enums.Customer_Customer_Read_r,
      },
    ],
  },
  //   {
  //     title: 'routes.GeneralRepresentative',
  //     icon: <IoIcons.IoIosPaper/> ,
  //     access:enums.Module_Agent,
  //     iconClosed: <RiIcons.RiArrowDownSFill/> ,
  //     iconOpened: <RiIcons.RiArrowUpSFill/> ,
  //     subNav: [
  //       {
  //         title: 'routes.online',
  //         path:'/representativeonline',
  //         access:enums.representativeonline,
  //        Component:agentOnline,
  //         icon: <IoIcons.IoIosPaper/> ,
  //         cName: 'sub-nav'
  //       },
  //       {
  //         title: 'routes.group',
  //         path:'/representativegroup',
  //         access:enums.representativegroup,
  //        Component:agentGroup,
  //         button:{
  //          Component:AgentGroupForm,
  //           path:"/representativegroupForm",
  //           title:"routes.groupForm",
  //           access:enums.representativegroupForm,
  //         },
  //         icon: <IoIcons.IoIosPaper/> ,
  //         cName: 'sub-nav'
  //       },
  //       {
  //         title: 'routes.representative',
  //         path:'/representative',
  //         access:enums.representative,
  //        Component:Agent,
  //         button:{
  //          Component:AgentForm,
  //           path:"/representativeForm",
  //           title:"routes.representativeForm",
  //           access:enums.representativeForm
  //         },
  //         icon: <IoIcons.IoIosPaper/> ,
  //         cName: 'sub-nav'
  //       },
  //       {
  //         title: 'routes.validIps',
  //         path:'/representativeValidIps',
  //         access:enums.representativeValidIps,
  //        Component:agentValidIps,
  //         button:{
  //          Component:agentVirtualIpForm,
  //           path:"/representativeValidIpsForm",
  //           title:"routes.validIpsForm",
  //           access:enums.representativeValidIpsForm,
  //         },
  //         icon: <IoIcons.IoIosPaper/> ,
  //         cName: 'sub-nav'
  //       },
  //       {
  //         title: 'routes.attacks',
  //         path:'/representativeAttacks',
  //         access:enums.representativeAttacks,
  //        Component:agentAttacks,
  //         icon: <IoIcons.IoIosPaper/> ,
  //         cName: 'sub-nav'
  //       },
  //       {
  //         title: 'routes.actions',
  //         path:'/representativeActions',
  //         access:enums.representativeActions,
  //        Component:agentIncident,
  //         icon: <IoIcons.IoIosPaper/> ,
  //         cName: 'sub-nav'
  //       },
  //       {
  //         title: 'routes.unsuccesslogin',
  //         path:'/representativeunsuccesslogin',
  //         access:enums.representativeunsuccesslogin,
  //        Component:agentFailedLogin,
  //         icon: <IoIcons.IoIosPaper/> ,
  //         cName: 'sub-nav'
  //       },
  //       {
  //         title: 'routes.sucesslogin',
  //         path:'/representativesucesslogin',
  //         access:enums.representativesucesslogin,
  //        Component:agentSuccessLogin,
  //         icon: <IoIcons.IoIosPaper/> ,
  //         cName: 'sub-nav'
  //       },
  //     ]
  //   },
  {
    title: "routes.business",
    access: enums.Module_Business,
    icon: <IoIcons.IoIosPaper />,
    iconClosed: <RiIcons.RiArrowDownSFill />,
    iconOpened: <RiIcons.RiArrowUpSFill />,
    subNav: [
      {
        title: "/Business/RegistrationGood/Read",
        path: "/Business/RegistrationGood/Read",
        access: enums.Business_RegistrationGood_Read_r,
        Component: RegistrationGood,
        button: {
          Component: RegistrationGoodDefine,
          path: "/Business/RegistrationGood/Write",
          title: "/Business/RegistrationGood/Write",
          access: enums.Business_RegistrationGood_Create_w,
        },
        icon: <IoIcons.IoIosPaper />,
        cName: "sub-nav",
      },
    ],
  },
  {
    title: "routes.services",
    access: enums.Module_AfterSales,
    icon: <IoIcons.IoIosPaper />,
    iconClosed: <RiIcons.RiArrowDownSFill />,
    iconOpened: <RiIcons.RiArrowUpSFill />,
    subNav: [
      {
        title: "routes.workFlow",
        path: "/workFlow",
        access: enums.AfterSales_Dashboard_Index_Read_r,
        Component: WorkFlow,
        icon: <IoIcons.IoIosPaper />,
        cName: "sub-nav",
      },
      {
        title: "routes.registered",
        path: "/registered",
        access: enums.AfterSales_New_Registered_Read_r,
        Component: Registered,
        icon: <IoIcons.IoIosPaper />,
        cName: "sub-nav",
      },
      {
        title: "routes.admission",
        path: "/AfterSales/Admission/Read",
        access: enums.AfterSales_New_Admission_Read_r,
        Component: Admission,
        button: {
          Component: AddmitionFirstForm,
          path: "/admissionForm",
          title: "routes.admissionForm",
          access: enums.AfterSales_New_Admission_Create_w,
        },
        icon: <IoIcons.IoIosPaper />,
        cName: "sub-nav",
      },
      {
        title: "routes.service.QcEntry",
        path: "/service.QcEntry",
        access: enums.AfterSales_New_InputQualityControl_Read_r,
        Component: QcFormEntry,
        button: {
          Component: QcEntry,
          path: "/service.QcEntryForm",
          title: "routes.service.QcEntryForm",
          access: enums.AfterSales_New_InputQualityControl_Create_w,
        },
        icon: <IoIcons.IoIosPaper />,
        cName: "sub-nav",
      },
      {
        title: "routes.service.allocation",
        path: "/service.allocation",
        access: enums.AfterSales_New_AssignToTechnician_Read_r,
        Component: Allocation,
        icon: <IoIcons.IoIosPaper />,
        cName: "sub-nav",
      },
      {
        title: "routes.service.technician",
        path: "/service.technician",
        access: enums.AfterSales_New_Technician_Read_r,
        Component: Technician,
        button: {
          Component: TechnicianForm,
          path: "/service.technicianForm",
          title: "routes.service.technicianForm",
          access: enums.AfterSales_New_Technician_Create_w,
        },
        icon: <IoIcons.IoIosPaper />,
        cName: "sub-nav",
      },
      {
        title: "routes.service.qcExit",
        path: "/service.qcExit",
        access: enums.AfterSales_New_OutputQualityControl_Read_r,
        Component: QcExitForm,
        button: {
          Component: QcExit,
          path: "/service.qcExitForm",
          title: "routes.service.qcExitForm",
          access: enums.AfterSales_New_OutputQualityControl_Create_w,
        },
        icon: <IoIcons.IoIosPaper />,
        cName: "sub-nav",
      },
      {
        title: "routes.service.delivery",
        path: "/service.delivery",
        access: enums.AfterSales_New_DeliveryInPerson_Read_r,
        Component: Delivery,
        icon: <IoIcons.IoIosPaper />,
        cName: "sub-nav",
      },

      {
        title: "routes.changing",
        path: "/changing",
        access: enums.AfterSales_New_Replacement_Read_r,
        Component: Change,
        button: {
          Component: ChangeForm,
          path: "/changingForm",
          title: "routes.changingForm",
          access: enums.AfterSales_New_Replacement_Create_w,
        },
        icon: <IoIcons.IoIosPaper />,
        cName: "sub-nav",
      },
      {
        title: "routes.sentAgent",
        path: "/sent",
        access: enums.AfterSales_New_PostToAgent_Read_r,
        Component: Sent,
        button: {
          Component: SentForm,
          path: "/sentForm",
          title: "routes.sentAgentForm",
          access: enums.AfterSales_New_PostToAgent_Create_w,
        },
        icon: <IoIcons.IoIosPaper />,
        cName: "sub-nav",
      },
      {
        title: "routes.sentCustomer",
        path: "/sentCustomer",
        Component: SentCustomer,
        access: enums.AfterSales_New_PostToCustomer_Read_r,
        button: {
          Component: SentCustomerForm,
          path: "/sentcustomerform",
          title: "routes.sentcustomerform",
          access: enums.AfterSales_New_PostToCustomer_Create_w,
        },
      },
      {
        title: "routes.archive",
        path: "/archive",
        access: enums.AfterSales_Archive_Read_r,
        Component: Archive,
        icon: <IoIcons.IoIosPaper />,
        cName: "sub-nav",
      },
    ],
  },
  {
    title: "routes.question",
    access: enums.Module_Survey,
    icon: <IoIcons.IoIosPaper />,
    iconClosed: <RiIcons.RiArrowDownSFill />,
    iconOpened: <RiIcons.RiArrowUpSFill />,
    subNav: [
      {
        title: "routes.questionList",
        path: "/Survey/QuestionPage/Read",
        Component: QuestionList,
        button: {
          Component: QuestionForm,
          path: "/Survey/QuestionPage/Create",
          title: "routes.questionForm",
          access: enums.Survey_QuestionPage_Create_w,
        },
        icon: <IoIcons.IoIosPaper />,
        cName: "sub-nav",
        access: enums.Survey_QuestionPage_Read_r,
      },
      {
        title: "routes.answerList",
        path: "/Survey/AnswerPage/Read",
        Component: AnswerList,
        button: {
          Component: AnswerForm,
          path: "/Survey/Answer/Create",
          title: "routes.answerForm",
          access: enums.Survey_AnswerPage_Create_w,
        },
        icon: <IoIcons.IoIosPaper />,
        cName: "sub-nav",
        access: enums.Survey_AnswerPage_Read_r,
      },
    ],
  },
  {
    title: "routes.basicDefinations",
    icon: <IoIcons.IoIosPaper />,
    access: enums.Module_Definition,
    iconClosed: <RiIcons.RiArrowDownSFill />,
    iconOpened: <RiIcons.RiArrowUpSFill />,
    subNav: [
      {
        title: "/Definition/Country/Read",
        path: "/Definition/Country/Read",
        access: enums.Definition_Country_Read_r,
        Component: CountryList,
        button: {
          Component: CountryForm,
          path: "/Definition/Country/Write",
          title: "/Definition/Country/Write",
          access: enums.Definition_Country_Create_w,
        },
        icon: <IoIcons.IoIosPaper />,
        cName: "sub-nav",
      },
      {
        title: "/Definition/Province/Read",
        path: "/Definition/Province/Read",
        access: enums.Definition_Province_Read_r,
        Component: Province,
        button: {
          title: "/Definition/Province/Write",
          path: "/Definition/Province/Write",
          access: enums.Definition_Province_Create_w,
          Component: ProvinceDefine,
        },
        icon: <IoIcons.IoIosPaper />,
        cName: "sub-nav",
      },
      {
        title: "/Definition/City/Read",
        path: "/Definition/City/Read",
        access: enums.Definition_City_Read_r,
        Component: CityList,
        button: {
          Component: CityForm,
          path: "/Definition/City/Write",
          title: "/Definition/City/Write",
          access: enums.Definition_City_Create_w,
        },
        icon: <IoIcons.IoIosPaper />,
        cName: "sub-nav",
      },
      {
        title: "/Definition/Section/Read",
        path: "/Definition/Section/Read",
        access: enums.Definition_Section_Read_r,
        Component: Section,
        button: {
          Component: SectionDefine,
          path: "/Definition/Section/Write",
          title: "/Definition/Section/Write",
          access: enums.Definition_Section_Create_w,
        },
        icon: <IoIcons.IoIosPaper />,
        cName: "sub-nav",
      },
      {
        title: "/Definition/Area/Read",
        path: "/Definition/Area/Read",
        access: enums.Definition_Area_Read_r,
        Component: AreaList,
        button: {
          Component: AreaForm,
          path: "/Definition/Area/Write",
          title: "/Definition/Area/Write",
          access: enums.Definition_Area_Create_w,
        },
        icon: <IoIcons.IoIosPaper />,
        cName: "sub-nav",
      },
      {
        title: "/Definition/Quality/Read",
        path: "/Definition/Quality/Read",
        access: enums.Definition_Quality_Read_r,
        Component: Quality,
        button: {
          Component: QualityDefine,
          path: "/Definition/Quality/Write",
          title: "/Definition/Quality/Write",
          access: enums.Definition_Quality_Create_w,
        },
        icon: <IoIcons.IoIosPaper />,
        cName: "sub-nav",
      },
      {
        title: "/Definition/PartGroup/Read",
        path: "/Definition/PartGroup/Read",
        access: enums.Definition_PartGroup_Read_r,
        Component: PartGroup,
        button: {
          Component: PartGroupDefine,
          path: "/Definition/PartGroup/Write",
          title: "/Definition/PartGroup/Write",
          access: enums.Definition_PartGroup_Create_w,
        },
        icon: <IoIcons.IoIosPaper />,
        cName: "sub-nav",
      },
      {
        title: "/Definition/Part/Read",
        path: "/Definition/Part/Read",
        access: enums.Definition_Part_Read_r,
        Component: Parts,
        button: {
          Component: PartsDefine,
          title: "/Definition/Part/Write",
          path: "/Definition/Part/Write",
          access: enums.Definition_Part_Create_w,
        },
        icon: <IoIcons.IoIosPaper />,
        cName: "sub-nav",
      },
      {
        title: "/Definition/StatusDeviceStart/Read",
        path: "/Definition/StatusDeviceStart/Read",
        access: enums.Definition_StatusDeviceStart_Read_r,
        Component: StatusDeviceStart,
        button: {
          Component: StatusDeviceStartDefine,
          path: "/Definition/StatusDeviceStart/Write",
          title: "/Definition/StatusDeviceStart/Write",
          access: enums.Definition_StatusDeviceStart_Create_w,
        },
        icon: <IoIcons.IoIosPaper />,
        cName: "sub-nav",
      },
      {
        title: "/Definition/StatusDeviceProgress/Read",
        path: "/Definition/StatusDeviceProgress/Read",
        access: enums.Definition_StatusDeviceProgress_Read_r,
        Component: StatusDeviceProgress,
        button: {
          Component: StatusDeviceProgressDefine,
          title: "/Definition/StatusDeviceProgress/Write",
          path: "/Definition/StatusDeviceProgress/Write",
          access: enums.Definition_StatusDeviceProgress_Create_w,
        },
        icon: <IoIcons.IoIosPaper />,
        cName: "sub-nav",
      },
      {
        title: "/Definition/StatusDeviceEnd/Read",
        path: "/Definition/StatusDeviceEnd/Read",
        access: enums.Definition_StatusDeviceEnd_Read_r,
        Component: StatusDeviceEnd,
        button: {
          Component: StatusDeviceEndDefine,
          title: "/Definition/StatusDeviceEnd/Write",
          path: "/Definition/StatusDeviceEnd/Write",
          access: enums.Definition_StatusDeviceEnd_Create_w,
        },
        icon: <IoIcons.IoIosPaper />,
        cName: "sub-nav",
      },
      {
        title: "routes.garanteeType",
        path: "/garanteeType",
        access: enums.Definition_WarrantyType_Read_r,
        Component: WarrantyType,
        button: {
          Component: WarrantyTypeForm,
          path: "/garanteeTypeForm",
          title: "routes.garanteeTypeForm",
          access: enums.Definition_WarrantyType_Create_w,
        },
        icon: <IoIcons.IoIosPaper />,
        cName: "sub-nav",
      },
      {
        title: "/Definition/warrantyCancelation/Read",
        path: "/Definition/warrantyCancelation/Read",
        access: enums.Definition_CancellationOfWarranty_Read_r,
        Component: WarrantyCancelation,
        button: {
          Component: WarrantyCancelationForm,
          path: "/Definition/warrantyCancelation/Write",
          title: "/Definition/warrantyCancelation/Write",
          access: enums.Definition_CancellationOfWarranty_Create_w,
        },
        icon: <IoIcons.IoIosPaper />,
        cName: "sub-nav",
      },
      {
        title: "/Definition/AdditionalService/Read",
        path: "/Definition/AdditionalService/Read",
        access: enums.Definition_AdditionalService_Read_r,
        Component: ExtraServices,
        button: {
          Component: ExtraServicesDefine,
          path: "/Definition/AdditionalService/Write",
          title: "/Definition/AdditionalService/Write",
          access: enums.Definition_AdditionalService_Create_w,
        },
        icon: <IoIcons.IoIosPaper />,
        cName: "sub-nav",
      },
      {
        title: "/Definition/Defect/Read",
        path: "/Definition/Defect/Read",
        access: enums.Definition_Defect_Read_r,
        Component: DefectList,
        button: {
          Component: DefectForm,
          path: "/Definition/Defect/Write",
          title: "/Definition/Defect/Write",
          access: enums.Definition_Defect_Create_w,
        },
        icon: <IoIcons.IoIosPaper />,
        cName: "sub-nav",
      },
      {
        title: "/Definition/RepairsPerformed/Read",
        path: "/Definition/RepairsPerformed/Read",
        access: enums.Definition_RepairsPerformed_Read_r,
        Component: RepairsPerformed,
        icon: <IoIcons.IoIosPaper />,
        cName: "sub-nav",
      },
      {
        title: "/Definition/InputQualityControl/Read",
        path: "/Definition/InputQualityControl/Read",
        access: enums.Definition_InputQualityControl_Read_r,
        Component: InputQualityControlList,
        button: {
          Component: InputQualityControlForm,
          path: "/Definition/InputQualityControl/Write",
          title: "/Definition/InputQualityControl/Write",
          access: enums.Definition_InputQualityControl_Create_w,
        },
        icon: <IoIcons.IoIosPaper />,
        cName: "sub-nav",
      },
      {
        title: "/Definition/OutputQualityControl/Read",
        path: "/Definition/OutputQualityControl/Read",
        access: enums.Definition_OutputQualityControl_Read_r,
        Component: OutputQualityControl,
        button: {
          Component: OutputQualityControlDefine,
          path: "/Definition/OutputQualityControl/Write",
          title: "/Definition/OutputQualityControl/Write",
          access: enums.Definition_OutputQualityControl_Create_w,
        },
        icon: <IoIcons.IoIosPaper />,
        cName: "sub-nav",
      },
      {
        title: "/Definition/SendType/Read",
        path: "/Definition/SendType/Read",
        access: enums.Definition_SendType_Read_r,
        Component: SendType,
        button: {
          Component: SendTypeDefine,
          path: "/Definition/SendType/Write",
          title: "/Definition/SendType/Write",
          access: enums.Definition_SendType_Create_w,
        },
        icon: <IoIcons.IoIosPaper />,
        cName: "sub-nav",
      },
      {
        title: "/Definition/VehicleType/Read",
        path: "/Definition/VehicleType/Read",
        access: enums.Definition_VehicleType_Read_r,
        Component: VehicleTypeList,
        button: {
          Component: VehicleTypeForm,
          path: "/Definition/VehicleType/Write",
          title: "/Definition/VehicleType/Write",
          access: enums.Definition_VehicleType_Create_w,
        },
        icon: <IoIcons.IoIosPaper />,
        cName: "sub-nav",
      },
      {
        title: "/Definition/Company/Read",
        path: "/Definition/Company/Read",
        access: enums.Definition_Company_Read_r,
        Component: ComponyList,
        button: {
          Component: ComponyForm,
          path: "/Definition/Company/Write",
          title: "/Definition/Company/Write",
          access: enums.Definition_Company_Create_w,
        },
        icon: <IoIcons.IoIosPaper />,
        cName: "sub-nav",
      },
      {
        title: "/Definition/Device/Read",
        path: "/Definition/Device/Read",
        access: enums.Definition_Device_Read_r,
        Component: DeviceList,
        button: {
          Component: DeviceForm,
          path: "/Definition/Device/Write",
          title: "/Definition/Device/Write",
          access: enums.Definition_Device_Create_w,
        },
        icon: <IoIcons.IoIosPaper />,
        cName: "sub-nav",
      },
      {
        title: "/Definition/Color/Read",
        path: "/Definition/Color/Read",
        access: enums.Definition_Color_Read_r,
        Component: ColorList,
        button: {
          Component: ColorForm,
          path: "/Definition/Color/Write",
          title: "/Definition/Color/Write",
          access: enums.Definition_Color_Create_w,
        },
        icon: <IoIcons.IoIosPaper />,
        cName: "sub-nav",
      },
      {
        title: "/Definition/Model/Read",
        path: "/Definition/Model/Read",
        access: enums.Definition_Model_Read_r,
        Component: Model,
        button: {
          Component: ModelDefine,
          path: "/Definition/Model/Write",
          title: "/Definition/Model/Write",
          access: enums.Definition_Model_Create_w,
        },
        icon: <IoIcons.IoIosPaper />,
        cName: "sub-nav",
      },
      {
        title: "routes.accessories",
        path: "/accessories",
        access: enums.Definition_AdmissionAccessory_Read_r,
        Component: Accessories,
        button: {
          Component: AccessoriesDefine,
          path: "/accessoriesForm",
          title: "routes.accessoriesForm",
          access: enums.Definition_AdmissionAccessory_Create_w,
        },
        icon: <IoIcons.IoIosPaper />,
        cName: "sub-nav",
      },
      {
        title: "/Definition/QuestionnaireType/Read",
        path: "/Definition/QuestionnaireType/Read",
        access: enums.Definition_QuestionnaireType_Read_r,
        Component: QuestionnaireType,
        button: {
          Component: QuestionnaireTypeDefine,
          path: "/Definition/QuestionnaireType/Write",
          title: "/Definition/QuestionnaireType/Write",
          access: enums.Definition_QuestionnaireType_Create_w,
        },
        icon: <IoIcons.IoIosPaper />,
        cName: "sub-nav",
      },

      {
        title: "/Definition/OrganizationalRole/Read",
        path: "/Definition/OrganizationalRole/Read",
        access: enums.Definition_OrganizationalRole_Read_r,
        Component: OrganizationRole,
        button: {
          Component: OrganizationRoleDefine,
          path: "/Definition/OrganizationalRole/Write",
          title: "/Definition/OrganizationalRole/Write",
          access: enums.Definition_OrganizationalRole_Create_w,
        },
        icon: <IoIcons.IoIosPaper />,
        cName: "sub-nav",
      },

      {
        title: "/Definition/ReplacementType/Read",
        path: "/Definition/ReplacementType/Read",
        access: enums.Definition_ReplacementType_Read_r,
        Component: ReplacementType,
        button: {
          Component: ReplacementTypeDefine,
          path: "/Definition/ReplacementType/Write",
          title: "/Definition/ReplacementType/Write",
          access: enums.Definition_ReplacementType_Create_w,
        },
        icon: <IoIcons.IoIosPaper />,
        cName: "sub-nav",
      },
      {
        title: "routes.product",
        path: "/product",
        access: enums.Definition_Product_Read_r,
        Component: Product,
        button: {
          Component: ProductForm,
          path: "/productForm",
          title: "routes.productForm",
          access: enums.Definition_Product_Create_w,
        },
        icon: <IoIcons.IoIosPaper />,
        cName: "sub-nav",
      },
      {
        title: "routes.productGroup",
        path: "/productGroup",
        access: enums.Definition_ProductGroup_Read_r,
        Component: ProductGroup,
        button: {
          Component: ProductGroupForm,
          path: "/productGroupForm",
          title: "routes.productGroupForm",
          access: enums.Definition_ProductGroup_Create_w,
        },
        icon: <IoIcons.IoIosPaper />,
        cName: "sub-nav",
      },

      {
        title: "/Definition/ImportingCompany/Read",
        path: "/Definition/ImportingCompany/Read",
        access: enums.Definition_ImportingCompany_Read_r,
        Component: ImportingCompanyList,
        button: {
          Component: ImportingCompanyForm,
          path: "/Definition/ImportingCompany/Write",
          title: "/Definition/ImportingCompany/Write",
          access: enums.Definition_ImportingCompany_Create_w,
        },
        icon: <IoIcons.IoIosPaper />,
        cName: "sub-nav",
      },
      {
        title: "/Definition/AnswerPageFailed/Read",
        path: "/Definition/AnswerPageFailed/Read",
        access: enums.Definition_AnswerPageFailed_Read_r,
        Component: AnswerPageFailedList,
        button: {
          Component: AnswerPageFailedForm,
          path: "/Definition/AnswerPageFailed/Write",
          title: "/Definition/AnswerPageFailed/Write",
          access: enums.Definition_AnswerPageFailed_Create_w,
        },
        icon: <IoIcons.IoIosPaper />,
        cName: "sub-nav",
      },
      {
        title: "/Definition/Currency/Read",
        path: "/Definition/Currency/Read",
        access: enums.Definition_Currency_Read_r,
        Component: Currency,
        button: {
          Component: CurrencyDefine,
          path: "/Definition/Currency/Write",
          title: "/Definition/Currency/Write",
          access: enums.Definition_Currency_Create_w,
        },
        icon: <IoIcons.IoIosPaper />,
        cName: "sub-nav",
      },
      {
        title: "/Definition/CancellationOfAdmission/Read",
        path: "/Definition/CancellationOfAdmission/Read",
        access: enums.Definition_CancellationOfAdmission_Read_r,
        Component: CancellationOfAdmission,
        button: {
          Component: CancellationOfAdmissionDefine,
          path: "/Definition/CancellationOfAdmission/Write",
          title: "/Definition/CancellationOfAdmission/Write",
          access: enums.Definition_CancellationOfAdmission_Create_w,
        },
        icon: <IoIcons.IoIosPaper />,
        cName: "sub-nav",
      },

      //     {
      //       title: 'routes.receivedCustomerMsgType',
      //       path:'/receivedCustomerMsgType',
      //       access:enums.receivedCustomerMsgType,
      //      Component:CustomerReceivedMsgType,
      //       button:{
      //        Component:CustomerReceivedMsgTypeDefine,
      //         path:"/receivedCustomerMsgTypeForm",
      //         title:"routes.receivedCustomerMsgTypeForm",
      //         access:enums.receivedCustomerMsgTypeForm,
      //       },
      //       icon: <IoIcons.IoIosPaper/> ,
      //       cName: 'sub-nav'
      //     },
      //     {
      //       title: 'routes.sendCustomerMsgType',
      //       path:'/sendCustomerMsgType',
      //       access:enums.sendCustomerMsgType,
      //      Component:CustomerSendMsgType,
      //       button:{
      //        Component:CustomerSendMsgTypeDefine,
      //         path:"/sendCustomerMsgTypeForm",
      //         title:"routes.sendCustomerMsgTypeForm",
      //         access:enums.sendCustomerMsgTypeForm,
      //       },
      //       icon: <IoIcons.IoIosPaper/> ,
      //       cName: 'sub-nav'
      //     },
      //     {
      //       title: 'routes.systemMsgType',
      //       path:'/systemMsgType',
      //       access:enums.systemMsgType,
      //      Component:SystemMsgType,
      //       button:{
      //        Component:SystemMsgTypeForm,
      //         path:"/systemMsgTypeForm",
      //         title:"routes.systemMsgTypeForm",
      //         access:enums.systemMsgTypeForm,
      //       },
      //       icon: <IoIcons.IoIosPaper/> ,
      //       cName: 'sub-nav'
      //     },
      //     {
      //       title: 'routes.agentsAbility',
      //       path:'/agentsAbility',
      //       access:enums.agentsAbility,
      //      Component:AgentsAbility,
      //       button:{
      //        Component:AgentAbilityDefine,
      //         path:"/agentsAbilityForm",
      //         title:"routes.agentsAbilityForm",
      //         access:enums.agentsAbilityForm,
      //       },
      //       icon: <IoIcons.IoIosPaper/> ,
      //       cName: 'sub-nav'
      //     },
      //     {
      //       title: 'routes.techAbility',
      //       path:'/techAbility',
      //       access:enums.techAbility,
      //      Component:TechAbility,
      //       button:{
      //        Component:TechAbilityForm,
      //         path:"/techAbilityForm",
      //         title:"routes.techAbilityForm",
      //         access:enums.techAbilityForm,
      //       },
      //       icon: <IoIcons.IoIosPaper/> ,
      //       cName: 'sub-nav'
      //     },

      //     {
      //       title: 'routes.inventoryGroup',
      //       path:'/inventoryGroup',
      //       access:enums.inventoryGroup,
      //      Component:InventoryGroup,
      //       button:{
      //        Component:InventoryGroupDefine,
      //         path:"/inventoryGroupForm",
      //         title:"routes.inventoryGroupForm",
      //         access:enums.inventoryGroupForm,
      //       },
      //       icon: <IoIcons.IoIosPaper/> ,
      //       cName: 'sub-nav'
      //     },

      //     {
      //       title: 'routes.partRequest',
      //       path:'/partRequest',
      //       access:enums.partRequest,
      //      Component:PartRequest,
      //       button:{
      //        Component:PartRequestDefine,
      //         path:"/partRequestForm",
      //         title:"routes.partRequestForm",
      //         access:enums.partRequestForm,
      //       },
      //       icon: <IoIcons.IoIosPaper/> ,
      //       cName: 'sub-nav'
      //     },
      //     {
      //       title: 'routes.worksDoneOnPhone',
      //       path:'/worksDoneOnPhone',
      //       access:enums.worksDoneOnPhone,
      //      Component:WorksDoneOnPhone,
      //       button:{
      //        Component:WorksDoneOnPhoneForm,
      //         path:"/worksDoneOnPhoneForm",
      //         title:"routes.worksDoneOnPhoneForm",
      //         access:enums.worksDoneOnPhoneForm,
      //       },
      //       icon: <IoIcons.IoIosPaper/> ,
      //       cName: 'sub-nav'
      //     },
    ],
  },
  // {
  //   title: 'routes.rules',
  //   icon: <IoIcons.IoIosPaper/> ,
  //   access:enums.rules,
  //   iconClosed: <RiIcons.RiArrowDownSFill/> ,
  //   iconOpened: <RiIcons.RiArrowUpSFill/> ,
  //   subNav: [
  //     {
  //       title: 'routes.pricing',
  //       path:'/pricing',
  //       access:enums.pricing,
  //      Component:Pricing,
  //       icon: <IoIcons.IoIosPaper/> ,
  //       cName: 'sub-nav'
  //     },
  //     {
  //       title: 'routes.ratingTechnician',
  //       path:'/ratingTechnician',
  //       access:enums.ratingTechnician,
  //      Component:TechnicianRating,
  //       icon: <IoIcons.IoIosPaper/> ,
  //       cName: 'sub-nav'
  //     }
  //   ]},
  //   {
  //     title: 'routes.reports',
  //     access:enums.reports,
  //     icon: <IoIcons.IoIosPaper/> ,
  //     iconClosed: <RiIcons.RiArrowDownSFill/> ,
  //     iconOpened: <RiIcons.RiArrowUpSFill/> ,
  //     subNav: [

  //     ]},
  //     {
  //       title: 'routes.inventory',
  //       access:enums.inventory,
  //       icon: <IoIcons.IoIosPaper/> ,
  //       iconClosed: <RiIcons.RiArrowDownSFill/> ,
  //       iconOpened: <RiIcons.RiArrowUpSFill/> ,
  //       subNav: [

  //       ]},
  //       {
  //         title: 'routes.customerClub',
  //         icon: <IoIcons.IoIosPaper/> ,
  //         access:enums.customerClub,
  //         iconClosed: <RiIcons.RiArrowDownSFill/> ,
  //         iconOpened: <RiIcons.RiArrowUpSFill/> ,
  //         subNav: [
  //           {
  //             title: 'routes.conversation',
  //             path:'/conversationClubList',
  //             access:enums.conversationClubList,
  //            Component:ConversationClubList,
  //             button:{
  //              Component:ConversationClubForm,
  //               path:"/conversationClubForm",
  //               title:"routes.conversationClubForm",
  //               access:enums.conversationClubForm,
  //             },
  //             icon: <IoIcons.IoIosPaper/> ,
  //             cName: 'sub-nav'
  //           }

  //         ]},
  //       {
  //         title: 'routes.distribution',
  //         icon: <IoIcons.IoIosPaper/> ,
  //         access:enums.distribution,
  //         iconClosed: <RiIcons.RiArrowDownSFill/> ,
  //         iconOpened: <RiIcons.RiArrowUpSFill/> ,
  //         subNav: [
  //           {
  //             title: 'routes.deliveryRecord',
  //             path:'/deliveryRecordList',
  //             access:enums.deliveryRecordList,
  //            Component:DeliveryRecord,
  //             icon: <IoIcons.IoIosPaper/> ,
  //             cName: 'sub-nav'
  //           },
  //           {
  //             title: 'routes.orders',
  //             path:'/OrdersList',
  //             access:enums.OrdersList,
  //            Component:Orders,
  //             icon: <IoIcons.IoIosPaper/> ,
  //             cName: 'sub-nav'
  //           }

  //         ]},
  //         {
  //           title: 'routes.setting',
  //           icon: <IoIcons.IoIosPaper/> ,
  //           access:enums.setting,
  //           iconClosed: <RiIcons.RiArrowDownSFill/> ,
  //           iconOpened: <RiIcons.RiArrowUpSFill/> ,
  //           subNav: [
  //             {
  //               title: 'routes.smsForm',
  //               path:'/smsForm',
  //               access:enums.sms,
  //              Component:SmsForm,

  //               icon: <IoIcons.IoIosPaper/> ,
  //               cName: 'sub-nav'
  //             }

  //           ]}
];
