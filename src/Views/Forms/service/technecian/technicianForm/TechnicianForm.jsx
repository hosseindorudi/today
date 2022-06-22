import './technician.css'
import logo from "../../../../../assets/imgs/logo.png";
import React, { useEffect, useContext, useState } from "react";
import { data, phone, qcExit } from "../../../../../data/dataQc";
import { Accordion, Button, Form } from "react-bootstrap";
import * as bs from "react-icons/bs";
import * as fa from "react-icons/fa";
import { TimePicker } from '@mui/x-date-pickers/TimePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import TextField from '@mui/material/TextField';
import AdapterJalali from '@date-io/date-fns-jalali';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { setDatePickerDate } from '../../../../../validation/functions';
import { TabContext } from "../../../../../contexts/TabContextProvider";
import Technician from '../technicianList/Technician';
import Multiselect from 'multiselect-react-dropdown';
import { useTranslation } from 'react-i18next';
import { warrantyTypeReadTitle } from '../../../../../services/warrantyType';
import { reasonForCancellationOfWarrantyReadTitle } from '../../../../../services/warrantyCancellationService';
import { admissionAccessoryReadTitle } from '../../../../../services/admissionAccessory';
import { toast } from 'react-toastify';
import useAxios from '../../../../../customHooks/useAxios';
import useRequest from '../../../../../customHooks/useRequest';
import BackDrop from '../../../../../Components/backDrop/BackDrop';
const TechnicianForm = () => {
    const [type, setType] = useState("")
  // const [value,setValue] = useState();
  const [ips, setIps] = useState([]);
  const [time, setTime] = useState(new Date());
  const [date, setDate] = useState(new Date());
  const [qcState, setqcState] = useState();
  const [phonestate, setphonestate] = useState();
//   const [loading, setloading] = useState(true);
  const [warrantyType, setWarrantytype] = useState();
  const [deviceStatus, setDeviceStatus] = useState();
  const [extraService, setExtraService] = useState([]);
  const [fallWarranty, setFallWarranty] = useState([]);
  const [firstImg, setFirstImg] = useState();
  const [groupTitles, setGroupTitles] = useState([])
  const [groupTitleId, setGroupTitleId] = useState()
  const [groupTitlesCANCLE, setGroupTitlesCANCEL] = useState([])
  const [groupTitleCANCELId, setGroupTitleCANCEELId] = useState()
  const [deffectTitles, setDeffectTitles] = useState([])
  const [deffectTitlesId, setDeffectTitlesId] = useState()
  const [techText, settechText] = useState('')

  const abortController = new AbortController();
  const [response, loading, fetchData, setResponse] = useAxios();
  const request = useRequest()
  const { t } = useTranslation();
  const handleAddIP = () => {
    let ip = {
      from: "0.0.0.0",
      to: "0.0.0.0",
    };
    setIps((prev) => [...prev, ip]);
  };

  const onImageChange = async (e) => {
    const file = e.target.files[0];
    // console.log(file)
    // setFirstImg(URL.createObjectURL(file));
    // setFirstImg(file);
    // console.log(URL.createObjectURL(file))

    
  };

  const handleError = (message) => {
    toast.error(message, {
      position: toast.POSITION.BOTTOM_CENTER,
    });
  };

  const handleSeccess=(message)=>{
    
    toast.success(message, {
      position: toast.POSITION.BOTTOM_CENTER,
    });
  }

  const changeValue = (event, index, type) => {
    
      let newArr = ips.map((item, i) => {
        if (index === i) {
          return { ...item, [type]: event.target.value };
        } else {
          return item;
        }
      });
      setIps(newArr);
    
  };

  const handleClickRemoveIP = (index) => {
    let filter = ips.filter((item, i) => i !== index);
    setIps(filter);
  };


  const tabContext = useContext(TabContext);
  const handleClickMenu = () => {
    
    tabContext.addRemoveTabs(
      {
        title: "routes.service.technicianForm",
        path: "/service.technicianForm",
        Component:TechnicianForm
      }
      , "remove");
    tabContext.addRemoveTabs(
      
      {
        title: "routes.service.technician",
        path: "/service.technician",
        Component:Technician
      }
      
      , "add");
  };



  useEffect(()=> { 

    // handleFunctions("READTITLEWARANTY")
  
    
      
    },[])

    const handleFunctions = (type) => {
        switch (type) {
            case "READTITLEWARANTY":
                setType("READTITLEWARANTY")
                fetchData({
                    method: "POST",
                    url: warrantyTypeReadTitle,
                    headers: {
                      accept: "*/*",
                    },
                    data: request,
                    signal:abortController.signal,
                  })
                  
                  
                  
                break;
            case "READTITLCANCEL":
                setType("READTITLCANCEL")
                fetchData({
                    method: "POST",
                    url: reasonForCancellationOfWarrantyReadTitle,
                    headers: {
                      accept: "*/*",
                    },
                    data: request,
                    signal:abortController.signal,
                    
                   
                  })
                  
                  
                break;
            case "DeffectTitles":
                setType("DeffectTitles")
                fetchData({
                    method: "POST",
                    url: admissionAccessoryReadTitle,
                    headers: {
                      accept: "*/*",
                    },
                    data: request,
                    signal:abortController.signal,
                    
                   
                  })
                  
                  
                break;
        
            default:
                break;
        }
    }

                    

  const handleResponse=(response,type)=>{
    switch (type) {
      case "READTITLEWARANTY":
            setGroupTitles(response.Title)
            setResponse(undefined)
            handleFunctions("READTITLCANCEL")
        break;
      case "READTITLCANCEL":
            setGroupTitlesCANCEL(response.Title)
            setResponse(undefined)
            handleFunctions("DeffectTitles")
        break;
      case "DeffectTitles":
            console.log(response.Title)
            

            response.Title.map((m,i) => (
                setDeffectTitles(prev => [...prev, {name:m.Value, id: m.Id}])
            ))
            response.Title.length&&setDeffectTitlesId(response.Title[0].Id)
            setResponse(undefined)
            
        break;
      case "SUBMIT" :
        handleSeccess(t("customer.created"));
        handleClickMenu();
      default:
        break;
    }
  }

  useEffect(() => {
      setqcState(qcExit);
      setphonestate(phone);
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

        useEffect(()=> {
            if (response){
            response.Result?handleResponse(response,type):handleError(response.Message)          
            }
        },[response])

    const handleSubmitTech =() => {
        let data ={
            techText,
            warrantyType,
            deviceStatus,
            extraService,
            fallWarranty,
            time,
            date: setDatePickerDate(date)

        }
        console.log(JSON.stringify(data))
        handleClickMenu()
    }
    
return (
  <main className='maintech'>
    {loading?<BackDrop open={true}/>: 
        <div className="techmainDiv">
            <div className="techFirstDiv">
                <div className="techRight">
                    <div>
                        {" "}
                        <span>{t("tech.phoneOwnerName")}</span>
                        <span>حسین درودی</span>{" "}
                    </div>
                    <div>
                        {" "}
                        <span>{t("tech.phoneFamilyname")}</span>
                        <span>حسین درودی</span>{" "}
                    </div>
                    <div>
                        {" "}
                        <span>{t("tech.province")}</span>
                        <span>تهران</span>{" "}
                    </div>
                    <div>
                        <span>{t("tech.city")}</span>
                        <span>تهران</span>{" "}
                    </div>
                </div>
                <div className="tehMiddle">
                    <div >
                        {" "}
                        <span>{t("tech.brand")}</span>
                        <span>حسین درودی</span>{" "}
                    </div>
                    <div>
                        {" "}
                        <span>{t("tech.model")}</span>
                        <span>حسین درودی</span>{" "}
                    </div>
                    <div>
                        {" "}
                        <span>{t("tech.type")}</span>
                        <span>تهران</span>{" "}
                    </div>
                    <div>
                        <span>{t("tech.serial")}</span>
                        <span>تهران</span>{" "}
                    </div>
                    <div>
                        <span>{t("tech.color")}</span>
                        <span>تهران</span>{" "}
                    </div>
                    <div>
                        <span>{t("tech.gig")}</span>
                        <span>تهران</span>{" "}
                    </div>
                </div>
                <div className="techLeft">
                    <div>
                        {" "}
                        <span>{t("tech.admissionDate")}</span>
                        <span>حسین درودی</span>{" "}
                    </div>
                    <div>
                        {" "}
                        <span>{t("tech.admissionTime")}</span>
                        <span>حسین درودی</span>{" "}
                    </div>
                    <div>
                        {" "}
                        <span>{t("tech.admissionOperator")}</span>
                        <span>تهران</span>{" "}
                    </div>
                    
                </div>
            </div>
            <hr className='techHR'/>
            <div className="techSecondDiv">
                <div className="techWarrantyStatus">
                    <div className="techWarranty">
                        <div className='techWarrantyType'>
                        <label htmlFor="techW">{t("tech.warrantyStatus")}</label>
                        <div id='techW' className="techWarDiv">
                            <select className="selectSendTypeTech" onChange={(e) => setWarrantytype(e.target.value)} value={warrantyType}>
                                <option disabled value={""} selected>{t("tech.warrantyStatus")}</option>
                                {groupTitles.map((gt, i) => (
                                    <option value={gt.Id} key={gt.Id}>{gt.Title}</option>
                                ))}
                            </select>
                            <textarea  className='techWarrantyText1' placeholder={t("Description")} rows={"3"}/>
                        </div>
                        </div>
                        <div className='cancelReasonDiv'>
                        <label htmlFor="techWT">{t("tech.warrantyCancellationReason")}</label>
                        <div id='techWT' className='techWT'>
                        <select className="selectSendTypeTech" onChange={(e) => setDeviceStatus(e.target.value)} value={deviceStatus}>
                                <option disabled value={""} selected hidden>{t("tech.warrantyCancellationReason")}</option>
                                {groupTitlesCANCLE.map((gt, i) => (
                                    <option value={gt.Id} key={gt.Id}>{gt.Title}</option>
                                ))}
                            </select>
                            <textarea  className='techWarrantyText1' placeholder={t("Description")} rows={"3"}/>
                            </div>
                        </div>
                        
                    </div>
                    <div className="techStatus">
                        <div className='firstTechStatus'> 
                        <label htmlFor="techSs">{t("tech.firstState")}</label>
                        <div  id='techSs' className='techSs'>
                            <select className="selectSendTypeTech" >
                                <option disabled value="0" >نظر اولیه</option>
                                <option value="گارانتی">گارانتی</option>
                                <option value="بدون گارانتی">بدون گارانتی</option>
                                <option value="استعلام تکنسین">استعلام تکنسین</option>
                            </select>
                            <textarea  className='techWarrantyText' placeholder='توضیحات'/>
                        </div>
                        </div>
                        <div className='statusInProgressDiv'>
                        <label htmlFor="techSProg">{t("tech.progressState")}</label>
                            <div  id='techSProg' className='techSProg'>
                            <select className="selectSendTypeTech" >
                                <option disabled value="0" >وضعیت نظر اولیه</option>
                                <option value="گارانتی">گارانتی</option>
                                <option value="بدون گارانتی">بدون گارانتی</option>
                                <option value="استعلام تکنسین">استعلام تکنسین</option>
                            </select>
                            <textarea  className='techWarrantyText' placeholder='توضیحات'/>
                        </div>
                        </div>
                        <div className='finalTechStatus'>
                        <label htmlFor="techSEnd">{t("tech.finalState")}</label>
                            <div  id='techSEnd' className='techSEnd'>
                            <select className="selectSendTypeTech" >
                                <option disabled value="0" >وضعیت نهایی</option>
                                <option value="گارانتی">گارانتی</option>
                                <option value="بدون گارانتی">بدون گارانتی</option>
                                <option value="استعلام تکنسین">استعلام تکنسین</option>
                            </select>
                            <textarea  className='techWarrantyText' placeholder='توضیحات'/>
                        </div>
                        </div>
                    </div>
                </div>
                <div className="techDescDiv">
                    <label htmlFor="techdescription" className="techDescLabel">توضیحات فنی</label>
                    <textarea className='technicalDescription' name="" id="techdescription"  rows="4"></textarea>
                </div>
                <div className="techFooterDiv">
                    <div className="techDownRight">
                        <label htmlFor="" className='labelMargin'>خدمات اضافی</label>
                        <div className="techDownRightDiv">
                            <div className="mSelectDiv" >
                                
                            </div>
                        </div>
                    </div>
                    <div className="techDownMiddle">
                        <label htmlFor="" className='labelMargin'>پیوست ها</label>
                        <div className="techDownRightDiv">
                            <div className="accordingDiv">
                                <Accordion>
                                    <Accordion.Item eventKey="0">
                                        <Accordion.Header></Accordion.Header>
                                            <Accordion.Body className="accordionBody">
                                                <div className="addBtn">
                                                    <bs.BsFillPlusCircleFill
                                                    size={25}
                                                    style={{ cursor: "pointer" }}
                                                    onClick={handleAddIP}
                                                    />
                                                    <b>عکس</b>
                                                </div>
                                                {ips.map((i, index) => (
                                                    <div className="ipTextFields" key={index}>
                                                    <fa.FaMinus
                                                        size={25}
                                                        style={{ cursor: "pointer" }}
                                                        onClick={() => handleClickRemoveIP(index)}
                                                    />
                                                    
                                                    <div className='failedBTNParent'>
                                                        <label htmlFor="firstBtnfile"><i className="fa fa-camera failedBTN" aria-hidden="true"></i></label>
                                                        <input type="file" id='firstBtnfile' accept="image/png, image/gif, image/jpeg" onChange={onImageChange} />
                                                         <span>{firstImg ? firstImg.name : '' }</span>
                                                    </div>
                                                    
                                                    </div>
                                                ))}
                                        </Accordion.Body>
                                    </Accordion.Item>
                                </Accordion>
                            </div>
                        </div>
                    </div>
                    

                    <div className="techDownLeft">
                        <label htmlFor="" className='labelMargin'>اجرت کل</label>
                        <div className="techDownRightDiv">
                            <div className='tipDiv'>
                                <input type="number" className='tip' />
                                <span>تومان</span>
                            </div>
                        </div>
                    </div>
                </div>

            </div>
        </div>
    }
    
  </main>
)
}



export default TechnicianForm