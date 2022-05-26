
import './AdmissionForm.css'

import PatternLock from './patternLock/PatternLock';
import { useEffect, useRef, useState, useContext } from 'react';
import SignaturePad from "./signaturePad/src/index";
import QRCode from "react-qr-code";
import AppContext from '../../../contexts/AppContext';

import TextField from '@mui/material/TextField';
import AdapterJalali from '@date-io/date-fns-jalali';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';

var base64 = require('base-64');



const AdmissionForm = () => {
  
  const [patternLock, setpatternLock] = useState(false);
  const [patternLockSize, setPatternLockSize] = useState("0");
  const [value, setValue] = useState(new Date());
  const [warrantyDateBeg, setWarrantyDateBeg] = useState(new Date());
  const [warrantyDateEnd, setWarrantyDateEnd] = useState(new Date());
  const [firstImg, setFirstImg] = useState();
  const [secondImg, setSecondImg] = useState();
  const [todayDate, setTodayDate] = useState('');
  const [todayTime, setTodayTime] = useState('');
  const currentLang = useContext(AppContext);

  let sigPad = useRef({});

  const signaturePadClicked = () => {
    console.log(sigPad.current.toDataURL());
    var encodedData = base64.encode(sigPad.current.toDataURL());
    console.log(encodedData);
    // var decodedData = base64.decode(encodedData);
    // console.log(decodedData);
    // console.log(sigPad.current.fromDataURL(sigPad.current.toDataURL()));
  }


  const onImageChange = (e) => {
    const [file] = e.target.files;
    console.log(file)
    // setFirstImg(URL.createObjectURL(file));
    setFirstImg(file);
    // console.log(URL.createObjectURL(file))
    
  };

  useEffect(()=>{
    let today = new Date().toLocaleDateString(currentLang.app.lang === 'fa' ?'fa-IR' : 'en-US');
    setTodayDate(today)
    let todayTime = new Date().toLocaleTimeString(currentLang.app.lang === 'fa' ?'fa-IR' : 'en-US');
    setTodayTime(todayTime);
    
  },[currentLang.app.lang])
  


  return (
    <div className="mainProductForm ">
      <div className="rightForm">
          <div className="DateAdnTime1">
            {/* <label htmlFor="DateTime" className='DateTimeLabel'>تاریخ و ساعت:</label> */}
            {/* <input type="datetime-local" name="" id="DateTime"  /> */}

            {/* <LocalizationProvider dateAdapter={AdapterJalali}>
                <DatePicker
                  mask="____/__/__"
                  value={value}
                  onChange={(newValue) => {setValue(newValue); console.log(newValue)}}
                  renderInput={(params) => <TextField  {...params} />}
                />
             </LocalizationProvider> */}
             <div className="timeanddate">
              <h4>{todayTime}</h4>
              <h3>{todayDate}</h3>
             </div>
            
          </div>
          
            <input type="number" id='recievtionID' placeholder='شماره قبض پذیرش'/>
          
          
            <input type="text" id='nameLastNameINFO' className='personInformation' placeholder='نام و نام خانوادگی'/>
            <input type="text" id='phoneNumber'  className='personInformation'  placeholder='شماره تماس'/>
            <input type="text" id='state'  className='personInformation'  placeholder='استان'/>
            <input type="text" id='city'  className='personInformation'  placeholder='شهرستان'/>
            <textarea type="text" id='address'  className='personInformation'  placeholder='آدرس' />
          
          <div className="deviceFaildAndPicture">
            <textarea type="text"  id='deviceFailedDescription' placeholder='عیب به اظهار مشتری:'/>
            <div className='failedBTNParent'>
            <label htmlFor="firstBtnfile"><i className="fa fa-camera failedBTN" aria-hidden="true"></i></label>
            <input type="file" id='firstBtnfile' accept="image/png, image/gif, image/jpeg" onChange={onImageChange} />
              {/* <button className="failedBTN"><i className="fa fa-camera" aria-hidden="true"></i></button> */}
              <span>اضافه کردن عکس در صورت لزوم</span> <span>{firstImg ? firstImg.name : '' }</span>
            </div>
          </div>
          
            
          <input type="text" id='phonePass' className='personInformation' placeholder='رمز: درصورت داشتن'/>
        
        
          <input type="text" id='GmailApple' className='personInformation' placeholder='GMAIL/APPLE ID/MI ACCOUNT'/>
        
          
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
          <div className='patternLock' style={{display: patternLock ? 'block' : 'none'}}><PatternLock  size={patternLockSize} setpatternLock = {setpatternLock} /></div>
          
          
          <select className="selectSendType" style={{display: !patternLock ? 'block' : 'none'}}>
            <option value="0">نوع تحویل دستگاه به مشتری</option>
            <option value="1">پست</option>
            <option value="2">تی پاکس</option>
            <option value="3">DTS</option>
            <option value="4">پیک</option>
            <option value="5">چاپار</option>
            <option value="6">حضوری</option>
          </select>

          <div className="DateAdnTime" style={{display: !patternLock ? 'flex' : 'none'}}>
            <label htmlFor="DateTime" className='DateTimeLabel'>تاریخ شروع گارانتی:</label>
            {/* <input type="datetime-local" name="" id="DateTime"  /> */}

            <LocalizationProvider dateAdapter={AdapterJalali}>
                <DatePicker
                  mask="____/__/__"
                  value={warrantyDateBeg}
                  onChange={(newValue) => {setWarrantyDateBeg(newValue); console.log(newValue)}}
                  renderInput={(params) => <TextField {...params} />}
                />
             </LocalizationProvider>

            
          </div>
          
          <div className="DateAdnTime" style={{display: !patternLock ? 'flex' : 'none'}}>
            <label htmlFor="DateTime" className='DateTimeLabel'>تاریخ فعال سازی:</label>
            {/* <input type="datetime-local" name="" id="DateTime"  /> */}

            <LocalizationProvider dateAdapter={AdapterJalali}>
                <DatePicker
                  mask="____/__/__"
                  value={warrantyDateEnd}
                  onChange={(newValue) => setWarrantyDateEnd(newValue)}
                  renderInput={(params) => <TextField {...params} />}
                />
             </LocalizationProvider>
          </div>
        
          

      </div>
      <div className="middleForm">
        
          <select className="selectwaranty">
            <option value="0">گارانتی</option>
            <option value="1">غیر گارانتی</option>
            <option value="2">استعلام تکنسین</option>
          </select>
        
         

        
          <select className="selectwaranty">
            <option value="0">نوع کار:</option>
            <option value="1">بدون سابقه</option>
            <option value="2">برگشتی عادی</option>
            <option value="3">برگشتی ویژه</option>
            <option value="4">VIP</option>
          </select>
        
        
          
          <input type="text" className="deviceSerial" placeholder='سریال دستگاه: ' />
       
        
          <input type="text" className="deviceSerial" placeholder='مارک دستگاه: ' />
     
     
          <input type="text" className="deviceSerial" placeholder='نوع دستگاه: '/>
       
          <input type="text" className="deviceSerial" placeholder='مدل دستگاه: ' />
      
          <input type="text" className="deviceSerial" placeholder='حافظه و رام: ' />
       
          <input type="text" className="deviceSerial" placeholder='رنگ: ' />
        
          <input type="text" className="deviceSerial" placeholder='شرکت وارد کننده: '/>
       
        
        <select className="selectwaranty" >
            <option value="0">لوازم همراه:</option>
            <option value="1">بدون سابقه</option>
            <option value="2">برگشتی عادی</option>
            <option value="3">برگشتی ویژه</option>
            <option value="4">VIP</option>
          </select>
        
        <div className="deviceFaildAndPicture" style={{marginTop:5}}>
          <textarea type="text"  id='deviceFailedDescription' placeholder='توضیحات کارشناس پذیرش: '/>
          <div className='failedBTNParent'>
          <label htmlFor="secondBtnfile"><i className="fa fa-camera failedBTN" aria-hidden="true"></i></label>
            <input type="file" id='secondBtnfile' accept="image/png, image/gif, image/jpeg"/>
            {/* <button className="failedBTN" onClick={signaturePadClicked}><i className="fa fa-camera" aria-hidden="true"></i></button> */}
            <span>اضافه کردن عکس</span>
          </div>
        </div>

        <div className="signaturepadDiv">
          <SignaturePad clearButton="true" ref={sigPad}  textTitle="امضا کارشناس پذیرش: " />
        </div>
      </div>
      <div className="leftForm">
        <div className="LOGO">
          <img src="" alt="" />
        </div>

        <div className="qrCodeDiv">
        <QRCode value='hey'/>
        </div>

        
        <textarea type="text"  id='deviceFailedDescription' className="warrantyExp" placeholder='توضیحات ابطال گارانتی: '/>
        
        
        <textarea type="text"  id='deviceFailedDescription' className="fanni" placeholder='توضیحات فنی: '/>
        
        <div className="signaturepadDiv1">
          <SignaturePad clearButton="true"  textTitle="امضا مشتری: " />
        </div>
      </div>
    </div>
  )
}

export default AdmissionForm