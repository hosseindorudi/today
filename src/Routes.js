import React, { lazy } from 'react';
import * as CgIcon from 'react-icons/cg';
import * as IoIcons from 'react-icons/io';
import * as RiIcons from 'react-icons/ri';
import { menues } from './data/Enums';
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
const Admission=lazy(()=>import('./Views/Forms/admission/Admission'))
const AdmissionForm=lazy(()=>import('./Views/Forms/admission/AdmissionForm'))
const CheckList=lazy(()=>import('./Views/Forms/checkLists/Qc'))
const CheckListForm=lazy(()=>import('./Views/Forms/checkLists/QcForm'))
const PhoneDefects=lazy(()=>import('./Views/Forms/phoneDefects/PhoneDefects'))
const PhoneDefectsForm=lazy(()=>import('./Views/Forms/phoneDefects/PhoneDefectsForm'))
const Pricing=lazy(()=>import('./Views/Forms/pricing/Pricing'))
const TechnicianRating=lazy(()=>import('./Views/Forms/technicianRating/TechnicianRating'))




const TableParent=lazy(()=>import('./Views/TableParent/TableParent'))

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
