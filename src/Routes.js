import React, { lazy } from 'react';
import * as CgIcon from 'react-icons/cg';
import * as IoIcons from 'react-icons/io';
import * as RiIcons from 'react-icons/ri';
const Profile=lazy(()=>import('./Views/Forms/Profile'))
const Qc=lazy(()=>import('./Views/Forms/QcForm/Qc'))
const ReceptionForm=lazy(()=>import('./Views/Forms/producForm/ProductForm'))
const Support=lazy(()=>import('./Views/Forms/support'))
const OperatorGroupForm=lazy(()=>import('./Views/Forms/operatorGroupForm/OperatorGroupForm'))


export const Routes = [
  {
    title: 'profile',
    path:'/profile',
    Component: <Profile/>,
    icon: <CgIcon.CgProfile />
  },
  {
    title: 'Forms',
    icon: <IoIcons.IoIosPaper />,
    iconClosed: <RiIcons.RiArrowDownSFill />,
    iconOpened: <RiIcons.RiArrowUpSFill />,
    subNav: [
      {
        title: 'QcEntryForm',
        path:'/qcEntry',
        Component:<Qc formType={"Enter"}/>,
        icon: <IoIcons.IoIosPaper />,
        cName: 'sub-nav'
      },
      {
        title: 'QcExitForm',
        path:'/qcExit',
        Component: <Qc formType={"Exit"}/>,
        icon: <IoIcons.IoIosPaper />,
        cName: 'sub-nav'
      },
      {
        title: 'ReceptionForm',
        path:'/reception',
        Component: <ReceptionForm/>,
        icon: <IoIcons.IoIosPaper />,
        cName: 'sub-nav'
      },
      {
        title: 'operatorGroupForm',
        path:'/operatorGroupForm',
        Component: <OperatorGroupForm/>,
        icon: <IoIcons.IoIosPaper />,
        cName: 'sub-nav'
      },
    ]
  },
  {
    title: 'Support',
    path:'/support',
    Component:<Support/>,
    icon: <IoIcons.IoMdHelpCircle />
  },
  {
    title: 'test',
    path:'/test',
    Component:<Support/>,
    icon: <IoIcons.IoMdHelpCircle />
  }
];
