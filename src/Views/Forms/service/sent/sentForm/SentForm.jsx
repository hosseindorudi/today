import React from 'react'
import './sentForm.css'
const SentForm = () => {
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
              <label className="sentFormlabel">تلفن مشتری:</label>
              <div className="sentFormRecievtionDiv3">
              <select className="sentFormSelectSendType">
                <option value="0" disabled>نوع تحویل دستگاه به مشتری</option>
                <option value="1">پست</option>
                <option value="2">تی پاکس</option>
                <option value="3">DTS</option>
                <option value="4">پیک</option>
                <option value="5">چاپار</option>
                <option value="6">حضوری</option>
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
                <input className="sentFormlabelInput"/>
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
      </div>
    </div>
  )
}

export default SentForm