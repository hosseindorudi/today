import React, { lazy } from 'react';
import * as IoIcons from 'react-icons/io';
import * as RiIcons from 'react-icons/ri';
import { enums } from './data/Enums';
import Agent from './Views/Forms/agent/agentForm/Agent';
import AgentForm from './Views/Forms/agent/agentForm/AgentForm';
import CustomerGroup from './Views/Forms/customer/group/List/CustomerGroup';
import Registered from './Views/Forms/service/registered/Registered';
const CustomerGroupForm=lazy(()=>import("./Views/Forms/customer/group/CustomerGroupForm"))
const CustomerList=lazy(()=>import("./Views/Forms/customer/customer/list/CustomerList"))
const CustomerForm=lazy(()=>import("./Views/Forms/customer/customer/CustomerForm"))
const AccessDefine=lazy(()=>import("./Views/Forms/definations/accessories/accessDefine/AccessDefine"))
const AdmissionCheckDefine=lazy(()=>import("./Views/Forms/definations/admissionCheckList/admissionCheckDefine/AdmissionCheckDefine"))
const AgentAbilityDefine=lazy(()=>import("./Views/Forms/definations/agentsAbility/agentAbilityDefine/AgentAbilityDefine"))
const CheckListEntryFormDefine=lazy(()=>import("./Views/Forms/definations/checkLists/checkListEntry/checkListEntryForm/CheckListEntryFormDefine"))
const CheckListExitFormDefine=lazy(()=>import("./Views/Forms/definations/checkLists/checkListExit/checkListExitFormDefine/CheckListExitFormDefine"))
const CustomerReceivedMsgTypeDefine=lazy(()=>import("./Views/Forms/definations/customerReceivedMsgType/customerReceivedMsgTypeDefine/CustomerReceivedMsgTypeDefine"))
const CustomerSendMsgTypeDefine=lazy(()=>import("./Views/Forms/definations/CustomerSendMsgType/CustomerSendMsgTypeDefine/CustomerSendMsgTypeDefine"))
const ExtraServicesDefine=lazy(()=>import("./Views/Forms/definations/extraServices/extraServicesDefine/ExtraServicesDefine"))
const InventoryGroupDefine=lazy(()=>import("./Views/Forms/definations/inventoryGroup/inventoryGroup/InventoryGroupDefine"))
const PartRequestDefine=lazy(()=>import("./Views/Forms/definations/partRequest/partRequestDefine/PartRequestDefine"))
const Delivery=lazy(()=>import("./Views/Forms/service/delivery/Delivery"))
const DeliveryForm=lazy(()=>import("./Views/Forms/service/delivery/DeliveryForm"))
const TechnicianForm=lazy(()=>import("./Views/Forms/service/technecian/technicianForm/TechnicianForm"))
const Technician=lazy(()=>import("./Views/Forms/service/technecian/technicianList/Technician"))
const Allocation=lazy(()=>import("./Views/Forms/service/alocation/Allocation"))
const AllocationForm=lazy(()=>import("./Views/Forms/service/alocation/AllocationForm"))
const QcExitForm =lazy(()=>import("./Views/Forms/service/QcExit/qcExitList/QcExitList"))
const QcExit=lazy(()=>import("./Views/Forms/service/QcExit/qcExitForm/Qc"))
const QcEntry=lazy(()=>import("./Views/Forms/service/QCEntry/qcEntryForm/Qc"))
const QcFormEntry=lazy(()=>import("./Views/Forms/service/QCEntry/qcEntryList/QcForm"))
const Archive=lazy(()=>import("./Views/Forms/service/archive/Archive"))
const Sent=lazy(()=>import("./Views/Forms/service/sent/sentFormList/SentFormList"))
const Change=lazy(()=>import("./Views/Forms/service/change/changeList/Change"))
const ChangeForm=lazy(()=>import("./Views/Forms/service/change/changeForm/ChangeForm"))
const SentForm=lazy(()=>import("./Views/Forms/service/sent/sentForm/SentForm"))

