import './presenceModal.css'
import SignaturePad from "./signaturePad/src/index";
import {useRef} from 'react';

const PresenceModal = ({rowValus,setPresencemodalValue}) => {
    let sigPad = useRef({});

  return (
        <div className="tableModalParebtDelete" >
            <div className="tableModalContainerDelete">
                <div className="tableModalHeaderDelete">
                <h1 className="tableModalHeadingDelete">ارسال حضوری</h1>
                </div>
                <button className="closeBtnDelete" onClick={()=>setPresencemodalValue(false)}>
                <i className="fa fa-times" aria-hidden="true"></i>
                </button>
                <div className="tableModalContentDelete">
                
                <form action="" className='tableModalFormDelete'>
                    <div className="SigPadPresence">
                    
                        <SignaturePad clearButton="true" ref={sigPad}  textTitle="" />
        
                    </div>
                    <div className="submitBTNDivDelete">
                    <input type="submit" value="ارسال" className='tablePresenceModalSumitBtnModalSubmit'/>
                    </div>
                </form>
                </div>
            </div>
        </div>
  )
}

export default PresenceModal