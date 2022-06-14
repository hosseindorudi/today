
import './AdmissionForm.css'
import logo from "../../../../../src/assets/imgs/logo22.png";
import PatternLock from './patternLock/PatternLock';
import { useEffect, useRef, useState, useContext } from 'react';
import SignaturePad from "./signaturePad/src/index";
import QRCode from "react-qr-code";
import AppContext from '../../../../contexts/AppContext';
import Multiselect from 'multiselect-react-dropdown';
import TextField from '@mui/material/TextField';
import AdapterJalali from '@date-io/date-fns-jalali';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { TabContext } from '../../../../contexts/TabContextProvider';
import Admission from './Admission';



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
  
 
  const sigPad = useRef({});
  const sigPadCustomer = useRef({});


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
        Component:<AdmissionForm/>
      }
      , "remove");
    tabContext.addRemoveTabs(
      
      {
        title: "routes.admission",
        path: "/admission",
        Component:<Admission/>
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



  
  useEffect(()=>{
    let today = new Date().toLocaleDateString(currentLang.app.lang === 'fa' ?'fa-IR' :'en-US');
    setTodayDate(today)
    let todayTime = new Date().toLocaleTimeString(currentLang.app.lang === 'fa' ?'fa-IR' : 'en-US');
    setTodayTime(todayTime);
    
  },[currentLang.app.lang])

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
          
            <input type="number" id='recievtionID' placeholder='شماره قبض پذیرش' onChange={(e) => setForminputs({...formInputs, ['recievtionID']: e.target.value})}/>
          
          
            <input type="text" id='nameLastNameINFO' className='personInformation' placeholder='نام و نام خانوادگی' onChange={(e) => setForminputs({...formInputs, ['nameLastNameINFO']: e.target.value})}/>
            <input type="text" id='phoneNumber'  className='personInformation'  placeholder='شماره تماس' onChange={(e) => setForminputs({...formInputs, ['phoneNumber']: e.target.value})}/>
            <input type="text" id='state'  className='personInformation'  placeholder='استان' onChange={(e) => setForminputs({...formInputs, ['state']: e.target.value})}/>
            <input type="text" id='city'  className='personInformation'  placeholder='شهرستان' onChange={(e) => setForminputs({...formInputs, ['city']: e.target.value})}/>
            <textarea type="text" id='address'  className='personInformationText'  placeholder='آدرس' onChange={(e) => setForminputs({...formInputs, ['address']: e.target.value})}/>
          
          <div className="deviceFaildAndPicture">
            <textarea type="text"  id='deviceFailedDescription' placeholder='عیب به اظهار مشتری:' onChange={(e) => setForminputs({...formInputs, ['deviceFailedDescription']: e.target.value})}/>
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
        
        
          
          <input type="text" className="deviceSerial" placeholder='سریال دستگاه: ' onChange={(e) => setForminputs({...formInputs, ['deviceSerial']: e.target.value})}/>
       
        
          <input type="text" className="deviceSerial" placeholder='مارک دستگاه: ' onChange={(e) => setForminputs({...formInputs, ['deviceMark']: e.target.value})}/>
     
     
          <input type="text" className="deviceSerial" placeholder='نوع دستگاه: 'onChange={(e) => setForminputs({...formInputs, ['deviceType']: e.target.value})}/>
       
          <input type="text" className="deviceSerial" placeholder='مدل دستگاه: ' onChange={(e) => setForminputs({...formInputs, ['deviceModel']: e.target.value})}/>
      
          <input type="text" className="deviceSerial" placeholder='حافظه و رام: ' onChange={(e) => setForminputs({...formInputs, ['deviceRam']: e.target.value})}/>
       
          <input type="text" className="deviceSerial" placeholder='رنگ: ' onChange={(e) => setForminputs({...formInputs, ['deviceColor']: e.target.value})}/>
        
          <input type="text" className="deviceSerial" placeholder='شرکت وارد کننده: 'onChange={(e) => setForminputs({...formInputs, ['deviceCompany']: e.target.value})}/>
       
        
         
                  <div className='selectwaranty1' style={{direction:"ltr"}}>
                      <Multiselect
                      
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
                      />
                  </div>
         
        
        <div className="deviceFaildAndPicture" style={{marginTop:5}}>
          <textarea type="text"  id='deviceFailedDescription' placeholder='توضیحات کارشناس پذیرش: ' onChange={(e) => setForminputs({...formInputs, ['techDescription']: e.target.value})}/>
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
        <QRCode value='hey'/>
        </div>

        
        <textarea type="text"  id='deviceFailedDescription' className="warrantyExp" placeholder='توضیحات ابطال گارانتی: ' onChange={(e) => setForminputs({...formInputs, ['warrantyDescription']: e.target.value})}/>
        
        
        <textarea type="text"  id='deviceFailedDescription' className="fanni" placeholder='توضیحات فنی: ' onChange={(e) => setForminputs({...formInputs, ['technicalDescription']: e.target.value})}/>
        
        <div className="signaturepadDiv1">
          <SignaturePad ref={sigPadCustomer} clearButton="true" sigType={"customer"}  textTitle="امضا مشتری: " />
        </div>
        <button className='admissionButtonSubmit' onClick={onSubmitAdmitForm}>ارسال</button>
      </div>
    </div>
  )
}


export default AdmissionForm