import React from 'react'
import './modal.css'
const Modal = ({setIsOpen}) => {
  return (
    <>
      <div className="darkBG" onClick={() => setIsOpen(false)} />
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
      </div>
    </>
  )
}

export default Modal