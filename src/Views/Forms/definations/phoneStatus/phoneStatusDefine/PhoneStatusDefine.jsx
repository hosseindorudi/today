import { t } from 'i18next';
import React,{ useState } from 'react'
import { Form } from 'react-bootstrap';
import FormInput from '../../../../../Components/periodity/formInput/FormInput';
import './phoneStatusDefine.css'
const PhoneStatusDefine = () => {
    const [values, setValues] = useState({
        Periorityactivity:false,
        title:"",
        color:"#000000",
        periority:"",
        desc:"",
      });
    
    
    
    const inputs = [
        {
            id:1,
            name: "title",
            type: "text",
            label:"موضوع",
            placeholder:"موضوع",
            errorMessage:"موضوع نمیتواند کمتر از 4 و بیشتر از 12 کاراکر باشد",
            pattern:"^[\u0600-\u06FF]{4,12}",
            required:true
        },
        {
            id:2,
            name: "color",
            label:"رنگ",
            type: "color",
            errorMessage:"رنگ باید در فرمت هگز باشد",
            required:true
        },
        {
            id:3,
            name: "periority",
            type: "number",
            label:"اولویت",
            placeholder:"اولویت",
            errorMessage:"اولویت باید عددی بین 1 تا 1000 باشد",
            required:true
        },
        {
            id:4,
            name: "desc",
            type: "text",
            label:"توضیحات",
            placeholder:"توضیحات",
            errorMessage:"توضیحات نمیتواند خالی باشد",
            pattern:"^[\u0600-\u06FF]{20,250}",
            required:true
        }
    ]
    
    
    
    
    const onChange = (e) => {
        setValues({ ...values, [e.target.name]: e.target.value });
      };
    
    const handleSubmit = (e) => {
        e.preventDefault();
        
        console.log(JSON.stringify(values))
      };
    return (
    <div className="periorityFormMain">
        <div className="periorityFormHeader"><h1>{t("PhoneStatusDefineHeader")}</h1></div>
        <div className='periorityFormmainDiv'>
            
            <div className="periorityFormForm">
                <form onSubmit={handleSubmit} className='periorityForms'>
                <div class="switch">
                <Form.Check
                  type="switch"
                  id="custom-switch"
                  label={t("OperatorGroup.switch")}
                />
              </div>
                {inputs.map((input) => (
                    <FormInput
                        key={input.id}
                        {...input}
                        value={values[input.name]}
                        onChange={onChange}
                    />
                ))}
    
                <button className='periorityFormSubmit'>ارسال</button>
                   
    
                </form>
            </div>
        </div>
    
    </div>
    )
}

export default PhoneStatusDefine