const WorkFlow=lazy(()=>import("./Views/Forms/service/workFlow/WorkFlow"))
const Accessories=lazy(()=>import("./Views/Forms/definations/accessories/Accessories"))
const ProductGroupForm=lazy(()=>import("./Views/Forms/definations/productGroup/productGroupDefine/ProductGroupDefine"))
const ProductGroup=lazy(()=>import("./Views/Forms/definations/productGroup/ProductGroup"))
const Product=lazy(()=>import("./Views/Forms/definations/product/Product"))
const ProductForm=lazy(()=>import("./Views/Forms/definations/product/productDefine/ProductDefine"))
const TechAbilityForm=lazy(()=>import("./Views/Forms/definations/techAbility/techAbilityDefine/TechAbilityDefine"))
const TechAbility=lazy(()=>import("./Views/Forms/definations/techAbility/TechAbility"))
const InventoryGroup=lazy(()=>import("./Views/Forms/definations/inventoryGroup/InventoryGroup"))
const WarrantyCancelationForm=lazy(()=>import("./Views/Forms/definations/warrantyCancelation/warrantyCancelationDefine/WarrantyCancelationDefine"))
const WarrantyCancelation=lazy(()=>import("./Views/Forms/definations/warrantyCancelation/WarrantyCancelation"))
const PartRequest=lazy(()=>import("./Views/Forms/definations/partRequest/PartRequest"))
const WorksDoneOnPhoneForm=lazy(()=>import("./Views/Forms/definations/worksDoneOnPhone/worksDoneOnPhoneDefine/WorksDoneOnPhoneDefine"))
const WorksDoneOnPhone=lazy(()=>import("./Views/Forms/definations/worksDoneOnPhone/WorksDoneOnPhone"))
const ExtraServices=lazy(()=>import("./Views/Forms/definations/extraServices/ExtraServices"))
const AgentsAbility=lazy(()=>import("./Views/Forms/definations/agentsAbility/AgentsAbility"))

