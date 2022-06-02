import React,{ useState } from 'react'
import './modal.css'
const Modal = ({setIsOpen}) => {

  const [values,setValues] = useState({
    title:"",
    desc:""
  })

  const onSubmit = (e) => {
    e.preventDefault();
  }

  const onChange = (e) => {
    setValues({ ...values, [e.target.name]: e.target.value });
    console.log(values);
  }


  return (
    <>
      {/* <div className="darkBG" onClick={() => setIsOpen(false)} />
        <div className="centered">
          <div className="modal">
            <div className="modalHeader">
              <h5 className="heading">یادداشت</h5>
            </div>
            <button className="closeBtn" onClick={() => setIsOpen(false)}>
            <i className="fa fa-times" aria-hidden="true"></i>
            </button>
            <div className="modalContent">
              <input type="text" id="modalTitle" placeholder='موضوع' />
            </div>
            <div className="modalContentDesc">
              <textarea type="text" id="modalDesc" placeholder=' یادداشت' />
            </div>
            <div className="modalActions">
              <div className="actionsContainer">
                <button className="deleteBtn" onClick={() => setIsOpen(false)}>
                  افزودن
                </button>
              </div>
            </div>
          </div>
      </div> */}

      <div className="tableModalParentModal" >
              <div className="tableModalContainerModal">
                  <div className="tableModalHeaderModal">
                    <h1 className="tableModalHeadingModal">یادداشت</h1>
                  </div>
                  <button className="closeBtnModal" onClick={()=>setIsOpen(false)}>
                    <i className="fa fa-times" aria-hidden="true"></i>
                  </button>
                  <div className="tableModalContentModal">
                    <form onSubmit={onSubmit} className='tableModalFormModal'>
                      <div className='tableModalFormDivModal'>
                      <input type="text" id="modalTitleModal" placeholder='موضوع' onChange={onChange}/>
                      <textarea type="text" id="modalDescModal" placeholder=' یادداشت' onChange={onChange} />
                      </div>
                      <div className="submitBTNDivModal">
                        <button className='tableModalSumitBtnModal'>ارسال</button>
                      </div>
                    </form>
                  </div>
              </div>
          </div>
    </>
  )
}

export default Modal