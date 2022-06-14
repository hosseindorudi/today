import './technician.css'
import logo from "../../../../../assets/imgs/logo.png";
import React, { useEffect, useContext, useState } from "react";
import { data, phone, qcExit } from "../../../../../data/dataQc";
import Multiselect from 'multiselect-react-dropdown';
import { TimePicker } from '@mui/x-date-pickers/TimePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import TextField from '@mui/material/TextField';
import AdapterJalali from '@date-io/date-fns-jalali';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { setDatePickerDate } from '../../../../../validation/functions';
import { TabContext } from "../../../../../contexts/TabContextProvider";
import Technician from '../technicianList/Technician';

const TechnicianForm = () => {
  // const [value,setValue] = useState();

  const [time, setTime] = useState(new Date());
  const [date, setDate] = useState(new Date());
  const [qcState, setqcState] = useState();
  const [phonestate, setphonestate] = useState();
  const [loading, setloading] = useState(true);
  const [warrantyType, setWarrantytype] = useState('0');
  const [deviceStatus, setDeviceStatus] = useState('0');
  const [extraService, setExtraService] = useState([]);
  const [fallWarranty, setFallWarranty] = useState([]);
  const [techText, settechText] = useState('')


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


  useEffect(() => {
      setqcState(qcExit);
      setphonestate(phone);
      setloading(false);
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

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
      {loading ? (
      "loading..."
    ) : (
      <>
      <div className="first">
          <div className="formQc">
              <div className="QcText">
                  فرم تکنسین
              </div>
          </div> 
          <div className="title">
              <div className="officeTitle">
                  <span>شرکت پیشتازان فناوری سیب طلایی</span>
                  <br />
                  <b>CTELECOM</b>
              </div>
          </div>
          <div className="logo">
              <div className="logoDiv">
                  <img src={logo} alt="logo" />
              </div>
          </div>
          
      </div>
      <hr />
      <div className="second">
              <div className="right">
                  <div>
                      <span>تاریخ پذیرش دستگاه:</span>
                      <span>{qcState.date}</span>
                  </div>
                  <div>
                      {" "}
                      <span>ساعت پذیرش دستگاه:</span> <span>{qcState.time}</span>
                  </div>
                  <div>
                      {" "}
                      <span>نام و نام خانوادگی مالک دستگاه:</span>
                      <span>{qcState.name}</span>{" "}
                  </div>
                  <div>
                      {" "}
                      <span>استان:</span>
                      <span>{qcState.province}</span>{" "}
                  </div>
                  <div>
                      <span>شهرستان:</span>
                      <span>{qcState.city}</span>{" "}
                  </div>
                  <div>
                      {" "}
                      <span>تکنسین:</span>
                      <span>{qcState.tech}</span>{" "}
                  </div>
                  <div>
                      {" "}
                      <span>اپراتور:</span>
                      <span>{qcState.operatorQC}</span>{" "}
                  </div>
              </div>
              <div className="left">
                  <div>
                      <span>نوع گارانتی:</span>
                      <span>{phonestate.garanteeType}</span>
                  </div>
                  <div>
                      <span>سریال دستگاه:</span>
                      <span>{phonestate.serial}</span>
                  </div>
                  <div>
                      <span>مارک:</span>
                      <span>{phonestate.brand}</span>
                  </div>
                  <div>
                      <span>نوع:</span>
                      <span>{phonestate.type}</span>
                  </div>
                  <div>
                      <span>مدل:</span>
                      <span>{phonestate.model}</span>
                  </div>
                  <div>
                      <span>رنگ:</span>
                      <span>{phonestate.color}</span>
                  </div>
                  <div>
                      <span>گیگ:</span>
                      <span>{phonestate.storage}</span>
                  </div>
              </div>
          </div>
          <hr />
      <div className="third">
          <div className="thirdRight">
              <div className="failedCode">
                  <span>کد ایراد:</span>
                  <span>24568</span>
              </div>
              <select className="selectSendTypeTech" onChange={(e) => setWarrantytype(e.target.value)}>
                  <option disabled value="0" >وضعیت گارانتی بعد از نظر تکنسین</option>
                  <option value="گارانتی">گارانتی</option>
                  <option value="بدون گارانتی">بدون گارانتی</option>
                  <option value="استعلام تکنسین">استعلام تکنسین</option>
              </select>
              <textarea type="text" id='technicianDesc' onChange={(e) => settechText(e.target.value)}  className='personInformationTech'  placeholder='توضیحات فنی تکنسین' />
              
              <select className="selectSendTypeTech" onChange={(e) => setDeviceStatus(e.target.value)}>
                  <option disabled value="0">وضعیت فعلی دستگاه</option>
                  <optgroup label="در انتظار مشتری:(قبل از باز شدن گوشی)">
                      <option value="منتظر رمز و اکانت">منتظر رمز و اکانت</option>
                      <option value="در انتظار تایید مشتری">در انتظار تایید مشتری</option>
                  </optgroup>
                  <optgroup label="در حال تعمیر:">
                      <option value="تعمیرنرم افزاری">تعمیرنرم افزاری</option>
                      <option value="تعمیر سخت افزاری">تعمیر سخت افزاری</option>
                      <option value="در انتظار قطعه (قطعی)">در انتظار قطعه (قطعی)</option>
                      <option value="در انتظار قطعه (تستی)">در انتظار قطعه (تستی)</option>
                      <option value="در انتظار کمک فنی">در انتظار کمک فنی</option>
                      <option value="منتظر رمز و اکانت">منتظر رمز و اکانت</option>
                  </optgroup>
                  <optgroup label="اتمام کار:">
                      <option value="عدم مشاهده ایراد">عدم مشاهده ایراد</option>
                      <option value="مرجوع">مرجوع</option>
                      <option value="انصراف مشتری از تعمیر">انصراف مشتری از تعمیر</option>
                      <option value="تعویض کامل">تعویض کامل</option>
                      <option value="تعویض برد(ثبت imei)">تعویض برد(ثبت imei)</option>
                  </optgroup>
              </select>
              <button className='techReqBtn'>درخواست قطعه</button>
              
          </div>
          <div className="thirdLeft">
              <div className="failedCodeLef">
                  <span>اجرت:</span>
                  <span>60 هزار تومان</span>
              </div>
              <div className="multiSelectDp">
                  <label htmlFor="multiSelected">خدمات اضافه:</label>
                  <div style={{direction:"ltr"}}>
                      <Multiselect
                      emptyRecordMsg="آیتمی برای نمایش وجود ندارد"
                      id='multiSelected'
                      options={[
                          {name: 'نصب نرم افزار', id: 1},
                          {name: 'بکاپ گیری', id: 2},
                          {name: 'گلس', id: 3},
                          {name: 'برنامه جانبی', id: 4},
                          {name: 'ساخت اکانت', id: 5},
                      ]} // Options to display in the dropdown
                      // Preselected value to persist in dropdown
                      onSelect={(e)=>{ setExtraService(e)}} // Function will trigger on select event
                      onRemove={(e)=>{setExtraService(e)}} // Function will trigger on remove event
                      displayValue="name" // Property name to display in the dropdown options
                      placeholder=""
                      hidePlaceholder ={true}
                      showArrow={true}
                      />
                  </div>
              </div>
              <div className="multiSelectDp">
                  <label htmlFor="multiSelected">علت ابطال گارانتی:</label>
                  <div style={{direction:"ltr"}}>
              <Multiselect
                  emptyRecordMsg="آیتمی برای نمایش وجود ندارد"
                  
                  options={[
                      {name: 'ضربات فیزیکی', id: 1},
                      {name: 'اکسیده شدن', id: 2},
                      {name: 'آتش سوزی', id: 3},
                      {name: 'نفوذ مایعات', id: 4},
                      {name: 'زنگ زدگی', id: 5},
                      {name: 'شکستگی', id: 6},
                      {name: 'نحنای دستگاه', id: 7},
                      {name: 'بکارگیری آدابتورهای متفرقه', id: 8},
                      {name: 'ارتقا و تغییر در قطعات', id: 9},
                      {name: 'لقی یا شکستگی سوکت شارژر', id: 10},
                      {name: 'استفاده در محیط های آلوده و پر گرد و غبار ', id: 11},
                      {name: 'دستکاری قطعات توسط افراد غیر مجاز', id: 12},
                      {name: 'ترشح مواد شیمیایی', id: 13},
                      {name: 'ایراد ناشی از ROOT', id: 14},
                      {name: 'ایراد ناشی ازFLASH در مراکز متفرقه', id: 15},
                      {name: 'استفاده از اپ های آلوده', id: 16},
                      {name: 'نوسان برق', id: 17},
                      {name: 'آتش سوزی', id: 18},
                      {name: 'ایراد ناشی از Jailbreak', id: 19},
                  ]} // Options to display in the dropdown
                  // Preselected value to persist in dropdown
                  onSelect={(e)=>{ setFallWarranty(e)}} // Function will trigger on select event
                  onRemove={(e)=>{setFallWarranty(e)}} // Function will trigger on remove event
                  displayValue="name" // Property name to display in the dropdown options
                  placeholder=""
                  hidePlaceholder ={true}
                  showArrow={true}
                  />
                  
                  </div>
                 
              </div>
              <div className="timepickerDiv" >
                      
                      <LocalizationProvider dateAdapter={AdapterJalali}>
                          <TimePicker
                              ampm={false}
                              openTo="hours"
                              views={['hours', 'minutes']}
                              inputFormat="HH:mm"
                              mask="__:__:__"
                              label="ساعت اتمام سرویس"
                              value={time}
                              onChange={(newValue) => {
                                  setTime(newValue);
                              }}
                              renderInput={(params) => <TextField {...params} />}
                          />
                      </LocalizationProvider>


                      <LocalizationProvider dateAdapter={AdapterJalali}>
                          <DatePicker
                          mask="__/__/____"
                          inputFormat="dd-MM-yyyy"
                          value={date}
                          label="تاریخ اتمام سرویس"
                          onChange={(newValue) => {setDate(newValue)}}
                          renderInput={(params) => <TextField {...params} />}
                          />
                      </LocalizationProvider>
                  </div>
                  <button className='technicianSubmitButton' onClick={handleSubmitTech}>ارسال</button>

          </div>
      </div>

      </>
    )}
  </main>
)
}



export default TechnicianForm