import React from 'react'
import { Form } from 'react-bootstrap';
import { useTranslation } from 'react-i18next'
import './virtualIpForm.css'


const VirtualIpForm = () => {

    

    const {t} = useTranslation();

  return (
    <div className='OperatorVitualIpFormIP'>
    <h1 className='OperatorVitualIpFormTitleIP'>{t("validIPAddressHeader")}</h1>
    <div className="OperatorVitualIpFormMainDivIP">
      
      <form action='' className='OperatorVitualIpFormformIP' >
      <div class="switch">
            <Form.Check
              type="switch"
              id="custom-switch"
              label={t("OperatorGroup.switch")}
            />
          </div>
          <div className="inputDivIP">
              <label htmlFor="OperatorVitualIpFormInputTitle1IP">{t("validIPAddressTitle")}</label>
              <input type="text" className="OperatorVitualIpFormInputTitleIP" id='OperatorVitualIpFormInputTitle1IP' />
          </div>
          <div className="inputDivIP">
              <label htmlFor="OperatorVitualIpFormInputFromIP4IP">{t("validIPAddressFrom")}</label>
              <div className="inputDivIPEndIP">
              
               <input type="number" className="OperatorVitualIpFormInputTitleIP ipInputIP" id='OperatorVitualIpFormInputFromIP4IP'
               placeholder='000' />
               .
               <input type="number" className="OperatorVitualIpFormInputTitleIP ipInputIP" id='OperatorVitualIpFormInputFromIP3IP'
               placeholder='000' />
               .
               <input type="number" className="OperatorVitualIpFormInputTitleIP ipInputIP" id='OperatorVitualIpFormInputFromIP2IP'
               placeholder='000' />
               .
               <input type="number" className="OperatorVitualIpFormInputTitleIP ipInputIP" id='OperatorVitualIpFormInputFromIP1IP'
               placeholder='000' />
              </div>
          </div>
          <div className="inputDivIP">
              <label htmlFor="OperatorVitualIpFormInputToIP4IP">{t("validIPAddressTo")}</label>
              <div className="inputDivIPEndIP">
              
               <input type="number" className="OperatorVitualIpFormInputTitleIP ipInputIP" id='OperatorVitualIpFormInputToIP4IP'
               placeholder='000' />
               .
               <input type="number" className="OperatorVitualIpFormInputTitleIP ipInputIP" id='OperatorVitualIpFormInputToIP3IP'
               placeholder='000' />
               .
               <input type="number" className="OperatorVitualIpFormInputTitleIP ipInputIP" id='OperatorVitualIpFormInputToIP2IP'
               placeholder='000' />
               .
               <input type="number" className="OperatorVitualIpFormInputTitleIP ipInputIP" id='OperatorVitualIpFormInputToIP1IP'
               placeholder='000' />
              </div>
          </div>
          <div className="inputDivDescIP">
              <label htmlFor="OperatorVitualIpFormInputDescIP">{t("validIPAddressDesc")}</label>
              <textarea type="text" className="OperatorVitualIpFormInputDescIP" id='OperatorVitualIpFormInputDescIP' />
          </div>

          <input type="submit" value={t("validIPAddressSubmit")} className='deleteBtnIP'></input>

      </form>
  </div>
</div>
  )
}

export default VirtualIpForm