const SystemMsgType=lazy(()=>import("./Views/Forms/definations/systemMsgtype/SystemMsgType"))
const SystemMsgTypeForm=lazy(()=>import("./Views/Forms/definations/systemMsgtype/systemMsgtypeDefine/SystemMsgtypeDefine"))
const CustomerSendMsgType=lazy(()=>import("./Views/Forms/definations/CustomerSendMsgType/CustomerSendMsgType"))
const CustomerReceivedMsgType=lazy(()=>import("./Views/Forms/definations/customerReceivedMsgType/CustomerReceivedMsgType"))
const WarrantyType=lazy(()=>import("./Views/Forms/definations/warrantyType/WarrantyType"))
const WarrantyTypeForm=lazy(()=>import("./Views/Forms/definations/warrantyType/warrantyTypeDefine/WarrantyTypeDefine"))
const PhoneStatus=lazy(()=>import("./Views/Forms/definations/phoneStatus/PhoneStatus"))
const PhoneStatusForm=lazy(()=>import("./Views/Forms/definations/phoneStatus/phoneStatusDefine/PhoneStatusDefine"))
const StatusAfterWork=lazy(()=>import("./Views/Forms/definations/StatusAfterWork/StatusAfterWork"))
const StatusAfterWorkForm=lazy(()=>import("./Views/Forms/definations/StatusAfterWork/StatusAfterWorkDefine/StatusAfterWorkDefine"))
const StatusAfterCheck=lazy(()=>import("./Views/Forms/definations/statusAfterCheck/StatusAfterCheck"))
const StatusAfterCheckForm=lazy(()=>import("./Views/Forms/definations/statusAfterCheck/statusAfterCheckDefine/StatusAfterCheckDefine"))
const AdmissionCheckList=lazy(()=>import("./Views/Forms/definations/admissionCheckList/AdmissionCheckList"))
const PartsDefine=lazy(()=>import("./Views/Forms/definations/parts/partsDefine/PartsDefine"))
const Parts=lazy(()=>import("./Views/Forms/definations/parts/Parts"))
const Online=lazy(()=>import('./Views/Forms/panel/online/online'))
// const agentOnline=lazy(()=>import('./Views/Forms/agent/online/online'))
const Group=lazy(()=>import('./Views/Forms/panel/operatorGroupForm/List/Group'))
const OperatorGroupForm=lazy(()=>import('./Views/Forms/panel/operatorGroupForm/OperatorGroupForm'))
const agentGroup=lazy(()=>import('./Views/Forms/agent/agentGroupForm/Group'))
const AgentGroupForm=lazy(()=>import('./Views/Forms/agent/agentGroupForm/AgentGroupForm'))
const Operator=lazy(()=>import('./Views/Forms/panel/operator/List/Operator'))
const OperatorForm=lazy(()=>import('./Views/Forms/panel/operator/OperatorForm'))
const ValidIps=lazy(()=>import('./Views/Forms/panel/virtualIpForm/ValidIps'))
const VirtualIpForm=lazy(()=>import('./Views/Forms/panel/virtualIpForm/VirtualIpForm'))
const agentValidIps=lazy(()=>import('./Views/Forms/agent/virtualIpForm/ValidIps'))
const agentVirtualIpForm=lazy(()=>import('./Views/Forms/agent/virtualIpForm/VirtualIpForm'))
const Attacks=lazy(()=>import('./Views/Forms/panel/attacks/Attacks'))
const agentAttacks=lazy(()=>import('./Views/Forms/agent/attacks/Attacks'))
const Incident=lazy(()=>import('./Views/Forms/panel/incident/Incident'))
const FailedLogin=lazy(()=>import('./Views/Forms/panel/loginlogs/FailedLogin'))
const SuccessLogin=lazy(()=>import('./Views/Forms/panel/loginlogs/SuccessLogin'))
const agentIncident=lazy(()=>import('./Views/Forms/agent/incident/Incident'))
const agentFailedLogin=lazy(()=>import('./Views/Forms/agent/loginlogs/FailedLogin'))
const agentSuccessLogin=lazy(()=>import('./Views/Forms/agent/loginlogs/SuccessLogin'))
const Admission=lazy(()=>import('./Views/Forms/service/admission/Admission'))
const AdmissionForm=lazy(()=>import('./Views/Forms/service/admission/AdmissionForm'))
const CheckListEntry=lazy(()=>import('./Views/Forms/definations/checkLists/checkListEntry/CheckListEntry'))
const CheckListExit=lazy(()=>import('./Views/Forms/definations/checkLists/checkListExit/CheckListExit'))
const PhoneDefects=lazy(()=>import('./Views/Forms/definations/phoneDefects/PhoneDefects'))
const PhoneDefectsForm=lazy(()=>import('./Views/Forms/definations/phoneDefects/phoneDefectDefine/PhoneDefectDefine'))
const Pricing=lazy(()=>import('./Views/Forms/rules/pricing/Pricing'))
const TechnicianRating=lazy(()=>import('./Views/Forms/rules/technicianRating/TechnicianRating'))
const ConversationClubList = lazy(()=> import('./Views/Forms/customerClub/conversation/conversationList/ConversationList'))
const ConversationClubForm = lazy(()=> import('./Views/Forms/customerClub/conversation/conversationForm/ConversationForm'))
const DeliveryRecord = lazy(()=> import('./Views/Forms/distribution/deliveryRecord/DeliveryRecord'))
const Orders = lazy(()=> import('./Views/Forms/distribution/orders/Orders'))
const SmsForm = lazy(()=> import('./Views/Forms/setting/sms/SmsForm'))
const AddmitionFirstForm = lazy(()=> import('./Views/Forms/service/admission/AdmitionFirstForm'))
export const Routes = [
  {
    title: 'routes.panel',
    // access:enums.panel,
    icon: <IoIcons.IoIosPaper/> ,
    iconClosed: <RiIcons.RiArrowDownSFill/> ,
    iconOpened: <RiIcons.RiArrowUpSFill/> ,
    subNav: [
      {
        title: 'routes.online',
        path:'/operatoronline',
        Component:Online,
        icon: <IoIcons.IoIosPaper/> ,
        cName: 'sub-nav',
        access:enums.Operator_OnlineOperator_Read_r
      },
      {
        title: 'routes.group',
        path:'/operatorgroup',
        access:enums.Operator_Group_Read_r,
        Component:Group,
       
        button:{
          Component:OperatorGroupForm,
          path:"/operatorgroupcreate",
          title:"routes.groupForm",
          access:enums.Operator_Group_Create_w
        },
        icon: <IoIcons.IoIosPaper/> ,
        cName: 'sub-nav'
      },
      {
        title: 'routes.operator',
        path:'/operator',
        access:enums.Operator_Operator_Read_r,
       Component:Operator,
        button:{
          Component:OperatorForm,
          path:"/operatorcreate",
          title:"routes.operatorForm",
          access:enums.Operator_Operator_Create_w
        },
        icon: <IoIcons.IoIosPaper/> ,
        cName: 'sub-nav'
      },
      {
        title: 'routes.validIps',
        path:'/operatorvalidIp',
        access:enums.Operator_AllowedIp_Read_r,
       Component:ValidIps,
        button:{
          Component:VirtualIpForm,
          path:"/operatorcreatevalidip",
          title:"routes.validIpsForm",
          access:enums.Operator_AllowedIp_Create_w,
        },
        icon: <IoIcons.IoIosPaper/> ,
        cName: 'sub-nav'
      },
      {
        title: 'routes.attacks',
        path:'/optbruteforce',
        access:enums.Operator_BruteForce_Read_r,
        Component:Attacks,
        icon: <IoIcons.IoIosPaper/> ,
        cName: 'sub-nav'
      },
      {
        title: 'routes.actions',
        path:'/optevents',
        access:enums.Operator_Event_Read_r,
        Component:Incident,
        icon: <IoIcons.IoIosPaper/> ,
        cName: 'sub-nav'
      },
      {
        title: 'routes.unsuccesslogin',
        path:'/optfailedhistory',
        access:enums.Operator_FailedHistory_Read_r,
       Component:FailedLogin,
        icon: <IoIcons.IoIosPaper/> ,
        cName: 'sub-nav'
      },
      {
        title: 'routes.sucesslogin',
        path:'/oprloginhistory',
        access:enums.Operator_LoginHistory_Read_r,
        Component:SuccessLogin,
        icon: <IoIcons.IoIosPaper/> ,
        cName: 'sub-nav'
      },
    ]
  },
  {
    title: 'routes.customer',
    icon: <IoIcons.IoIosPaper/> ,
    iconClosed: <RiIcons.RiArrowDownSFill/> ,
    iconOpened: <RiIcons.RiArrowUpSFill/> ,
    subNav: [
      {
        title: 'routes.group',
        path:'/customergroup',
        Component:CustomerGroup,
        button:{
          Component:CustomerGroupForm,
          path:'/customergroupform',
          title:"routes.groupForm",
          access:enums.Customer_Group_Create_w,
        },
        icon: <IoIcons.IoIosPaper/> ,
        cName: 'sub-nav',
        access:enums.Customer_Group_Read_r
      },
      {
        title: 'routes.CustomerList',
        path:'/customerList',
        Component:CustomerList,
        button:{
          Component:CustomerForm,
          path:'/customerform',
          title:"routes.customerForm",
          access:enums.Customer_Customer_Create_w ,
        },
        icon: <IoIcons.IoIosPaper/> ,
        cName: 'sub-nav',
        access:enums.Customer_Customer_Read_r
      },
    ]
  },
//   {
//     title: 'routes.GeneralRepresentative',
//     icon: <IoIcons.IoIosPaper/> ,
//     access:enums.agents,
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
    title: 'routes.services',
    icon: <IoIcons.IoIosPaper/> ,
    iconClosed: <RiIcons.RiArrowDownSFill/> ,
    iconOpened: <RiIcons.RiArrowUpSFill/> ,
    subNav: [
      {
        title: 'routes.workFlow',
        path:'/workFlow',
        access:enums.AfterSales_Dashboard_Index,
        Component:WorkFlow,
        icon: <IoIcons.IoIosPaper/> ,
        cName: 'sub-nav'
      },
      {
        title: 'routes.admission',
        path:'/admission',
        access:enums.AfterSales_New_Admission_Read_r,
        Component:Admission,
        button:{
          Component:AddmitionFirstForm,
          path:"/admissionForm",
          title:"routes.admissionForm",
          access:enums.AfterSales_New_Admission_Create_w
        },
        icon: <IoIcons.IoIosPaper/> ,
        cName: 'sub-nav'
      },
      {
        title: 'routes.service.QcEntry',
        path:'/service.QcEntry',
        access:enums.AfterSales_New_InputQualityControl_Read_r,
        Component:QcFormEntry,
        button:{
         Component:QcEntry,
          path:"/service.QcEntryForm",
          title:"routes.service.QcEntryForm",
          access:enums.AfterSales_New_InputQualityControl_Create_w
        },
        icon: <IoIcons.IoIosPaper/> ,
        cName: 'sub-nav'
      },
      {
        title: 'routes.service.allocation',
        path:'/service.allocation',
        access:enums.AfterSales_New_AssignToTechnician_Read_r,
        Component:Allocation,
        icon: <IoIcons.IoIosPaper/> ,
        cName: 'sub-nav'
      },
      {
        title: 'routes.service.technician',
        path:'/service.technician',
        access:enums.AfterSales_New_Repair_Read_r,
        Component:Technician,
        button:{
          Component:TechnicianForm,
          path:"/service.technicianForm",
          title:"routes.service.technicianForm",
          access:enums.AfterSales_New_Repair_Create_w,
        },
        icon: <IoIcons.IoIosPaper/> ,
        cName: 'sub-nav'
      },
      {
        title: 'routes.service.qcExit',
        path:'/service.qcExit',
        access:enums.AfterSales_New_OutputQualityControl_Read_r,
        Component:QcExitForm,
        button:{
         Component:QcExit,
          path:"/service.qcExitForm",
          title:'routes.service.qcExitForm',
          access:enums.AfterSales_New_OutputQualityControl_Create_w
        },
        icon: <IoIcons.IoIosPaper/> ,
        cName: 'sub-nav'
      },
      {
        title: 'routes.service.delivery',
        path:'/service.delivery',
        access:enums.AfterSales_New_DeliveryInPerson_Read_r,
        Component:Delivery,
        icon: <IoIcons.IoIosPaper/> ,
        cName: 'sub-nav'
      },
      {
        title: 'routes.registered',
        path:'/registered',
        access:enums.AfterSales_New_Registered_Read_r,
        Component:Registered,
        icon: <IoIcons.IoIosPaper/> ,
        cName: 'sub-nav'
      },
      {
        title: 'routes.changing',
        path:'/changing',
        access:enums.AfterSales_New_Replacement_Read_r,
       Component:Change,
        button:{
         Component:ChangeForm,
          path:"/changingForm",
          title:"routes.changingForm",
          access:enums.AfterSales_New_Replacement_Create_w
        },
        icon: <IoIcons.IoIosPaper/> ,
        cName: 'sub-nav'
      },
      {
        title: 'routes.sentAgent',
        path:'/sent',
        access:enums.AfterSales_New_SendToAgent_Read_r,
       Component:Sent,
        button:{
         Component:SentForm,
          path:"/sentForm",
          title:"routes.sentAgentForm",
          access:enums.AfterSales_New_SendToAgent_Create_w,
        },
        icon: <IoIcons.IoIosPaper/> ,
        cName: 'sub-nav'
      },
      {
        title: 'routes.archive',
        path:'/archive',
        access:enums.AfterSales_Archive_Read_r,
        Component:Archive,
        icon: <IoIcons.IoIosPaper/> ,
        cName: 'sub-nav'
      },
]},
// {
//   title: 'routes.basicDefinations',
//   icon: <IoIcons.IoIosPaper/> ,
//   access:enums.definations,
//   iconClosed: <RiIcons.RiArrowDownSFill/> ,
//   iconOpened: <RiIcons.RiArrowUpSFill/> ,
//   subNav: [
//     {
//       title: 'routes.entryCheckList',
//       path:'/entryCheckList',
//       access:enums.entryCheckList,
//      Component:CheckListEntry,
//       button:{
//        Component:CheckListEntryFormDefine ,
//         path:"/entryCheckListForm",
//         title:"routes.entryCheckListForm",
//         access:enums.entryCheckListForm,
//       },
//       icon: <IoIcons.IoIosPaper/> ,
//       cName: 'sub-nav'
//     },
//     {
//       title: 'routes.exitCheckList',
//       path:'/exitCheckList',
//       access:enums.exitCheckList,
//      Component:CheckListExit,
//       button:{
//        Component:CheckListExitFormDefine,
//         path:"/exitCheckListForm",
//         title:"routes.exitCheckListForm",
//         access:enums.exitCheckListForm,
//       },
//       icon: <IoIcons.IoIosPaper/> ,
//       cName: 'sub-nav'
//     },
//     {
//       title: 'routes.phoneIssues',
//       path:'/phoneIssues',
//       access:enums.phoneIssues,
//      Component:PhoneDefects,
//       button:{
//        Component:PhoneDefectsForm,
//         path:"/phoneIssuesForm",
//         title:"routes.phoneIssuesForm",
//         access:enums.phoneIssuesForm,
//       },
//       icon: <IoIcons.IoIosPaper/> ,
//       cName: 'sub-nav'
//     },
//     {
//       title: 'routes.parts',
//       path:'/parts',
//       access:enums.parts,
//      Component:Parts,
//       button:{
//        Component:PartsDefine,
//         path:"/partsForm",
//         title:"routes.partsForm",
//         access:enums.partForm,
//       },
//       icon: <IoIcons.IoIosPaper/> ,
//       cName: 'sub-nav'
//     },
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
//     {
//       title: 'routes.phoneStatusAftertechCheck',
//       path:'/phoneStatusAftertechCheck',
//       access:enums.phoneStatusAftertechCheck,
//      Component:StatusAfterCheck,
//       button:{
//        Component:StatusAfterCheckForm,
//         path:"/phoneStatusAftertechCheckForm",
//         title:"routes.phoneStatusAftertechCheckForm",
//         access:enums.phoneStatusAftertechCheckForm,
//       },
//       icon: <IoIcons.IoIosPaper/> ,
//       cName: 'sub-nav'
//     },
//     {
//       title: 'routes.phoneStatusAftertechWork',
//       path:'/phoneStatusAftertechWork',
//       access:enums.phoneStatusAftertechWork,
//      Component:StatusAfterWork,
//       button:{
//        Component:StatusAfterWorkForm,
//         path:"/phoneStatusAftertechWorkForm",
//         title:"routes.phoneStatusAftertechWorkForm",
//         access:enums.phoneStatusAftertechWorkForm,
//       },
//       icon: <IoIcons.IoIosPaper/> ,
//       cName: 'sub-nav'
//     },
//     {
//       title: 'routes.phoneStatus',
//       path:'/phoneStatus',
//       access:enums.phoneStatus,
//      Component:PhoneStatus,
//       button:{
//        Component:PhoneStatusForm,
//         path:"/phoneStatusForm",
//         title:"routes.phoneStatusForm",
//         access:enums.phoneStatusForm,
//       },
//       icon: <IoIcons.IoIosPaper/> ,
//       cName: 'sub-nav'
//     },
//     {
//       title: 'routes.garanteeType',
//       path:'/garanteeType',
//       access:enums.garanteeType,
//      Component:WarrantyType,
//       button:{
//        Component:WarrantyTypeForm,
//         path:"/garanteeTypeForm",
//         title:"routes.garanteeTypeForm",
//         access:enums.garanteeTypeForm,
//       },
//       icon: <IoIcons.IoIosPaper/> ,
//       cName: 'sub-nav'
//     },
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
//       title: 'routes.product',
//       path:'/product',
//       access:enums.product,
//      Component:Product,
//       button:{
//        Component:ProductForm,
//         path:"/productForm",
//         title:"routes.productForm",
//         access:enums.productForm,
//       },
//       icon: <IoIcons.IoIosPaper/> ,
//       cName: 'sub-nav'
//     },
//     {
//       title: 'routes.productGroup',
//       path:'/productGroup',
//       access:enums.productGroup,
//      Component:ProductGroup,
//       button:{
//        Component:ProductGroupForm,
//         path:"/productGroupForm",
//         title:"routes.productGroupForm",
//         access:enums.productGroupForm,
//       },
//       icon: <IoIcons.IoIosPaper/> ,
//       cName: 'sub-nav'
//     },
//     {
//       title: 'routes.accessories',
//       path:'/accessories',
//       access:enums.accessories,
//      Component:Accessories,
//       button:{
//        Component:AccessDefine,
//         path:"/accessoriesForm",
//         title:"routes.accessoriesForm",
//         access:enums.accessoriesForm,
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
//       title: 'routes.warrantyCancelation',
//       path:'/warrantyCancelation',
//       access:enums.warrantyCancelation,
//      Component:WarrantyCancelation,
//       button:{
//        Component:WarrantyCancelationForm,
//         path:"/warrantyCancelationForm",
//         title:"routes.warrantyCancelationForm",
//         access:enums.warrantyCancelationForm,
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
//     {
//       title: 'routes.extraServices',
//       path:'/extraServices',
//       access:enums.extraServices,
//      Component:ExtraServices,
//       button:{
//        Component:ExtraServicesDefine,
//         path:"/extraServicesForm",
//         title:"routes.extraServicesForm",
//         access:enums.extraServicesForm,
//       },
//       icon: <IoIcons.IoIosPaper/> ,
//       cName: 'sub-nav'
//     }

// ]},
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
