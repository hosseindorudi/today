import React, { lazy } from 'react';
import * as CgIcon from 'react-icons/cg';
import * as IoIcons from 'react-icons/io';
import * as RiIcons from 'react-icons/ri';
const Profile=lazy(()=>import('./Views/Forms/Profile'))
const Qc=lazy(()=>import('./Views/Forms/QcForm/Qc'))
const ReceptionForm=lazy(()=>import('./Views/Forms/producForm/ProductForm'))
const Support=lazy(()=>import('./Views/Forms/support'))
const OperatorGroupForm=lazy(()=>import('./Views/Forms/operatorGroupForm/OperatorGroupForm'))
const Operator=lazy(()=>import('./Views/Forms/operator/Operator'))
const VirtualIpForm=lazy(()=>import('./Views/Forms/virtualIpForm/VirtualIpForm'))
const TableParent=lazy(()=>import('./Views/TableParent/TableParent'))

export const Routes = [
  {
    title: 'routes.panel',
    icon: <IoIcons.IoIosPaper />,
    iconClosed: <RiIcons.RiArrowDownSFill />,
    iconOpened: <RiIcons.RiArrowUpSFill />,
    subNav: [
      // {
      //   title: 'routes.online',
      //   path:'/panelonline',
      //   Component:<Profile/>,
      //   button:<Profile/>,
      //   icon: <IoIcons.IoIosPaper />,
      //   cName: 'sub-nav'
      // },
      // {
      //   title: 'routes.group',
      //   path:'/panelgroup',
      //   Component:<Profile/>,
      //   button:<Profile/>,
      //   icon: <IoIcons.IoIosPaper />,
      //   cName: 'sub-nav'
      // },
      {
        title: 'routes.validIps',
        path:'/panelvalidIps',
        Component:TableParent,
        button:{
          Component:VirtualIpForm,
          path:"/panelValidIpsCR",
          title:"routes.validIps"
        },
        icon: <IoIcons.IoIosPaper />,
        cName: 'sub-nav'
      },
      {
        title: 'routes.attacks',
        path:'/panelattacks',
        Component:TableParent,
        icon: <IoIcons.IoIosPaper />,
        cName: 'sub-nav'
      },
      // {
      //   title: 'routes.actions',
      //   path:'/panelactions',
      //   Component:<Profile/>,
      //   icon: <IoIcons.IoIosPaper />,
      //   cName: 'sub-nav'
      // },
      // {
      //   title: 'routes.unsuccesslogin',
      //   path:'/panelunsuccesslogin',
      //   Component:<Profile/>,
      //   icon: <IoIcons.IoIosPaper />,
      //   cName: 'sub-nav'
      // },
      // {
      //   title: 'routes.sucesslogin',
      //   path:'/panelsucesslogin',
      //   Component:<Profile/>,
      //   icon: <IoIcons.IoIosPaper />,
      //   cName: 'sub-nav'
      // },
    ]
  },
  // {
  //   title: 'routes.GeneralRepresentative',
  //   icon: <IoIcons.IoIosPaper />,
  //   iconClosed: <RiIcons.RiArrowDownSFill />,
  //   iconOpened: <RiIcons.RiArrowUpSFill />,
  //   subNav: [
  //     {
  //       title: 'routes.online',
  //       path:'/panelonline',
  //       Component:<Profile/>,
  //       button:<Profile/>,
  //       icon: <IoIcons.IoIosPaper />,
  //       cName: 'sub-nav'
  //     },
  //     {
  //       title: 'routes.group',
  //       path:'/panelgroup',
  //       Component:<Profile/>,
  //       button:<Profile/>,
  //       icon: <IoIcons.IoIosPaper />,
  //       cName: 'sub-nav'
  //     },
  //     {
  //       title: 'routes.validIps',
  //       path:'/panelvalidIps',
  //       Component:<Profile/>,
  //       button:<Profile/>,
  //       icon: <IoIcons.IoIosPaper />,
  //       cName: 'sub-nav'
  //     },
  //     {
  //       title: 'routes.attacks',
  //       path:'/panelattacks',
  //       Component:<Profile/>,
  //       icon: <IoIcons.IoIosPaper />,
  //       cName: 'sub-nav'
  //     },
  //     {
  //       title: 'routes.actions',
  //       path:'/panelactions',
  //       Component:<Profile/>,
  //       icon: <IoIcons.IoIosPaper />,
  //       cName: 'sub-nav'
  //     },
  //     {
  //       title: 'routes.unsuccesslogin',
  //       path:'/panelunsuccesslogin',
  //       Component:<Profile/>,
  //       icon: <IoIcons.IoIosPaper />,
  //       cName: 'sub-nav'
  //     },
  //     {
  //       title: 'routes.sucesslogin',
  //       path:'/panelsucesslogin',
  //       Component:<Profile/>,
  //       icon: <IoIcons.IoIosPaper />,
  //       cName: 'sub-nav'
  //     },
  //   ]
  // },
  
  // {
  //   title: 'profile',
  //   path:'/profile',
  //   Component: <Profile/>,
  //   icon: <CgIcon.CgProfile />
  // },
  // {
  //   title: 'Forms',
  //   icon: <IoIcons.IoIosPaper />,
  //   iconClosed: <RiIcons.RiArrowDownSFill />,
  //   iconOpened: <RiIcons.RiArrowUpSFill />,
  //   subNav: [
  //     {
  //       title: 'QcEntryForm',
  //       path:'/qcEntry',
  //       Component:<Qc formType={"Enter"}/>,
  //       icon: <IoIcons.IoIosPaper />,
  //       cName: 'sub-nav'
  //     },
  //     {
  //       title: 'QcExitForm',
  //       path:'/qcExit',
  //       Component: <Qc formType={"Exit"}/>,
  //       icon: <IoIcons.IoIosPaper />,
  //       cName: 'sub-nav'
  //     },
  //     {
  //       title: 'ReceptionForm',
  //       path:'/reception',
  //       Component: <ReceptionForm/>,
  //       icon: <IoIcons.IoIosPaper />,
  //       cName: 'sub-nav'
  //     },
  //     {
  //       title: 'operatorGroupForm',
  //       path:'/operatorGroupForm',
  //       Component: <OperatorGroupForm/>,
  //       icon: <IoIcons.IoIosPaper />,
  //       cName: 'sub-nav'
  //     },
      
  //     {
  //       title: 'operator',
  //       path:'/operator',
  //       Component: <Operator/>,
  //       icon: <IoIcons.IoIosPaper />,
  //       cName: 'sub-nav'
  //     },
  //     {
  //       title: 'Ip-Validation',
  //       path:'/virtualIpForm',
  //       Component: <VirtualIpForm/>,
  //       icon: <IoIcons.IoIosPaper />,
  //       cName: 'sub-nav'
  //     },
  //   ]
  // },
  // {
  //   title: 'Support',
  //   path:'/support',
  //   Component:<Support/>,
  //   icon: <IoIcons.IoMdHelpCircle />
  // },
  // {
  //   title: 'TableParent',
  //   path:'/TableParent',
  //   Component:<TableParent/>,
  //   icon: <IoIcons.IoMdHelpCircle />
  // },
  // {
  //   title: 'test',
  //   path:'/test',
  //   Component:<Support/>,
  //   icon: <IoIcons.IoMdHelpCircle />
  // }
];
