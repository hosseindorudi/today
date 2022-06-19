import React, { lazy, useContext } from "react";
import CircularMenu from "../../../../Components/CircularMenu/CircularMenu";
import "./workFlow.css";
import { t } from "i18next";
import { Button } from "react-bootstrap";
import * as bs from 'react-icons/bs'
import Tooltip from '@mui/material/Tooltip';
import { TabContext } from "../../../../contexts/TabContextProvider";
import { enums } from "../../../../data/Enums";
import useButtonAccess from "../../../../customHooks/useButtonAccess";
const Delivery=lazy(()=>import("../delivery/Delivery"))
const DeliveryForm=lazy(()=>import("../delivery/DeliveryForm"))
const QcExitForm=lazy(()=>import("../QcExit/qcExitList/QcExitList"))
const QcExit=lazy(()=>import("../QcExit/qcExitForm/Qc"))
const Registered=lazy(()=>import("../registered/Registered"))
const TechnicianForm=lazy(()=>import("../technecian/technicianForm/TechnicianForm"))
const Technician=lazy(()=>import("../technecian/technicianList/Technician"))
const Allocation=lazy(()=>import("../alocation/Allocation"))
const AllocationForm=lazy(()=>import("../alocation/AllocationForm"))
const Admission=lazy(()=>import("../admission/Admission"))
const AdmissionForm=lazy(()=>import("../admission/AdmissionForm"))
const Change=lazy(()=>import("../change/changeList/Change"))
const ChangeForm=lazy(()=>import("../change/changeForm/ChangeForm"))
const Archive=lazy(()=>import("../../../../Views/Forms/service/archive/Archive"))
const Sent=lazy(()=>import("../sent/sentFormList/SentFormList"))
const SentForm=lazy(()=>import("../sent/sentForm/SentForm"))
const QcEntry=lazy(()=>import("../QCEntry/qcEntryForm/Qc"))
const SentCustomer=lazy(()=>import("../sentCustomer/SentCustomer"))
const SentCustomerForm=lazy(()=>import("../sentCustomer/SentCustomerForm"))
const QcFormEntry=lazy(()=>import("../QCEntry/qcEntryList/QcForm"))
const AdmitionFinalForm=lazy(()=>import("../admission/AmitionFinalForm"))
const WorkFlow = () => {
   const tabContext = useContext(TabContext);
   const [havAccess]=useButtonAccess()
  const pages = [
  
    {
      title: 'routes.registered',
      path:'/registered',
      Component:Registered,
      access:enums.AfterSales_New_Registered_Read_r
      
    },
    {
      title: 'routes.admission',
      path:'/admission',
      color: "silver",
      Component:Admission,
      access:enums.AfterSales_New_Admission_Read_r,
      button:{
        Component:AdmitionFinalForm,
        path:"/admissionForm",
        title:"routes.admissionForm",
        access:enums.AfterSales_New_Admission_Create_w
      }
    },
    {
      title: 'routes.service.QcEntry',
      path:'/service.QcEntry',
      no:1,
      Component:QcFormEntry,
      color: "purple",
      access:enums.AfterSales_New_InputQualityControl_Read_r,
      button:{
        Component:QcEntry,
        path:"/service.QcEntryForm",
        title:"routes.service.QcEntryForm",
        access:enums.AfterSales_New_InputQualityControl_Create_w
      
      },
     
    },
    {
      title: 'routes.service.allocation',
      path:'/service.allocation',
      Component:Allocation,
      color: "indianred",
      access:enums.AfterSales_New_AssignToTechnician_Read_r,
      no:0,

    },
    {
      title: 'routes.service.technician',
      path:'/service.technician',
      Component:Technician,
      color: "green",
      no:5,
      access:enums.AfterSales_New_Repair_Read_r,
      button:{
        Component:TechnicianForm,
        path:"/service.technicianForm",
        title:"routes.service.technicianForm",
        access:enums.AfterSales_New_Repair_Create_w,
      }
    },
    {
      title: 'routes.service.qcExit',
      path:'/service.qcExit',
      no:6,
      color: "yellowgreen",
      Component:QcExitForm,
      access:enums.AfterSales_New_OutputQualityControl_Read_r,
      button:{
        Component:QcExit,
        path:"/service.qcExitForm",
        title:'routes.service.qcExitForm',
        access:enums.AfterSales_New_OutputQualityControl_Create_w
      
      }
    },
    {
      title: 'routes.service.delivery',
      path:'/service.delivery',
      no:0,
      color: "cadetblue",
      Component:Delivery,
      access:enums.AfterSales_New_DeliveryInPerson_Read_r
    },
  ];
  const buttons = [
    {
      title: 'routes.changing',
      path:'/changing',
      Component:Change,
      access:enums.AfterSales_New_Replacement_Read_r,
      button:{
        Component:ChangeForm,
        path:"/changingForm",
        title:"routes.changingForm",
        access:enums.AfterSales_New_Replacement_Create_w
      }
    },
    {
      title: 'routes.sentAgent',
      path:'/sent',
      Component:Sent,
      access:enums.AfterSales_New_SendToAgent_Read_r,
      button:{
        Component:SentForm,
        path:"/sentForm",
        title:"routes.sentAgentForm",
        access:enums.AfterSales_New_SendToAgent_Create_w,
      },
     
    },
    {
      title: 'routes.sentCustomer',
      path:'/sentCustomer',
      Component:SentCustomer,
      access:enums.AfterSales_New_SendToCustomer_Read_r,
      button:{
        Component:SentCustomerForm,
        path:"/sentcustomerform",
        title:"routes.sentcustomerform",
        access:enums.AfterSales_New_SendToCustomer_Create_w,
      },
     
    },
    {
      title: 'routes.archive',
      path:'/archive',
      Component:Archive,
      access:enums.AfterSales_Archive_Read_r
    },
  ];
  const handleClick = (i) => {
   const item={
       title: i.title,
       path: i.path,
       Component:i.Component
   }
 tabContext.addRemoveTabs(item, "add");
};
  return (
    <div className="parentWorkFlow">
      <div className="topWorkFlow">
        <CircularMenu pages={pages} />
      </div>
      <div className="bottomWorkFlow">
        {buttons.map((i, index) => (
          <Tooltip
            PopperProps={{
              disablePortal: true,
            }}
            open={i.button &&havAccess(i.button.access) ? true : false}
            disableFocusListener
            disableHoverListener
            disableTouchListener
            title={
              <button
                className="btnFormCircularMenu"
                onClick={() => handleClick(i.button)}
              >
                <bs.BsPlusLg />
              </button>
            }
            arrow
            placement={"top-end"}
          >
            <Button className="btnBottomWorkFlow"  disabled={!havAccess(i.access)} onClick={() => handleClick(i)}>{t(i.title)}</Button>
          </Tooltip>
        ))}
      </div>
    </div>
  );
};

export default WorkFlow;
