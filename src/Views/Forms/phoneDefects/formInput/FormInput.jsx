import { min } from 'date-fns-jalali';
import React, {useState} from 'react'
import './formInput.css'

const FormInput = (props) => {


    const [focused, setFocused] = useState(false);
    const { label, errorMessage, onChange, id, ...inputProps } = props;
  
    const handleFocus = (e) => {
      setFocused(true);
    };
  
    return (
      <div className="formInput">
        <label className='formInputsLabel'>{label}</label>
        {inputProps.name === 'desc' ? (<>
            
                <textarea  className="inputPeriorityDesc inputPeriority"   
                    {...inputProps}
                    onChange={onChange}
                    onBlur={handleFocus}
                   
                    
                  
                    onFocus={() =>
                        inputProps.name === "desc" && setFocused(true)
                    }

                    focused={focused.toString()}>
                        
                
                </textarea>
        </>) : (<>
            <input className={inputProps.name === 'color' ? "inputPeriority inputPeriorityColor" : "inputPeriority"} 
                {...inputProps}
               
                onChange={onChange}
                onBlur={handleFocus}
                
                
                min = {inputProps.name === "periority" ? 1 : null}
                max = {inputProps.name === "periority" ? 1000 : null}
                onFocus={() =>
                    inputProps.name === "desc" && setFocused(true)
                }

                focused={focused.toString()}
                />
        </>)}
        
        <span className='formInputSpan'>{errorMessage}</span>
      </div>
    );
}

export default FormInput