import React, { useState,useEffect, useContext } from 'react'
import { TabContext } from "../../../../../contexts/TabContextProvider";

import './sentForm.css'
import SentFormList from '../sentFormList/SentFormList';
import { t } from 'i18next';
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
        Component:SentForm
      }
      , "remove");
    tabContext.addRemoveTabs(
      
      {
        title: "routes.sent",
        path: "/sent",
        Component:SentFormList
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
              <label className="sentFormlabel">{t("recievtionID")}:</label>
              <div className="sentFormRecievtionDiv">
                <span className="sentFormlabelValue">442456</span>
              </div>
          </div>
          
          <div className='sentFormMainRightDiv'>
              <label className="sentFormlabel">{t("sentIdCode")}:</label>
              <div className="sentFormRecievtionDiv">
                <span className="sentFormlabelValue">0123345678</span>
              </div>
          </div>
          <div className='sentFormMainRightDiv'>
              <label className="sentFormlabel">{t("CustomerName")}:</label>
              <div className="sentFormRecievtionDiv">
                <span className="sentFormlabelValue">حسین درودی</span>
              </div>
          </div>
          <div className='sentFormMainRightDiv'>
              <label className="sentFormlabel">{t("sentPhone")}:</label>
              <div className="sentFormRecievtionDiv">
                <span className="sentFormlabelValue">01234567890</span>
              </div>
          </div>
          <div className='sentFormMainRightDiv1'>
              <label className="sentFormlabel">{t("sentAddress")}:</label>
              <div className="sentFormRecievtionDiv2">
                <p className="sentFormlabelValue1">تهران پارک وی جردن میدان تجریش ولنجک اقاقیا</p>
              </div>
          </div>
          <div className='sentFormMainRightDiv'>
              <label className="sentFormlabel">{t("nameLastNameINFOselectSendTypePOST")}:</label>
              <div className="sentFormRecievtionDiv3">
              <select className="sentFormSelectSendType"onChange={(e)=> setSelectValue(e.target.value)}>
                <option value="0" disabled >{t("nameLastNameINFOselectSendTypePOST")}</option>
                <option value="پست">{t("nameLastNameINFOselectSendTypePOST1")}</option>
                <option value="تی پاکس">{t("nameLastNameINFOselectSendTypePOST2")}</option>
                <option value="DTS">{t("nameLastNameINFOselectSendTypePOST3")}</option>
                <option value="پیک">{t("nameLastNameINFOselectSendTypePOST4")}</option>
                <option value="چاپار">{t("nameLastNameINFOselectSendTypePOST5")}</option>
                <option value="حضوری">{t("nameLastNameINFOselectSendTypePOST6")}</option>
              </select>
              </div>
          </div>
          
        </div>
        <div className="sentFormMid">
          <div className='sentFormMainRightDiv9'>
              <label className="sentFormlabel1">{t("sentExtra")}:</label>
              <div className="sentFormRecievtionDiv">
                <p className="sentFormlabelValue1">شارژر، کابل، هدفون، جعبه</p>
              </div>
          </div>
          <div className='sentFormMainRightDiv9'>
              <label className="sentFormlabel1">{t("tech.brand")}:</label>
              <div className="sentFormRecievtionDiv">
                <span className="sentFormlabelValue2">samsung</span>
              </div>
          </div>
          <div className='sentFormMainRightDiv9'>
              <label className="sentFormlabel1">{t("tech.type")}:</label>
              <div className="sentFormRecievtionDiv">
                <span className="sentFormlabelValue2">+A8</span>
              </div>
          </div>
          <div className='sentFormMainRightDiv9'>
              <label className="sentFormlabel1">{t("tech.model")}:</label>
              <div className="sentFormRecievtionDiv">
                <span className="sentFormlabelValue2">phone</span>
              </div>
          </div>
          <div className='sentFormMainRightDiv9'>
              <label className="sentFormlabel1">{t("tech.color")}:</label>
              <div className="sentFormRecievtionDiv">
                <span className="sentFormlabelValue2">مشکی</span>
              </div>
          </div>
          <div className='sentFormMainRightDiv9'>
              <label className="sentFormlabel1">{t("tech.gig")}:</label>
              <div className="sentFormRecievtionDiv">
                <span className="sentFormlabelValue2">4</span>
              </div>
          </div>
          
        </div>
        <div className="sentFormLeft">
          <div className='sentFormMainRightDiv9'>
              <label className="sentFormlabel1">{t("tech.serial")}:</label>
              <div className="sentFormRecievtionDiv">
                <span className="sentFormlabelValue2">123456789012</span>
              </div>
          </div>
          <div className='sentFormMainRightDiv9'>
              <label className="sentFormlabel1">{t("nameLastNameINFOselectwarantyJOB")}:</label>
              <div className="sentFormRecievtionDiv">
                <span className="sentFormlabelValue2">برگشتی عادی</span>
              </div>
          </div>
          <div className='sentFormMainRightDiv9'>
              <label className="sentFormlabel1">{t("sentpayment")}:</label>
              <div className="sentFormRecievtionDiv">
                <span className="sentFormlabelValue2">12 ملیون تومان</span>
              </div>
          </div>
          <div className='sentFormMainRightDiv9'>
              <label className="sentFormlabel1">{t("sentCode")}:</label>
              <div className="sentFormRecievtionDiv10">
                <input className={sentCodeValid ? "sentFormlabelInput" : "sentFormlabelInput2"} min={0}  type='number'  onChange={handleOnChangeValue}/>
              </div>
          </div>
          <div className='sentFormMainRightDiv9'>
              <label className="sentFormlabel1">{t("sentBox")}:</label>
              <div className="sentFormRecievtionDiv">
                <span className="sentFormlabelValue2">سروش لشکری</span>
              </div>
          </div>
          <div className='sentFormMainRightDiv9'>
              <label className="sentFormlabel1">{t("OperatorName")}:</label>
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
            <span className="sentformDownlabel">{t("allsentNo")}:</span>
            <span className="sentformDownlabelValue">100</span>
          </div>
          <div className='sentFormDownTotalUp'>
            <span className="sentformDownlabel">{t("allSentNoToday")}:</span>
            <span className="sentformDownlabelValue">10</span>
          </div>
        </div>
        <button className="sentFormButton" onClick={handleClickMenu}>{t("operatorGroupFormSubmit")}</button>
      </div>
    </div>
  )
}

export default SentForm