import React from 'react'
import './changeForm.css'
import logo from '../../../../../assets/imgs/logo22.png'
import { FaSearch, FaWindowClose } from "react-icons/fa";
const ChangeForm = () => {
  return (
    <div className="chnageFormmain">
      <div className="changeFormUp">
        <div className='changeFormEmpty'></div>
        <img src={logo} alt="" className="changeFormImg" />
        
      </div>
      <div className="changeFormMid">
        <div className="changeFormMidRight">
          <div className="chnageFormRightitem">
            <span className="chnageFormRightitemlabel">کدملی مشتری:</span>
            <span className="chnageFormRightitemValue">0123456789</span>
          </div>
          <hr className='changeFormHr'/>
          <div className="chnageFormRightitem">
            <span className="chnageFormRightitemlabel">نام مشتری:</span>
            <span className="chnageFormRightitemValue">حسین درودی</span>
          </div>
          <hr className='changeFormHr'/>
          <div className="chnageFormRightitem">
            <span className="chnageFormRightitemlabel">تلفن مشتری:</span>
            <span className="chnageFormRightitemValue">09123456789</span>
          </div>
          <hr className='changeFormHr'/>
          <div className="chnageFormRightitem">
            <span className="chnageFormRightitemlabel">نوع ارسال:</span>
            <span className="chnageFormRightitemValue">پست</span>
          </div>
        </div>
        <div className="chnageFormMidMid"></div>
        <div className="changeFormMidLeft">
          <div className="chnageFormRightitem">
              <span className="chnageFormRightitemlabel">شماره قبض:</span>
              <span className="chnageFormRightitemValue">0123456789</span>
          </div>
          <hr className='changeFormHr'/>
          <div className="chnageFormRightitem">
              <span className="chnageFormRightitemlabel">نوع تعویض:</span>
              <span className="chnageFormRightitemValue">قطعه</span>
          </div>
          <hr className='changeFormHr'/>
          <div className="chnageFormRightitem">
              <span className="chnageFormRightitemlabel">وضعیت گارانتی:</span>
              <span className="chnageFormRightitemValue">گارانتی</span>
          </div>
          <hr className='changeFormHr'/>
          <div className="chnageFormRightitem">
              <span className="chnageFormRightitemlabel">مانده حساب:</span>
              <span className="chnageFormRightitemValue">6 ملیون تومان</span>
          </div>
        </div>
      </div>
      <div className="changeFormDown">
        <hr  className='changeFormDownHr'/>
        <div className="changeFormDownTableMain">
          <table className="changeFormTable">
            <thead className="changeFormThead">
              <tr className="changeFormTr">
                <th className="changeFormTh">ردیف</th>
                <th className="changeFormTh">تاریخ</th>
                <th className="changeFormTh">مارک</th>
                <th className="changeFormTh">نوع</th>
                <th className="changeFormTh">مدل</th>
                <th className="changeFormTh">imei</th>
              </tr>
            </thead>
            <tbody className="changeFormTbody">
              <tr className="changeFormTr">
                <td className="changeFormTd">1</td>
                <td className="changeFormTd">1400/4/3</td>
                <td className="changeFormTd">apple</td>
                <td className="changeFormTd">mobile</td>
                <td className="changeFormTd">12pro</td>
                <td className="changeFormTd">
                  <div className="changeFormSearchDiv">
                    <span className='changeFormSearchText'>35239826598</span>
                    <button className="changeFormSearchIconHide" style={{cursor:"auto"}}
                      disabled={true}><FaWindowClose /></button>
                  </div>
                </td>
              </tr>
              <tr className="changeFormTr">
                <td className="changeFormTd">2</td>
                <td className="changeFormTd">1400/4/10</td>
                <td className="changeFormTd">apple</td>
                <td className="changeFormTd">mobile</td>
                <td className="changeFormTd">12pro max</td>
                <td className="changeFormTd">
                  <div className="changeFormSearchDiv">
                    <span className='changeFormSearchText'>35239826599</span>
                    <button className="changeFormSearchIcon"><FaSearch /></button>
                  </div>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}

export default ChangeForm