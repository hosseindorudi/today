import React, { useState,useEffect, useContext } from 'react'
import { TabContext } from "../../../../../contexts/TabContextProvider";

import './sentForm.css'
import SentFormList from '../sentFormList/SentFormList';
const SentForm = () => {
  const [selectValue, setSelectValue] = useState('0')
  const [sentCodeValid, setSentCodeValid] = useState(false);
  const [codeValid, setCodeValid] = useState("");
  const tabContext = useContext(TabContext);
  const handleClickMenu = () => {
    let data = {
      postType: selectValue,
      code: codeValid
    }
    console.log(data)
    tabContext.addRemoveTabs(
      {
        title: "routes.sentForm",
        path: "/sentForm",
        Component:<SentForm/>
      }
      , "remove");
    tabContext.addRemoveTabs(
      
      {
        title: "routes.sent",
        path: "/sent",
        Component:<SentFormList/>
      }
      
      , "add");
  };
  // useEffect(()=> {
  //   codeValid.length === 15 ? setSentCodeValid(!sentCodeValid) : setSentCodeValid(false);
  //   console.log(sentCodeValid)
  // },[codeValid])
  useEffect(()=> {
    console.log(sentCodeValid)
  },[sentCodeValid])

  const handleOnChangeValue = (e) => {
    setCodeValid(prev => prev = e.target.value)
    let arr = e.target.value.split('')
    console.log(arr)
    console.log(arr.length)
    arr.length === 15 ? setSentCodeValid(true) : setSentCodeValid(false);

  }

  return (
    <div className="sentFormMain">
      <div className="sentFormUp">
        <div className="sentFormRight">
          <div className='sentFormMainRightDiv'>
              <label className="sentFormlabel">شماره قبض:</label>
              <div className="sentFormRecievtionDiv">
                <span className="sentFormlabelValue">442456</span>
              </div>
          </div>
          
          <div className='sentFormMainRightDiv'>
              <label className="sentFormlabel">کد ملی مشتری:</label>
              <div className="sentFormRecievtionDiv">
                <span className="sentFormlabelValue">0123345678</span>
              </div>
          </div>
          <div className='sentFormMainRightDiv'>
              <label className="sentFormlabel">نام مشتری:</label>
              <div className="sentFormRecievtionDiv">
                <span className="sentFormlabelValue">حسین درودی</span>
              </div>
          </div>
          <div className='sentFormMainRightDiv'>
              <label className="sentFormlabel">تلفن مشتری:</label>
              <div className="sentFormRecievtionDiv">
                <span className="sentFormlabelValue">01234567890</span>
              </div>
          </div>
          <div className='sentFormMainRightDiv1'>
              <label className="sentFormlabel">آدرس مشتری:</label>
              <div className="sentFormRecievtionDiv2">
                <p className="sentFormlabelValue1">تهران پارک وی جردن میدان تجریش ولنجک اقاقیا</p>
              </div>
          </div>
          <div className='sentFormMainRightDiv'>
              <label className="sentFormlabel">نوع تحویل دستگاه به مشتری:</label>
              <div className="sentFormRecievtionDiv3">
              <select className="sentFormSelectSendType"onChange={(e)=> setSelectValue(e.target.value)}>
                <option value="0" disabled >نوع تحویل دستگاه به مشتری</option>
                <option value="پست">پست</option>
                <option value="تی پاکس">تی پاکس</option>
                <option value="DTS">DTS</option>
                <option value="پیک">پیک</option>
                <option value="چاپار">چاپار</option>
                <option value="حضوری">حضوری</option>
              </select>
              </div>
          </div>
          
        </div>
        <div className="sentFormMid">
          <div className='sentFormMainRightDiv9'>
              <label className="sentFormlabel1">لوازم همراه:</label>
              <div className="sentFormRecievtionDiv">
                <p className="sentFormlabelValue1">شارژر، کابل، هدفون، جعبه</p>
              </div>
          </div>
          <div className='sentFormMainRightDiv9'>
              <label className="sentFormlabel1">مارک:</label>
              <div className="sentFormRecievtionDiv">
                <span className="sentFormlabelValue2">samsung</span>
              </div>
          </div>
          <div className='sentFormMainRightDiv9'>
              <label className="sentFormlabel1">نوع:</label>
              <div className="sentFormRecievtionDiv">
                <span className="sentFormlabelValue2">+A8</span>
              </div>
          </div>
          <div className='sentFormMainRightDiv9'>
              <label className="sentFormlabel1">مدل:</label>
              <div className="sentFormRecievtionDiv">
                <span className="sentFormlabelValue2">phone</span>
              </div>
          </div>
          <div className='sentFormMainRightDiv9'>
              <label className="sentFormlabel1">رنگ:</label>
              <div className="sentFormRecievtionDiv">
                <span className="sentFormlabelValue2">مشکی</span>
              </div>
          </div>
          <div className='sentFormMainRightDiv9'>
              <label className="sentFormlabel1">گیگ:</label>
              <div className="sentFormRecievtionDiv">
                <span className="sentFormlabelValue2">4</span>
              </div>
          </div>
          
        </div>
        <div className="sentFormLeft">
          <div className='sentFormMainRightDiv9'>
              <label className="sentFormlabel1">سریال:</label>
              <div className="sentFormRecievtionDiv">
                <span className="sentFormlabelValue2">123456789012</span>
              </div>
          </div>
          <div className='sentFormMainRightDiv9'>
              <label className="sentFormlabel1">نوع کار:</label>
              <div className="sentFormRecievtionDiv">
                <span className="sentFormlabelValue2">برگشتی عادی</span>
              </div>
          </div>
          <div className='sentFormMainRightDiv9'>
              <label className="sentFormlabel1">مبلغ حساب:</label>
              <div className="sentFormRecievtionDiv">
                <span className="sentFormlabelValue2">12 ملیون تومان</span>
              </div>
          </div>
          <div className='sentFormMainRightDiv9'>
              <label className="sentFormlabel1">کد مرسوله:</label>
              <div className="sentFormRecievtionDiv10">
                <input className={sentCodeValid ? "sentFormlabelInput" : "sentFormlabelInput2"} min={0}  type='number'  onChange={handleOnChangeValue}/>
              </div>
          </div>
          <div className='sentFormMainRightDiv9'>
              <label className="sentFormlabel1">تحویل دهنده:</label>
              <div className="sentFormRecievtionDiv">
                <span className="sentFormlabelValue2">سروش لشکری</span>
              </div>
          </div>
          <div className='sentFormMainRightDiv9'>
              <label className="sentFormlabel1">نام اپراتور:</label>
              <div className="sentFormRecievtionDiv">
                <span className="sentFormlabelValue2">بهرام نورایی</span>
              </div>
          </div>
        </div>
      </div>
      <hr className='sentFormHr'/>
      <div className="sentFormDown">
        <div className="sentFormDownTotal">
          <div className='sentFormDownTotalUp'>
            <span className="sentformDownlabel">تعداد کل ارسالی ها:</span>
            <span className="sentformDownlabelValue">100</span>
          </div>
          <div className='sentFormDownTotalUp'>
            <span className="sentformDownlabel">تعداد ارسالی های امروز:</span>
            <span className="sentformDownlabelValue">10</span>
          </div>
        </div>
        <button className="sentFormButton" onClick={handleClickMenu}>ارسال</button>
      </div>
    </div>
  )
}

export default SentForm