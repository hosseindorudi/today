import React from 'react'
import './changeForm.css'
import logo from '../../../../../assets/imgs/logo22.png'
import { FaSearch, FaWindowClose } from "react-icons/fa";
import { t } from 'i18next';
const ChangeForm = () => {
  

  const handleSubmit =() => {
    console.log("changed Sent")
  }


  return (
    <div className="chnageFormmain">
      <div className="changeFormUp">
        <div className='changeFormEmpty'></div>
        <img src={logo} alt="" className="changeFormImg" />
        
      </div>
      <div className="changeFormMid">
        <div className="changeFormMidRight">
          <div className="chnageFormRightitem">
            <span className="chnageFormRightitemlabel">{t("changeIdCode")}:</span>
            <span className="chnageFormRightitemValue">0123456789</span>
          </div>
          <hr className='changeFormHr'/>
          <div className="chnageFormRightitem">
            <span className="chnageFormRightitemlabel">{t("CustomerName")}:</span>
            <span className="chnageFormRightitemValue">حسین درودی</span>
          </div>
          <hr className='changeFormHr'/>
          <div className="chnageFormRightitem">
            <span className="chnageFormRightitemlabel">{t("sentPhone")}:</span>
            <span className="chnageFormRightitemValue">09123456789</span>
          </div>
          <hr className='changeFormHr'/>
          <div className="chnageFormRightitem">
            <span className="chnageFormRightitemlabel">{t("changeSendType")}:</span>
            <span className="chnageFormRightitemValue">پست</span>
          </div>
        </div>
        <div className="chnageFormMidMid"></div>
        <div className="changeFormMidLeft">
          <div className="chnageFormRightitem">
              <span className="chnageFormRightitemlabel">{t("recievtionID")}:</span>
              <span className="chnageFormRightitemValue">0123456789</span>
          </div>
          <hr className='changeFormHr'/>
          <div className="chnageFormRightitem">
              <span className="chnageFormRightitemlabel">{t("changeType")}:</span>
              <span className="chnageFormRightitemValue">قطعه</span>
          </div>
          <hr className='changeFormHr'/>
          <div className="chnageFormRightitem">
              <span className="chnageFormRightitemlabel">{t("changeWarranty")}:</span>
              <span className="chnageFormRightitemValue">گارانتی</span>
          </div>
          <hr className='changeFormHr'/>
          <div className="chnageFormRightitem">
              <span className="chnageFormRightitemlabel">{t("changeMoney")}:</span>
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
                <th className="changeFormTh">{t("changeRow")}</th>
                <th className="changeFormTh">{t("tech.admissionDate")}</th>
                <th className="changeFormTh">{t("changeDeviceChange")}</th>
                <th className="changeFormTh">{t("tech.brand")}</th>
                <th className="changeFormTh">{t("tech.type")}</th>
                <th className="changeFormTh">{t("tech.model")}</th>
                <th className="changeFormTh">{t("tech.serial")}</th>
              </tr>
            </thead>
            <tbody className="changeFormTbody">
              <tr className="changeFormTr">
                <td className="changeFormTd">1</td>
                <td className="changeFormTd">1400/4/3</td>
                <td className="changeFormTd"><hr className='changeFormHrtable'/></td>
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
                <td className="changeFormTd"><hr className='changeFormHrtable'/></td>
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
      <button className='changeFormSubmit' onClick={handleSubmit}>{t("operatorGroupFormSubmit")}</button>
    </div>
  )
}

export default ChangeForm