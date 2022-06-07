import React, { lazy } from 'react';
import * as IoIcons from 'react-icons/io';
import * as RiIcons from 'react-icons/ri';
import { menues } from './data/Enums';
const Delivery=lazy(()=>import("./Views/Forms/service/delivery/Delivery"))
const DeliveryForm=lazy(()=>import("./Views/Forms/service/delivery/DeliveryForm"))
const TechnicianForm=lazy(()=>import("./Views/Forms/service/technecian/TechnicianForm"))
const Technician=lazy(()=>import("./Views/Forms/service/technecian/Technician"))
const Allocation=lazy(()=>import("./Views/Forms/service/alocation/Allocation"))
const AllocationForm=lazy(()=>import("./Views/Forms/service/alocation/AllocationForm"))
const QcEntry=lazy(()=>import("./Views/Forms/service/QCEntry/Qc"))
const QcFormEntry=lazy(()=>import("./Views/Forms/service/QCEntry/QcForm"))
const Archive=lazy(()=>import("./Views/Forms/service/archive/Archive"))
const Sent=lazy(()=>import("./Views/Forms/service/sent/Sent"))
const Change=lazy(()=>import("./Views/Forms/service/change/Change"))
const ChangeForm=lazy(()=>import("./Views/Forms/service/change/ChangeForm"))
const SentForm=lazy(()=>import("./Views/Forms/service/sent/SentForm"))
const AcceptDelivery=lazy(()=>import("./Views/Forms/service/acceptDelivery/AcceptDelivery"))
const AcceptDeliveryForm=lazy(()=>import("./Views/Forms/service/acceptDelivery/AcceptDeliveryForm"))
const WorkFlow=lazy(()=>import("./Views/Forms/service/workFlow/WorkFlow"))
const Accessories=lazy(()=>import("./Views/Forms/accessories/Accessories"))
const AccessoriesForm=lazy(()=>import("./Views/Forms/accessories/AccessoriesForm"))
const ProductGroupForm=lazy(()=>import("./Views/Forms/productGroup/ProductGroupForm"))
const ProductGroup=lazy(()=>import("./Views/Forms/productGroup/ProductGroup"))
const Product=lazy(()=>import("./Views/Forms/product/Product"))
const ProductForm=lazy(()=>import("./Views/Forms/product/ProductForm"))
const TechAbilityForm=lazy(()=>import("./Views/Forms/techAbility/TechAbilityForm"))
const TechAbility=lazy(()=>import("./Views/Forms/techAbility/TechAbility"))
const InventoryGroupForm=lazy(()=>import("./Views/Forms/inventoryGroup/InventoryGroupForm"))
const InventoryGroup=lazy(()=>import("./Views/Forms/inventoryGroup/InventoryGroup"))
const WarrantyCancelationForm=lazy(()=>import("./Views/Forms/warrantyCancelation/WarrantyCancelationForm"))
const WarrantyCancelation=lazy(()=>import("./Views/Forms/warrantyCancelation/WarrantyCancelation"))
const PartRequestForm=lazy(()=>import("./Views/Forms/partRequest/PartRequestForm"))
const PartRequest=lazy(()=>import("./Views/Forms/partRequest/PartRequest"))
const WorksDoneOnPhoneForm=lazy(()=>import("./Views/Forms/worksDoneOnPhone/WorksDoneOnPhoneForm"))
const WorksDoneOnPhone=lazy(()=>import("./Views/Forms/worksDoneOnPhone/WorksDoneOnPhone"))
const ExtraServices=lazy(()=>import("./Views/Forms/extraServices/ExtraServices"))
const ExtraServicesForm=lazy(()=>import("./Views/Forms/extraServices/ExtraServicesForm"))
const AgentsAbility=lazy(()=>import("./Views/Forms/agentsAbility/AgentsAbility"))
const AgentsAbilityForm=lazy(()=>import("./Views/Forms/agentsAbility/AgentsAbilityForm"))
const SystemMsgType=lazy(()=>import("./Views/Forms/systemMsgtype/SystemMsgType"))
const SystemMsgTypeForm=lazy(()=>import("./Views/Forms/systemMsgtype/SystemMsgTypeForm"))
const CustomerSendMsgType=lazy(()=>import("./Views/Forms/CustomerSendMsgType/CustomerSendMsgType"))
const CustomerSendMsgTypeForm=lazy(()=>import("./Views/Forms/CustomerSendMsgType/CustomerSendMsgTypeForm"))
const CustomerReceivedMsgType=lazy(()=>import("./Views/Forms/customerReceivedMsgType/CustomerReceivedMsgType"))
const CustomerReceivedMsgTypeForm=lazy(()=>import("./Views/Forms/customerReceivedMsgType/CustomerReceivedMsgTypeForm"))
const WarrantyType=lazy(()=>import("./Views/Forms/warrantyType/WarrantyType"))
const WarrantyTypeForm=lazy(()=>import("./Views/Forms/warrantyType/WarrantyTypeForm"))
const PhoneStatus=lazy(()=>import("./Views/Forms/phoneStatus/PhoneStatus"))
const PhoneStatusForm=lazy(()=>import("./Views/Forms/phoneStatus/PhoneStatusForm"))
const StatusAfterWork=lazy(()=>import("./Views/Forms/StatusAfterWork/StatusAfterWork"))
const StatusAfterWorkForm=lazy(()=>import("./Views/Forms/StatusAfterWork/StatusAfterWorkForm"))
const StatusAfterCheck=lazy(()=>import("./Views/Forms/statusAfterCheck/StatusAfterCheck"))
const StatusAfterCheckForm=lazy(()=>import("./Views/Forms/statusAfterCheck/StatusAfterCheckForm"))
const AdmissionCheckList=lazy(()=>import("./Views/Forms/admissionCheckList/AdmissionCheckList"))
const AdmissionCheckListForm=lazy(()=>import("./Views/Forms/admissionCheckList/AdmissionCheckListForm"))
const PartsForm=lazy(()=>import("./Views/Forms/parts/PartsForm"))
const Parts=lazy(()=>import("./Views/Forms/parts/Parts"))
const Online=lazy(()=>import('./Views/Forms/online/online'))
const Group=lazy(()=>import('./Views/Forms/operatorGroupForm/Group'))
const OperatorGroupForm=lazy(()=>import('./Views/Forms/operatorGroupForm/OperatorGroupForm'))
const Operator=lazy(()=>import('./Views/Forms/operator/Operator'))
const OperatorForm=lazy(()=>import('./Views/Forms/operator/OperatorForm'))
const ValidIps=lazy(()=>import('./Views/Forms/virtualIpForm/ValidIps'))
const VirtualIpForm=lazy(()=>import('./Views/Forms/virtualIpForm/VirtualIpForm'))
const Attacks=lazy(()=>import('./Views/Forms/attacks/Attacks'))
const Incident=lazy(()=>import('./Views/Forms/incident/Incident'))
const FailedLogin=lazy(()=>import('./Views/Forms/loginlogs/FailedLogin'))
const SuccessLogin=lazy(()=>import('./Views/Forms/loginlogs/SuccessLogin'))
const Admission=lazy(()=>import('./Views/Forms/service/admission/Admission'))
const AdmissionForm=lazy(()=>import('./Views/Forms/service/admission/AdmissionForm'))
const CheckList=lazy(()=>import('./Views/Forms/checkLists/Qc'))
const CheckListForm=lazy(()=>import('./Views/Forms/checkLists/QcForm'))
const PhoneDefects=lazy(()=>import('./Views/Forms/phoneDefects/PhoneDefects'))
const PhoneDefectsForm=lazy(()=>import('./Views/Forms/phoneDefects/PhoneDefectsForm'))
const Pricing=lazy(()=>import('./Views/Forms/pricing/Pricing'))
const TechnicianRating=lazy(()=>import('./Views/Forms/technicianRating/TechnicianRating'))
export const Routes = [
  {
    title: 'routes.panel',
    access:menues.panel,
    icon: <IoIcons.IoIosPaper />,
    iconClosed: <RiIcons.RiArrowDownSFill />,
    iconOpened: <RiIcons.RiArrowUpSFill />,
    subNav: [
      {
        title: 'routes.online',
        path:'/panelonline',
        Component:<Online/>,
        icon: <IoIcons.IoIosPaper />,
        cName: 'sub-nav',
        access:menues.panelonline
      },
      {
        title: 'routes.group',
        path:'/panelgroup',
        access:menues.panelgroup,
        Component:<Group/>,
        button:{
          Component:<OperatorGroupForm/>,
          path:"/panelGroupForm",
          title:"routes.groupForm",
          access:menues.panelGroupForm
        },
        icon: <IoIcons.IoIosPaper />,
        cName: 'sub-nav'
      },
      {
        title: 'routes.operator',
        path:'/panelOperator',
        access:menues.panelOperator,
        Component:<Operator/>,
        button:{
          Component:<OperatorForm/>,
          path:"/panelOperatorForm",
          title:"routes.operatorForm",
          access:menues.panelOperatorForm
        },
        icon: <IoIcons.IoIosPaper />,
        cName: 'sub-nav'
      },
      {
        title: 'routes.validIps',
        path:'/panelValidIps',
        access:menues.panelValidIps,
        Component:<ValidIps/>,
        button:{
          Component:<VirtualIpForm/>,
          path:"/panelValidIpsForm",
          title:"routes.validIpsForm",
          access:menues.panelValidIpsForm,
        },
        icon: <IoIcons.IoIosPaper />,
        cName: 'sub-nav'
      },
      {
        title: 'routes.attacks',
        path:'/panelAttacks',
        access:menues.panelAttacks,
        Component:<Attacks/>,
        icon: <IoIcons.IoIosPaper />,
        cName: 'sub-nav'
      },
      {
        title: 'routes.actions',
        path:'/panelActions',
        access:menues.panelActions,
        Component:<Incident/>,
        icon: <IoIcons.IoIosPaper />,
        cName: 'sub-nav'
      },
      {
        title: 'routes.unsuccesslogin',
        path:'/panelunsuccesslogin',
        access:menues.panelunsuccesslogin,
        Component:<FailedLogin/>,
        icon: <IoIcons.IoIosPaper />,
        cName: 'sub-nav'
      },
      {
        title: 'routes.sucesslogin',
        path:'/panelsucesslogin',
        access:menues.panelsucesslogin,
        Component:<SuccessLogin/>,
        icon: <IoIcons.IoIosPaper />,
        cName: 'sub-nav'
      },
    ]
  },
  {
    title: 'routes.GeneralRepresentative',
    icon: <IoIcons.IoIosPaper />,
    access:menues.agents,
    iconClosed: <RiIcons.RiArrowDownSFill />,
    iconOpened: <RiIcons.RiArrowUpSFill />,
    subNav: [
      {
        title: 'routes.online',
        path:'/representativeonline',
        access:menues.representativeonline,
        Component:<Online/>,
        icon: <IoIcons.IoIosPaper />,
        cName: 'sub-nav'
      },
      {
        title: 'routes.group',
        path:'/representativegroup',
        access:menues.representativegroup,
        Component:<Group/>,
        button:{
          Component:<OperatorGroupForm/>,
          path:"/representativegroupForm",
          title:"routes.groupForm",
          access:menues.representativegroupForm,
        },
        icon: <IoIcons.IoIosPaper />,
        cName: 'sub-nav'
      },
      {
        title: 'routes.representative',
        path:'/representative',
        access:menues.representative,
        Component:<Operator/>,
        button:{
          Component:<OperatorForm/>,
          path:"/representativeForm",
          title:"routes.representativeForm",
          access:menues.representativeForm
        },
        icon: <IoIcons.IoIosPaper />,
        cName: 'sub-nav'
      },
      {
        title: 'routes.validIps',
        path:'/representativeValidIps',
        access:menues.representativeValidIps,
        Component:<ValidIps/>,
        button:{
          Component:<VirtualIpForm/>,
          path:"/representativeValidIpsForm",
          title:"routes.validIpsForm",
          access:menues.representativeValidIpsForm,
        },
        icon: <IoIcons.IoIosPaper />,
        cName: 'sub-nav'
      },
      {
        title: 'routes.attacks',
        path:'/representativeAttacks',
        access:menues.representativeAttacks,
        Component:<Attacks/>,
        icon: <IoIcons.IoIosPaper />,
        cName: 'sub-nav'
      },
      {
        title: 'routes.actions',
        path:'/representativeActions',
        access:menues.representativeActions,
        Component:<Incident/>,
        icon: <IoIcons.IoIosPaper />,
        cName: 'sub-nav'
      },
      {
        title: 'routes.unsuccesslogin',
        path:'/representativeunsuccesslogin',
        access:menues.representativeunsuccesslogin,
        Component:<FailedLogin/>,
        icon: <IoIcons.IoIosPaper />,
        cName: 'sub-nav'
      },
      {
        title: 'routes.sucesslogin',
        path:'/representativesucesslogin',
        access:menues.representativesucesslogin,
        Component:<SuccessLogin/>,
        icon: <IoIcons.IoIosPaper />,
        cName: 'sub-nav'
      },
    ]
  },
  {
    title: 'routes.services',
    access:menues.services,
    icon: <IoIcons.IoIosPaper />,
    iconClosed: <RiIcons.RiArrowDownSFill />,
    iconOpened: <RiIcons.RiArrowUpSFill />,
    subNav: [
      {
        title: 'routes.workFlow',
        path:'/workFlow',
        access:menues.workFlow,
        Component:<WorkFlow/>,
        icon: <IoIcons.IoIosPaper />,
        cName: 'sub-nav'
      },
      {
        title: 'routes.admission',
        path:'/admission',
        access:menues.admission,
        Component:<Admission/>,
        button:{
          Component:<AdmissionForm/>,
          path:"/admissionForm",
          title:"routes.admissionForm",
          access:menues.admissionForm,
        },
        icon: <IoIcons.IoIosPaper />,
        cName: 'sub-nav'
      },
      {
        title: 'routes.service.QcEntry',
        path:'/service.QcEntry',
        access:menues.serviceQcEntry,
        Component:<QcEntry/>,
        button:{
          Component:<QcFormEntry/>,
          path:"/service.QcEntryForm",
          title:"routes.service.QcEntryForm",
          access:menues.serviceQcEntryForm,
        },
        icon: <IoIcons.IoIosPaper />,
        cName: 'sub-nav'
      },
      {
        title: 'routes.service.allocation',
        path:'/service.allocation',
        access:menues.serviceAllocation,
        Component:<Allocation/>,
        button:{
          Component:<AllocationForm/>,
          path:"/service.allocationForm",
          title:"routes.service.allocationForm",
          access:menues.serviceAllocationForm,
        },
        icon: <IoIcons.IoIosPaper />,
        cName: 'sub-nav'
      },
      {
        title: 'routes.service.technician',
        path:'/service.technician',
        access:menues.serviceTechnician,
        Component:<Technician/>,
        button:{
          Component:<TechnicianForm/>,
          path:"/service.technicianForm",
          title:"routes.service.technicianForm",
          access:menues.serviceTechnicianForm,
        },
        icon: <IoIcons.IoIosPaper />,
        cName: 'sub-nav'
      },
      {
        title: 'routes.service.qcExit',
        path:'/service.qcExit',
        access:menues.serviceQcExit,
        Component:<Technician/>,
        button:{
          Component:<TechnicianForm/>,
          path:"/service.qcExitForm",
          title:'routes.service.qcExitForm',
          access:menues.serviceQcExitForm,
        },
        icon: <IoIcons.IoIosPaper />,
        cName: 'sub-nav'
      },
      {
        title: 'routes.service.delivery',
        path:'/service.delivery',
        access:menues.serviceDelivery,
        Component:<Delivery/>,
        button:{
          Component:<DeliveryForm/>,
          path:"/service.serviceDeliveryForm",
          title:'routes.service.deliveryForm',
          access:menues.serviceDeliveryForm,
        },
        icon: <IoIcons.IoIosPaper />,
        cName: 'sub-nav'
      },
      {
        title: 'routes.acceptDelivery',
        path:'/acceptDelivery',
        access:menues.acceptDelivery,
        Component:<AcceptDelivery/>,
        button:{
          Component:<AcceptDeliveryForm/>,
          path:"/acceptDeliveryForm",
          title:"routes.acceptDeliveryForm",
          access:menues.acceptDeliveryForm,
        },
        icon: <IoIcons.IoIosPaper />,
        cName: 'sub-nav'
      },
      {
        title: 'routes.changing',
        path:'/changing',
        access:menues.changing,
        Component:<Change/>,
        button:{
          Component:<ChangeForm/>,
          path:"/changingForm",
          title:"routes.changingForm",
          access:menues.changingForm,
        },
        icon: <IoIcons.IoIosPaper />,
        cName: 'sub-nav'
      },
      {
        title: 'routes.sent',
        path:'/sent',
        access:menues.sent,
        Component:<Sent/>,
        button:{
          Component:<SentForm/>,
          path:"/sentForm",
          title:"routes.sentForm",
          access:menues.sentForm,
        },
        icon: <IoIcons.IoIosPaper />,
        cName: 'sub-nav'
      },
      {
        title: 'routes.archive',
        path:'/archive',
        access:menues.archive,
        Component:<Archive/>,
        icon: <IoIcons.IoIosPaper />,
        cName: 'sub-nav'
      },
]},
{
  title: 'routes.basicDefinations',
  icon: <IoIcons.IoIosPaper />,
  access:menues.definations,
  iconClosed: <RiIcons.RiArrowDownSFill />,
  iconOpened: <RiIcons.RiArrowUpSFill />,
  subNav: [
    {
      title: 'routes.entryCheckList',
      path:'/entryCheckList',
      access:menues.entryCheckList,
      Component:<CheckList formType={"Entry"}/>,
      button:{
        Component:<CheckListForm formType={"Entry"}/>,
        path:"/entryCheckListForm",
        title:"routes.entryCheckListForm",
        access:menues.entryCheckListForm,
      },
      icon: <IoIcons.IoIosPaper />,
      cName: 'sub-nav'
    },
    {
      title: 'routes.exitCheckList',
      path:'/exitCheckList',
      access:menues.exitCheckList,
      Component:<CheckList formType={"Exit"}/>,
      button:{
        Component:<CheckListForm formType={"Exit"}/>,
        path:"/exitCheckListForm",
        title:"routes.exitCheckListForm",
        access:menues.exitCheckListForm,
      },
      icon: <IoIcons.IoIosPaper />,
      cName: 'sub-nav'
    },
    {
      title: 'routes.phoneIssues',
      path:'/phoneIssues',
      access:menues.phoneIssues,
      Component:<PhoneDefects/>,
      button:{
        Component:<PhoneDefectsForm/>,
        path:"/phoneIssuesForm",
        title:"routes.phoneIssuesForm",
        access:menues.phoneIssuesForm,
      },
      icon: <IoIcons.IoIosPaper />,
      cName: 'sub-nav'
    },
    {
      title: 'routes.parts',
      path:'/parts',
      access:menues.parts,
      Component:<Parts/>,
      button:{
        Component:<PartsForm/>,
        path:"/partsForm",
        title:"routes.partsForm",
        access:menues.partForm,
      },
      icon: <IoIcons.IoIosPaper />,
      cName: 'sub-nav'
    },
    {
      title: 'routes.admissionCheckList',
      path:'/admissionCheckList',
      access:menues.admissionCheckList,
      Component:<AdmissionCheckList/>,
      button:{
        Component:<AdmissionCheckListForm/>,
        path:"/admissionCheckListForm",
        title:"routes.admissionCheckListForm",
        access:menues.admissionCheckListForm,
      },
      icon: <IoIcons.IoIosPaper />,
      cName: 'sub-nav'
    },
    {
      title: 'routes.phoneStatusAftertechCheck',
      path:'/phoneStatusAftertechCheck',
      access:menues.phoneStatusAftertechCheck,
      Component:<StatusAfterCheck/>,
      button:{
        Component:<StatusAfterCheckForm/>,
        path:"/phoneStatusAftertechCheckForm",
        title:"routes.phoneStatusAftertechCheckForm",
        access:menues.phoneStatusAftertechCheckForm,
      },
      icon: <IoIcons.IoIosPaper />,
      cName: 'sub-nav'
    },
    {
      title: 'routes.phoneStatusAftertechWork',
      path:'/phoneStatusAftertechWork',
      access:menues.phoneStatusAftertechWork,
      Component:<StatusAfterWork/>,
      button:{
        Component:<StatusAfterWorkForm/>,
        path:"/phoneStatusAftertechWorkForm",
        title:"routes.phoneStatusAftertechWorkForm",
        access:menues.phoneStatusAftertechWorkForm,
      },
      icon: <IoIcons.IoIosPaper />,
      cName: 'sub-nav'
    },
    {
      title: 'routes.phoneStatus',
      path:'/phoneStatus',
      access:menues.phoneStatus,
      Component:<PhoneStatus/>,
      button:{
        Component:<PhoneStatusForm/>,
        path:"/phoneStatusForm",
        title:"routes.phoneStatusForm",
        access:menues.phoneStatusForm,
      },
      icon: <IoIcons.IoIosPaper />,
      cName: 'sub-nav'
    },
    {
      title: 'routes.garanteeType',
      path:'/garanteeType',
      access:menues.garanteeType,
      Component:<WarrantyType/>,
      button:{
        Component:<WarrantyTypeForm/>,
        path:"/garanteeTypeForm",
        title:"routes.garanteeTypeForm",
        access:menues.garanteeTypeForm,
      },
      icon: <IoIcons.IoIosPaper />,
      cName: 'sub-nav'
    },
    {
      title: 'routes.receivedCustomerMsgType',
      path:'/receivedCustomerMsgType',
      access:menues.receivedCustomerMsgType,
      Component:<CustomerReceivedMsgType/>,
      button:{
        Component:<CustomerReceivedMsgTypeForm/>,
        path:"/receivedCustomerMsgTypeForm",
        title:"routes.receivedCustomerMsgTypeForm",
        access:menues.receivedCustomerMsgTypeForm,
      },
      icon: <IoIcons.IoIosPaper />,
      cName: 'sub-nav'
    },
    {
      title: 'routes.sendCustomerMsgType',
      path:'/sendCustomerMsgType',
      access:menues.sendCustomerMsgType,
      Component:<CustomerSendMsgType/>,
      button:{
        Component:<CustomerSendMsgTypeForm/>,
        path:"/sendCustomerMsgTypeForm",
        title:"routes.sendCustomerMsgTypeForm",
        access:menues.sendCustomerMsgTypeForm,
      },
      icon: <IoIcons.IoIosPaper />,
      cName: 'sub-nav'
    },
    {
      title: 'routes.systemMsgType',
      path:'/systemMsgType',
      access:menues.systemMsgType,
      Component:<SystemMsgType/>,
      button:{
        Component:<SystemMsgTypeForm/>,
        path:"/systemMsgTypeForm",
        title:"routes.systemMsgTypeForm",
        access:menues.systemMsgTypeForm,
      },
      icon: <IoIcons.IoIosPaper />,
      cName: 'sub-nav'
    },
    {
      title: 'routes.agentsAbility',
      path:'/agentsAbility',
      access:menues.agentsAbility,
      Component:<AgentsAbility/>,
      button:{
        Component:<AgentsAbilityForm/>,
        path:"/agentsAbilityForm",
        title:"routes.agentsAbilityForm",
        access:menues.agentsAbilityForm,
      },
      icon: <IoIcons.IoIosPaper />,
      cName: 'sub-nav'
    },
    {
      title: 'routes.techAbility',
      path:'/techAbility',
      access:menues.techAbility,
      Component:<TechAbility/>,
      button:{
        Component:<TechAbilityForm/>,
        path:"/techAbilityForm",
        title:"routes.techAbilityForm",
        access:menues.techAbilityForm,
      },
      icon: <IoIcons.IoIosPaper />,
      cName: 'sub-nav'
    },
    {
      title: 'routes.product',
      path:'/product',
      access:menues.product,
      Component:<Product/>,
      button:{
        Component:<ProductForm/>,
        path:"/productForm",
        title:"routes.productForm",
        access:menues.productForm,
      },
      icon: <IoIcons.IoIosPaper />,
      cName: 'sub-nav'
    },
    {
      title: 'routes.productGroup',
      path:'/productGroup',
      access:menues.productGroup,
      Component:<ProductGroup/>,
      button:{
        Component:<ProductGroupForm/>,
        path:"/productGroupForm",
        title:"routes.productGroupForm",
        access:menues.productGroupForm,
      },
      icon: <IoIcons.IoIosPaper />,
      cName: 'sub-nav'
    },
    {
      title: 'routes.accessories',
      path:'/accessories',
      access:menues.accessories,
      Component:<Accessories/>,
      button:{
        Component:<AccessoriesForm/>,
        path:"/accessoriesForm",
        title:"routes.accessoriesForm",
        access:menues.accessoriesForm,
      },
      icon: <IoIcons.IoIosPaper />,
      cName: 'sub-nav'
    },
    {
      title: 'routes.inventoryGroup',
      path:'/inventoryGroup',
      access:menues.inventoryGroup,
      Component:<InventoryGroup/>,
      button:{
        Component:<InventoryGroupForm/>,
        path:"/inventoryGroupForm",
        title:"routes.inventoryGroupForm",
        access:menues.inventoryGroupForm,
      },
      icon: <IoIcons.IoIosPaper />,
      cName: 'sub-nav'
    },
    {
      title: 'routes.warrantyCancelation',
      path:'/warrantyCancelation',
      access:menues.warrantyCancelation,
      Component:<WarrantyCancelation/>,
      button:{
        Component:<WarrantyCancelationForm/>,
        path:"/warrantyCancelationForm",
        title:"routes.warrantyCancelationForm",
        access:menues.warrantyCancelationForm,
      },
      icon: <IoIcons.IoIosPaper />,
      cName: 'sub-nav'
    },
    {
      title: 'routes.partRequest',
      path:'/partRequest',
      access:menues.partRequest,
      Component:<PartRequest/>,
      button:{
        Component:<PartRequestForm/>,
        path:"/partRequestForm",
        title:"routes.partRequestForm",
        access:menues.partRequestForm,
      },
      icon: <IoIcons.IoIosPaper />,
      cName: 'sub-nav'
    },
    {
      title: 'routes.worksDoneOnPhone',
      path:'/worksDoneOnPhone',
      access:menues.worksDoneOnPhone,
      Component:<WorksDoneOnPhone/>,
      button:{
        Component:<WorksDoneOnPhoneForm/>,
        path:"/worksDoneOnPhoneForm",
        title:"routes.worksDoneOnPhoneForm",
        access:menues.worksDoneOnPhoneForm,
      },
      icon: <IoIcons.IoIosPaper />,
      cName: 'sub-nav'
    },
    {
      title: 'routes.extraServices',
      path:'/extraServices',
      access:menues.extraServices,
      Component:<ExtraServices/>,
      button:{
        Component:<ExtraServicesForm/>,
        path:"/extraServicesForm",
        title:"routes.extraServicesForm",
        access:menues.extraServicesForm,
      },
      icon: <IoIcons.IoIosPaper />,
      cName: 'sub-nav'
    }

]},
{
  title: 'routes.rules',
  icon: <IoIcons.IoIosPaper />,
  access:menues.rules,
  iconClosed: <RiIcons.RiArrowDownSFill />,
  iconOpened: <RiIcons.RiArrowUpSFill />,
  subNav: [
    {
      title: 'routes.pricing',
      path:'/pricing',
      access:menues.pricing,
      Component:<Pricing/>,
      icon: <IoIcons.IoIosPaper />,
      cName: 'sub-nav'
    },
    {
      title: 'routes.ratingTechnician',
      path:'/ratingTechnician',
      access:menues.ratingTechnician,
      Component:<TechnicianRating/>,
      icon: <IoIcons.IoIosPaper />,
      cName: 'sub-nav'
    }
  ]},
  {
    title: 'routes.reports',
    access:menues.reports,
    icon: <IoIcons.IoIosPaper />,
    iconClosed: <RiIcons.RiArrowDownSFill />,
    iconOpened: <RiIcons.RiArrowUpSFill />,
    subNav: [
     
    ]},
    {
      title: 'routes.inventory',
      access:menues.inventory,
      icon: <IoIcons.IoIosPaper />,
      iconClosed: <RiIcons.RiArrowDownSFill />,
      iconOpened: <RiIcons.RiArrowUpSFill />,
      subNav: [
       
      ]}
];
