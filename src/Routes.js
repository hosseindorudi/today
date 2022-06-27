import React, { lazy } from "react";
import * as IoIcons from "react-icons/io";
import * as RiIcons from "react-icons/ri";
import { enums } from "./data/Enums";

import CustomerGroup from "./Views/Forms/customer/group/List/CustomerGroup";
import AccessoriesDefine from "./Views/Forms/definations/accessories/accessoriesDefine/AccessoriesDefine";
import StatusDeviceStartDefine from "./Views/Forms/definations/statusDeviceStart/statusDeviceStartDefine/StatusDeviceStartDefine";
import StatusDeviceStart from "./Views/Forms/definations/statusDeviceStart/StatusDeviceStart";
import Registered from "./Views/Forms/service/registered/Registered";
import SentCustomer from "./Views/Forms/service/sentCustomer/SentCustomer";
import SentCustomerForm from "./Views/Forms/service/sentCustomer/SentCustomerForm";
import StatusDeviceProgress from "./Views/Forms/definations/statusDeviceProgress/StatusDeviceProgress";
import StatusDeviceProgressDefine from "./Views/Forms/definations/statusDeviceProgress/statusDeviceProgressDefine/StatusDeviceProgressDefine";
import StatusDeviceEnd from "./Views/Forms/definations/statusDeviceEnd/StatusDeviceEnd";
import StatusDeviceEndDefine from "./Views/Forms/definations/statusDeviceEnd/statusDeviceEndDefine/StatusDeviceEndDefine";
const CustomerGroupForm = lazy(() =>
  import("./Views/Forms/customer/group/CustomerGroupForm")
);
const CustomerList = lazy(() =>
  import("./Views/Forms/customer/customer/list/CustomerList")
);
const CustomerForm = lazy(() =>
  import("./Views/Forms/customer/customer/CustomerForm")
);
const CheckListEntryFormDefine = lazy(() =>
  import(
    "./Views/Forms/definations/checkLists/checkListEntry/checkListEntryForm/CheckListEntryFormDefine"
  )
);
const CheckListExitFormDefine = lazy(() =>
  import(
    "./Views/Forms/definations/checkLists/checkListExit/checkListExitFormDefine/CheckListExitFormDefine"
  )
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
const Online = lazy(() => import("./Views/Forms/panel/online/online"));
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
const ValidIps = lazy(() =>
  import("./Views/Forms/panel/virtualIpForm/ValidIps")
);
const VirtualIpForm = lazy(() =>
  import("./Views/Forms/panel/virtualIpForm/VirtualIpForm")
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
const CheckListEntry = lazy(() =>
  import("./Views/Forms/definations/checkLists/checkListEntry/CheckListEntry")
);
const CheckListExit = lazy(() =>
  import("./Views/Forms/definations/checkLists/checkListExit/CheckListExit")
);
const PhoneDefects = lazy(() =>
  import("./Views/Forms/definations/phoneDefects/PhoneDefects")
);
const PhoneDefectsForm = lazy(() =>
  import(
    "./Views/Forms/definations/phoneDefects/phoneDefectDefine/PhoneDefectDefine"
  )
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
export const Routes = [
  {
    title: "routes.panel",
    access: enums.Module_Operator,
    icon: <IoIcons.IoIosPaper />,
    iconClosed: <RiIcons.RiArrowDownSFill />,
    iconOpened: <RiIcons.RiArrowUpSFill />,
    subNav: [
      {
        title: "routes.online",
        path: "/operatoronline",
        Component: Online,
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
          path: "/operatorgroupcreate",
          title: "routes.groupForm",
          access: enums.Operator_Group_Create_w,
        },
        icon: <IoIcons.IoIosPaper />,
        cName: "sub-nav",
      },
      {
        title: "routes.operator",
        path: "/Operator/Operator/Read",
        access: enums.Operator_Operator_Read_r,
        Component: Operator,
        button: {
          Component: OperatorForm,
          path: "/operatorcreate",
          title: "routes.operatorForm",
          access: enums.Operator_Operator_Create_w,
        },
        icon: <IoIcons.IoIosPaper />,
        cName: "sub-nav",
      },
      {
        title: "routes.validIps",
        path: "/operatorvalidIp",
        access: enums.Operator_AllowedIp_Read_r,
        Component: ValidIps,
        button: {
          Component: VirtualIpForm,
          path: "/operatorcreatevalidip",
          title: "routes.validIpsForm",
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
        title: "routes.actions",
        path: "/optevents",
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
        title: "routes.registered",
        path: "/registered",
        access: enums.AfterSales_New_Registered_Read_r,
        Component: Registered,
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
    title: "routes.basicDefinations",
    icon: <IoIcons.IoIosPaper />,
    access: enums.Module_Definition,
    iconClosed: <RiIcons.RiArrowDownSFill />,
    iconOpened: <RiIcons.RiArrowUpSFill />,
    subNav: [
      {
        title: "routes.entryCheckList",
        path: "/entryCheckList",
        access: enums.Definition_InputQualityControl_Read_r,
        Component: CheckListEntry,
        button: {
          Component: CheckListEntryFormDefine,
          path: "/entryCheckListForm",
          title: "routes.entryCheckListForm",
          access: enums.Definition_InputQualityControl_Create_w,
        },
        icon: <IoIcons.IoIosPaper />,
        cName: "sub-nav",
      },
      {
        title: "routes.exitCheckList",
        path: "/exitCheckList",
        access: enums.Definition_OutputQualityControl_Read_r,
        Component: CheckListExit,
        button: {
          Component: CheckListExitFormDefine,
          path: "/exitCheckListForm",
          title: "routes.exitCheckListForm",
          access: enums.Definition_OutputQualityControl_Create_w,
        },
        icon: <IoIcons.IoIosPaper />,
        cName: "sub-nav",
      },
      {
        title: "routes.phoneIssues",
        path: "/phoneIssues",
        access: enums.Definition_Defect_Read_r,
        Component: PhoneDefects,
        button: {
          Component: PhoneDefectsForm,
          path: "/phoneIssuesForm",
          title: "routes.phoneIssuesForm",
          access: enums.Definition_Defect_Create_w,
        },
        icon: <IoIcons.IoIosPaper />,
        cName: "sub-nav",
      },
      {
        title: "routes.parts",
        path: "/parts",
        access: enums.Definition_Part_Read_r,
        Component: Parts,
        button: {
          Component: PartsDefine,
          path: "/partsForm",
          title: "routes.partsForm",
          access: enums.Definition_Part_Create_w,
        },
        icon: <IoIcons.IoIosPaper />,
        cName: "sub-nav",
      },
      //     {
      //       title: 'routes.admissionCheckList',
      //       path:'/admissionCheckList',
      //       access:enums.admissionCheckList,
      //      Component:AdmissionCheckList,
      //       button:{
      //        Component:AdmissionCheckDefine,
      //         path:"/admissionCheckListForm",
      //         title:"routes.admissionCheckListForm",
      //         access:enums.admissionCheckListForm,
      //       },
      //       icon: <IoIcons.IoIosPaper/> ,
      //       cName: 'sub-nav'
      //     },
      {
        title: "StatusDeviceStart",
        path: "/StatusDeviceStart",
        access: enums.Definition_StatusDeviceStart_Read_r,
        Component: StatusDeviceStart,
        button: {
          Component: StatusDeviceStartDefine,
          path: "/StatusDeviceStartDefine",
          title: "StatusDeviceStartDefine",
          access: enums.Definition_StatusDeviceStart_Create_w,
        },
        icon: <IoIcons.IoIosPaper />,
        cName: "sub-nav",
      },
      {
        title: "StatusDeviceProgress",
        path: "/statusdeviceprogress",
        access: enums.Definition_StatusDeviceProgress_Read_r,
        Component: StatusDeviceProgress,
        button: {
          Component: StatusDeviceProgressDefine,
          path: "/statusdeviceprogressdefine",
          title: "StatusDeviceProgressDefine",
          access: enums.Definition_StatusDeviceProgress_Create_w,
        },
        icon: <IoIcons.IoIosPaper />,
        cName: "sub-nav",
      },
      {
        title: "StatusDeviceEnd",
        path: "/StatusDeviceEnd",
        access: enums.Definition_StatusDeviceEnd_Read_r,
        Component: StatusDeviceEnd,
        button: {
          Component: StatusDeviceEndDefine,
          path: "/StatusDeviceEndDefine",
          title: "StatusDeviceEndDefine",
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
      {
        title: "routes.warrantyCancelation",
        path: "/warrantyCancelation",
        access: enums.Definition_ReasonForCancellationOfWarranty_Read_r,
        Component: WarrantyCancelation,
        button: {
          Component: WarrantyCancelationForm,
          path: "/warrantyCancelationForm",
          title: "routes.warrantyCancelationForm",
          access: enums.Definition_ReasonForCancellationOfWarranty_Create_w,
        },
        icon: <IoIcons.IoIosPaper />,
        cName: "sub-nav",
      },
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
      {
        title: "routes.extraServices",
        path: "/extraServices",
        access: enums.Definition_AdditionalService_Read_r,
        Component: ExtraServices,
        button: {
          Component: ExtraServicesDefine,
          path: "/extraServicesForm",
          title: "routes.extraServicesForm",
          access: enums.Definition_AdditionalService_Create_w,
        },
        icon: <IoIcons.IoIosPaper />,
        cName: "sub-nav",
      },
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

  {
    title: "routes.question",
    access: enums.Module_Survey,
    icon: <IoIcons.IoIosPaper />,
    iconClosed: <RiIcons.RiArrowDownSFill />,
    iconOpened: <RiIcons.RiArrowUpSFill />,
    subNav: [
      {
        title: "routes.questionList",
        path: "/Survey/Question/Read",
        Component: QuestionList,
        button: {
          Component: QuestionForm,
          path: "/Survey/Question/Create",
          title: "routes.questionForm",
          access: enums.Survey_QuestionPage_Create_w,
        },
        icon: <IoIcons.IoIosPaper />,
        cName: "sub-nav",
        access: enums.Survey_QuestionPage_Read_r,
      },
     
    ],
  },
];
