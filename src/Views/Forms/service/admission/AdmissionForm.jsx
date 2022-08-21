
import { useEffect, useRef, useState, useContext } from 'react';
import TextField from '@mui/material/TextField';
import AdapterJalali from '@date-io/date-fns-jalali';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
// import QRCode from "react-qr-code";
import logo from "../../../../../src/assets/imgs/logo22.png";
import PatternLock from './patternLock/PatternLock';
import SignaturePad from "./signaturePad/src/index";
import AppContext from '../../../../contexts/AppContext';
import { TabContext } from '../../../../contexts/TabContextProvider';
import Admission from './Admission';
import { IMEIvalidation, admissionNumberVal,phoneNumberValidation } from '../../../../validation/validation';



var base64 = require('base-64');



const AdmissionForm = () => {
  
  const [multiValue, setMultiValue] = useState([])
  const [patternLock, setpatternLock] = useState(false);
  const [patternLockSize, setPatternLockSize] = useState("0");
  const [warrantyDateBeg, setWarrantyDateBeg] = useState(new Date());
  const [warrantyDateEnd, setWarrantyDateEnd] = useState(new Date());
  const [firstImg, setFirstImg] = useState();
  const [secondImg, setSecondImg] = useState();
  const [todayDate, setTodayDate] = useState('');
  const [todayTime, setTodayTime] = useState('');
  const tabContext = useContext(TabContext);
  const currentLang = useContext(AppContext);
  const [imeiVal, setImeiVal] = useState(true)
  const [imeiValSec, setImeiValSec] = useState(false)
 
  const sigPad = useRef({});
  const sigPadCustomer = useRef({});

  const [arrayInputsVal, setArrayInputVal] = useState({
    recievedId: true,
    fullName: true,
    phoneNumber:true,
    state: true,
    city: true,
    address: true,
    customerFailed: true,
    phonemark: true,
    phoneType: true,
    phoneModel: true,
    phoneRam: true,
    phoneColor: true,
    phoneCompony: true,
    operatorDesc: true,
    operatorSignatur: true,
    techDesc: true,
    customerSignatur: true,
    
  })
  const [arrayInputsStart, setArrayInputStart] = useState({
    recievedId: true,
    fullName: true,
    phoneNumber:true,
    state: true,
    city: true,
    address: true,
    customerFailed: true,
    phonemark: true,
    phoneType: true,
    phoneModel: true,
    phoneRam: true,
    phoneColor: true,
    phoneCompony: true,
    operatorDesc: true,
    operatorSignatur: true,
    techDesc: true,
    customerSignatur: true,
    
  })

  const [formInputs, setForminputs] = useState({
    admitDate:todayDate,
    admitTime:todayTime,
    recievtionID:"",
    nameLastNameINFO:"",
    phoneNumber:"",
    state:"",
    city:"",
    address:"",
    deviceFailedDescription:"",
    devicefile:"",
    phonePass:"",
    GmailApple:"",
    patternLockType:patternLockSize,
    patternLock:[],
    postType:"",
    warrantyDateFrom:"",
    warrantyDateTo:"",
    warrantyType:"",
    jobType:"",
    deviceSerial:"",
    deviceMark:"",
    deviceType:"",
    deviceModel:"",
    deviceRam:"",
    deviceColor:"",
    deviceCompany:"",
    deviceAccessories:[],
    techDescription:"",
    techFile:'',
    warrantyDescription:"",
    technicalDescription:"",
    techSigPic:"",
    customerSigPic:"",

  })

  useEffect(()=> {
    console.log(formInputs)
  },[formInputs])


  const handleClickMenu = () => {
   
    tabContext.addRemoveTabs(
      {
        title: "routes.admissionForm",
        path: "/admissionForm",
        Component:AdmissionForm
      }
      , "remove");
    tabContext.addRemoveTabs(
      
      {
        title: "routes.admission",
        path: "/admission",
        Component:Admission
      }
      
      , "add");
  };

  // const signaturePadClicked = () => {
  //   console.log(sigPad.current.toDataURL());
  //   var encodedData = base64.encode(sigPad.current.toDataURL());
  //   console.log(encodedData);
  //   // var decodedData = base64.decode(encodedData);
  //   // console.log(decodedData);
  //   // console.log(sigPad.current.fromDataURL(sigPad.current.toDataURL()));
  // }


  // const onImageChange = async (e) => {
  //   const file = e.target.files[0];
  //   // console.log(file)
  //   // setFirstImg(URL.createObjectURL(file));
  //   // setFirstImg(file);
  //   // console.log(URL.createObjectURL(file))
  //   const base64 = await base64Convertor(file)
  //   setForminputs({...formInputs, ['devicefile']: base64})
    
  // };

  // const techDescImageChange = async (e) => {
  //   const file = e.target.files[0];
  //   const base64 = await base64Convertor(file)
  //   setForminputs({...formInputs, ['techFile']: base64})
  // }

  const onSubmitAdmitForm =  () => {
    
    
    setForminputs({...formInputs, ['techSigPic']: String(sigPad.current.toDataURL()), ['customerSigPic']: String(sigPadCustomer.current.toDataURL())})

    // setForminputs({...formInputs, ['customerSigPic']: String(sigPadCustomer.current.toDataURL())})
   

    console.log(JSON.stringify(formInputs))

    handleClickMenu()

  }

  // const base64Convertor = (file) => {
  //   return new Promise ( (resolve, reject) => {
  //     const fileReader = new FileReader();
  //     fileReader.readAsDataURL(file);
  //     fileReader.onload = () => {
  //       resolve(fileReader.result)
  //     }

  //     fileReader.onerror = (err) => {
  //         reject(err)
  //     }
  //   })
  // } 

  
  const handleIMEIChange = (e) => {
    
    (e.target.value && IMEIvalidation(e.target.value)) ?    setImeiValSec(true) : setImeiVal(false); 
    !e.target.value ?    setImeiValSec(false) : setImeiVal(false); 
    IMEIvalidation(e.target.value) ?    setForminputs({...formInputs, ['deviceSerial']: e.target.value})  : setForminputs({...formInputs, ['deviceSerial']: ""}); 

  }

  
  useEffect(()=>{
    let today = new Date().toLocaleDateString(currentLang.app.lang === 'fa' ?'fa-IR' :'en-US');
    setTodayDate(today)
    let todayTime = new Date().toLocaleTimeString(currentLang.app.lang === 'fa' ?'fa-IR' : 'en-US');
    setTodayTime(todayTime);
    
  },[currentLang.app.lang])

  const admissionNumberBlur = (e) => {
    formInputs['recievtionID'].match(admissionNumberVal) ? setArrayInputVal({...arrayInputsVal, ['recievedId'] : true}) : setArrayInputVal({...arrayInputsVal, ['recievedId'] : false})
    setArrayInputStart({...arrayInputsStart, ['recievedId'] : false}) 
  }
  const fullNameBlur = (e) => {
    formInputs['nameLastNameINFO'] !== "" ? setArrayInputVal({...arrayInputsVal, ['fullName'] : true}) : setArrayInputVal({...arrayInputsVal, ['fullName'] : false})
    setArrayInputStart({...arrayInputsStart, ['fullName'] : false}) 
  }
  const phoneBlur = (e) => {
    formInputs['phoneNumber'].match(phoneNumberValidation) ? setArrayInputVal({...arrayInputsVal, ['phoneNumber'] : true}) : setArrayInputVal({...arrayInputsVal, ['phoneNumber'] : false})
    setArrayInputStart({...arrayInputsStart, ['phoneNumber'] : false}) 
  }
  const stateBlur = (e) => {
    formInputs['state'] !== "" ? setArrayInputVal({...arrayInputsVal, ['state'] : true}) : setArrayInputVal({...arrayInputsVal, ['state'] : false})
    setArrayInputStart({...arrayInputsStart, ['state'] : false}) 
  }
  const cityBlur = (e) => {
    formInputs['city'] !== "" ? setArrayInputVal({...arrayInputsVal, ['city'] : true}) : setArrayInputVal({...arrayInputsVal, ['city'] : false})
    setArrayInputStart({...arrayInputsStart, ['city'] : false}) 
  }
  const addresBlur = (e) => {
    formInputs['address'] !== "" ? setArrayInputVal({...arrayInputsVal, ['address'] : true}) : setArrayInputVal({...arrayInputsVal, ['address'] : false})
    setArrayInputStart({...arrayInputsStart, ['address'] : false}) 
  }
  const deviceFailedblur = (e) => {
    formInputs['deviceFailedDescription'] !== "" ? setArrayInputVal({...arrayInputsVal, ['customerFailed'] : true}) : setArrayInputVal({...arrayInputsVal, ['customerFailed'] : false})
    setArrayInputStart({...arrayInputsStart, ['customerFailed'] : false}) 
  }
  const markDeviceBlur = (e) => {
    formInputs['deviceMark'] !== "" ? setArrayInputVal({...arrayInputsVal, ['phonemark'] : true}) : setArrayInputVal({...arrayInputsVal, ['phonemark'] : false})
    setArrayInputStart({...arrayInputsStart, ['phonemark'] : false}) 
  }
  const deviceTypeBlur = (e) => {
    formInputs['deviceType'] !== "" ? setArrayInputVal({...arrayInputsVal, ['phoneType'] : true}) : setArrayInputVal({...arrayInputsVal, ['phoneType'] : false})
    setArrayInputStart({...arrayInputsStart, ['phoneType'] : false}) 
  }
  const deviceModelblur = (e) => {
    formInputs['deviceModel'] !== "" ? setArrayInputVal({...arrayInputsVal, ['phoneModel'] : true}) : setArrayInputVal({...arrayInputsVal, ['phoneModel'] : false})
    setArrayInputStart({...arrayInputsStart, ['phoneModel'] : false}) 
  }
  const deviceRamBlur = (e) => {
    formInputs['deviceRam'] !== "" ? setArrayInputVal({...arrayInputsVal, ['phoneRam'] : true}) : setArrayInputVal({...arrayInputsVal, ['phoneRam'] : false})
    setArrayInputStart({...arrayInputsStart, ['phoneRam'] : false}) 
  }
  const deviceColorBlur = (e) => {
    formInputs['deviceColor'] !== "" ? setArrayInputVal({...arrayInputsVal, ['phoneColor'] : true}) : setArrayInputVal({...arrayInputsVal, ['phoneColor'] : false})
    setArrayInputStart({...arrayInputsStart, ['phoneColor'] : false}) 
  }
  const deviceCompanyBlur = (e) => {
    formInputs['deviceCompany'] !== "" ? setArrayInputVal({...arrayInputsVal, ['phoneCompony'] : true}) : setArrayInputVal({...arrayInputsVal, ['phoneCompony'] : false})
    setArrayInputStart({...arrayInputsStart, ['phoneCompony'] : false}) 
  }
  const agentDescBlur = (e) => {
    formInputs['techDescription'] !== "" ? setArrayInputVal({...arrayInputsVal, ['operatorDesc'] : true}) : setArrayInputVal({...arrayInputsVal, ['operatorDesc'] : false})
    setArrayInputStart({...arrayInputsStart, ['operatorDesc'] : false}) 
  }

  return (
    <div className="mainProductForm ">
      <div className="rightForm">
          <div className="DateAdnTime1">
            
             <div className="timeanddate">
              <h4>{todayTime}</h4>
              <h3>{todayDate}</h3>
             </div>
             {/* <img src={formInputs['techSigPic']} alt="" />
             <img src={formInputs['customerSigPic']} alt="" /> */}
          </div>
          
            <input type="number" id='recievtionID' className={arrayInputsStart['recievedId'] ? "recivedIdClass" : (arrayInputsVal['recievedId'] ? 'recivedIdClassASeccess' : 'recivedIdClassFailed')} placeholder='شماره قبض پذیرش' onBlur={admissionNumberBlur} onChange={(e) => setForminputs({...formInputs, ['recievtionID']: e.target.value})}/>
          
          
            <input type="text" id='nameLastNameINFO' onBlur={fullNameBlur} className={arrayInputsStart['fullName'] ? "personInformation" : (arrayInputsVal['fullName'] ? 'personInformationSeccess' : 'personInformationFailed')}
              placeholder='نام و نام خانوادگی' onChange={(e) => setForminputs({...formInputs, ['nameLastNameINFO']: e.target.value})}/>

            <input type="text" id='phoneNumber'  className={arrayInputsStart['phoneNumber'] ? "personInformation" : (arrayInputsVal['phoneNumber'] ? 'personInformationSeccess' : 'personInformationFailed')} onBlur={phoneBlur}  placeholder='شماره تماس' onChange={(e) => setForminputs({...formInputs, ['phoneNumber']: e.target.value})}/>
            <input type="text" id='state'  className={arrayInputsStart['state'] ? "personInformation" : (arrayInputsVal['state'] ? 'personInformationSeccess' : 'personInformationFailed')} onBlur={stateBlur}  placeholder='استان' onChange={(e) => setForminputs({...formInputs, ['state']: e.target.value})}/>
            <input type="text" id='city' onBlur={cityBlur}  className={arrayInputsStart['city'] ? "personInformation" : (arrayInputsVal['city'] ? 'personInformationSeccess' : 'personInformationFailed')}  placeholder='شهرستان' onChange={(e) => setForminputs({...formInputs, ['city']: e.target.value})}/>
            <textarea type="text" id='address' onBlur={addresBlur}  
            className={arrayInputsStart['address'] ? "personInformationText" : (arrayInputsVal['address'] ? 'personInformationTextSeccess' : 'personInformationTextFailed')} 
            placeholder='آدرس' onChange={(e) => setForminputs({...formInputs, ['address']: e.target.value})}/>
          
          <div className="deviceFaildAndPicture">
            <textarea type="text"   className={arrayInputsStart['customerFailed'] ? "deviceFailedDescription" : (arrayInputsVal['customerFailed'] ? 'deviceFailedDescriptionSeccess' : 'deviceFailedDescriptionFailed')} 
             onBlur={deviceFailedblur} placeholder='عیب به اظهار مشتری:' onChange={(e) => setForminputs({...formInputs, ['deviceFailedDescription']: e.target.value})}/>
            {/* <div className='failedBTNParent'>
            <label htmlFor="firstBtnfile"><i className="fa fa-camera failedBTN" aria-hidden="true"></i></label>
            <input type="file" id='firstBtnfile' accept="image/png, image/gif, image/jpeg" onChange={onImageChange} /> */}
              {/* <button className="failedBTN"><i className="fa fa-camera" aria-hidden="true"></i></button> */}
              {/* <span>اضافه کردن عکس در صورت لزوم</span> <span>{firstImg ? firstImg.name : '' }</span>
            </div> */}
          </div>
          
            
          <input type="text" id='phonePass' className='personInformation' placeholder='رمز: درصورت داشتن' onChange={(e) => setForminputs({...formInputs, ['phonePass']: e.target.value})}/>
        
        
          <input type="text" id='GmailApple' className='personInformation' placeholder='GMAIL/APPLE ID/MI ACCOUNT' onChange={(e) => setForminputs({...formInputs, ['GmailApple']: e.target.value})}/>
        
          
          <div className="pattern">
            <span className="patternspan">در صورت داشتن الگو</span>
            <div className='patternDiv'>
              <button className="btnPattern" onClick={() => setpatternLock(!patternLock)}>رسم الگو</button>
              <div className="sectionDiv">
              <select className='selectionLock' onChange={(e) => setPatternLockSize(e.target.value)} onClick={()=>setpatternLock(false)}>
                <option value="0">3*3</option>
                <option value="1">4*3</option>
                <option value="2">4*4</option>
                <option value="3">5*4</option>
                <option value="4">5*5</option>
              </select>
              </div>
              
            </div>
            
          </div>
          <div className='patternLock' style={{display: patternLock ? 'block' : 'none'}}><PatternLock formInputs={formInputs} setForminputs={setForminputs}  size={patternLockSize} setpatternLock = {setpatternLock} /></div>
          
          
          <select className="selectSendType" style={{display: !patternLock ? 'block' : 'none'}} onChange={(e) => setForminputs({...formInputs, ['postType']: e.target.value})}>
            <option value="0" disabled >نوع تحویل دستگاه به مشتری</option>
            <option value="پست">پست</option>
            <option value="تی پاکس">تی پاکس</option>
            <option value="DTS">DTS</option>
            <option value="پیک">پیک</option>
            <option value="چاپار">چاپار</option>
            <option value="حضوری">حضوری</option>
          </select>

          <div className="DateAdnTime" style={{display: !patternLock ? 'flex' : 'none'}}>
            <label htmlFor="DateTime" className='DateTimeLabel'>تاریخ شروع گارانتی:</label>
           

            <LocalizationProvider dateAdapter={AdapterJalali}>
                <DatePicker
                  mask="____/__/__"
                  value={warrantyDateBeg}
                  label="."
                  onChange={(newValue) => {setWarrantyDateBeg(newValue); setForminputs({...formInputs, ['warrantyDateFrom']: newValue})}}
                  renderInput={(params) => <TextField {...params} inputProps={{
                    ...params.inputProps,
                  }}/>}
                />
             </LocalizationProvider>

            
          </div>
          
          <div className="DateAdnTime" style={{display: !patternLock ? 'flex' : 'none'}}>
            <label htmlFor="DateTime" className='DateTimeLabel'>تاریخ فعال سازی:</label>
            

            <LocalizationProvider dateAdapter={AdapterJalali}>
                <DatePicker
                  mask="____/__/__"
                  value={warrantyDateEnd}
                  label="."
                  onChange={(newValue) => {setWarrantyDateEnd(newValue);setForminputs({...formInputs, ['warrantyDateTo']: newValue})}}
                  renderInput={(params) => <TextField {...params} inputProps={{
                                ...params.inputProps,
                              }}/>}
                />
             </LocalizationProvider>
          </div>
        
          

      </div>
      <div className="middleForm">
        
          <select className="selectwaranty" onChange={(e) => setForminputs({...formInputs, ['warrantyType']: e.target.value})}>
            <option value="0" disabled>نوع گارانتی</option>
            <option value="گارانتی">گارانتی</option>
            <option value="غیر گارانتی">غیر گارانتی</option>
            <option value="استعلام تکنسین">استعلام تکنسین</option>
          </select>
        
         

        
          <select className="selectwaranty" onChange={(e) => setForminputs({...formInputs, ['jobType']: e.target.value})}>
            <option value="0" disabled>نوع کار:</option>
            <option value="بدون سابقه">بدون سابقه</option>
            <option value="برگشتی عادی">برگشتی عادی</option>
            <option value="برگشتی ویژه">برگشتی ویژه</option>
            <option value="VIP">VIP</option>
          </select>
        
        
          
          <input type="text" className={imeiValSec ? "deviceSerialSeccess" : (imeiVal ? "deviceSerial" : "deviceSerialFailed")} placeholder='سریال دستگاه: ' onBlur={handleIMEIChange}/>
       
        
          <input type="text" className={arrayInputsStart['phonemark'] ? "deviceSerial" : (arrayInputsVal['phonemark'] ? 'deviceSerialSeccess' : 'deviceSerialFailed')} 
           placeholder='مارک دستگاه: ' onBlur={markDeviceBlur} onChange={(e) => setForminputs({...formInputs, ['deviceMark']: e.target.value})}/>
     
     
          <input type="text" className={arrayInputsStart['phoneType'] ? "deviceSerial" : (arrayInputsVal['phoneType'] ? 'deviceSerialSeccess' : 'deviceSerialFailed')} 
          onBlur={deviceTypeBlur} placeholder='نوع دستگاه: 'onChange={(e) => setForminputs({...formInputs, ['deviceType']: e.target.value})}/>
       
          <input type="text" className={arrayInputsStart['phoneModel'] ? "deviceSerial" : (arrayInputsVal['phoneModel'] ? 'deviceSerialSeccess' : 'deviceSerialFailed')} 
           onBlur={deviceModelblur} placeholder='مدل دستگاه: ' onChange={(e) => setForminputs({...formInputs, ['deviceModel']: e.target.value})}/>
      
          <input type="text" className={arrayInputsStart['phoneRam'] ? "deviceSerial" : (arrayInputsVal['phoneRam'] ? 'deviceSerialSeccess' : 'deviceSerialFailed')}
           onBlur={deviceRamBlur} placeholder='حافظه و رام: ' onChange={(e) => setForminputs({...formInputs, ['deviceRam']: e.target.value})}/>
       
          <input type="text" className={arrayInputsStart['phoneColor'] ? "deviceSerial" : (arrayInputsVal['phoneColor'] ? 'deviceSerialSeccess' : 'deviceSerialFailed')}
           onBlur={deviceColorBlur} placeholder='رنگ: ' onChange={(e) => setForminputs({...formInputs, ['deviceColor']: e.target.value})}/>
        
          <input type="text" className={arrayInputsStart['phoneCompony'] ? "deviceSerial" : (arrayInputsVal['phoneCompony'] ? 'deviceSerialSeccess' : 'deviceSerialFailed')}  onBlur={deviceCompanyBlur} placeholder='شرکت وارد کننده: 'onChange={(e) => setForminputs({...formInputs, ['deviceCompany']: e.target.value})}/>
       
        
         
                  <div className='selectwaranty1' style={{direction:"ltr"}}>
                      {/* <Multiselect
                      
                      emptyRecordMsg="آیتمی برای نمایش وجود ندارد"
                      id='multiSelected'
                      options={[
                          {name: 'نصب نرم افزار', id: 1},
                          {name: 'بکاپ گیری', id: 2},
                          {name: 'گلس', id: 3},
                          {name: 'برنامه جانبی', id: 4},
                          {name: 'ساخت اکانت', id: 5},
                      ]}
                      onSelect={(e) => setForminputs({...formInputs, ['deviceAccessories']: e})} // Function will trigger on select event
                      onRemove={(e) => setForminputs({...formInputs, ['deviceAccessories']: e})} // Function will trigger on remove event
                      displayValue="name" // Property name to display in the dropdown options
                      placeholder="لوازم همراه"
                      hidePlaceholder ={true}
                      showArrow={false}
                      /> */}
                  </div>
         
        
        <div className="deviceFaildAndPicture" style={{marginTop:5}}>
          <textarea type="text"  className={arrayInputsStart['operatorDesc'] ? "deviceFailedDescription" : (arrayInputsVal['operatorDesc'] ? 'deviceFailedDescriptionSeccess' : 'deviceFailedDescriptionFailed')} onBlur={agentDescBlur} placeholder='توضیحات کارشناس پذیرش: ' onChange={(e) => setForminputs({...formInputs, ['techDescription']: e.target.value})}/>
          {/* <div className='failedBTNParent'>
          <label htmlFor="secondBtnfile"><i className="fa fa-camera failedBTN" aria-hidden="true"></i></label>
            <input type="file" id='secondBtnfile' accept="image/png, image/gif, image/jpeg" onChange={techDescImageChange}/> */}
            {/* <button className="failedBTN" onClick={signaturePadClicked}><i className="fa fa-camera" aria-hidden="true"></i></button> */}
            {/* <span>اضافه کردن عکس</span>
          </div> */}
        </div>

        <div className="signaturepadDiv">
          <SignaturePad clearButton="true" ref={sigPad} sigType={"agent"}  textTitle="امضا کارشناس پذیرش: " />
        </div>
      </div>
      <div className="leftForm">
        <div className="LOGO">
          <img className='logoAdmission' src={logo} alt="" />
        </div>

        <div className="qrCodeDiv">
        {/* <QRCode value='hey'/> */}
        </div>

        
        <textarea type="text"   className="warrantyExp deviceFailedDescription" placeholder='توضیحات ابطال گارانتی: ' onChange={(e) => setForminputs({...formInputs, ['warrantyDescription']: e.target.value})}/>
        
        
        <textarea type="text"   className="fanni deviceFailedDescription" placeholder='توضیحات فنی: ' onChange={(e) => setForminputs({...formInputs, ['technicalDescription']: e.target.value})}/>
        
        <div className="signaturepadDiv1">
          <SignaturePad ref={sigPadCustomer} clearButton="true" sigType={"customer"}  textTitle="امضا مشتری: " />
        </div>
        <button className='admissionButtonSubmit' onClick={onSubmitAdmitForm}>ارسال</button>
      </div>
    </div>
  )
}


export default AdmissionForm