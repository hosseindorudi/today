import React from 'react'
import './tableModal.css'

const TableModal = ({setTableModalOpen, rowValus, setRowValues}) => {
  // const [triger, setTriger] = useState(false)
  
  // let data = [rowValus];
  // {console.log(rowValus)}

  // let dataValues = Object.values(rowValus);
  // let dataKeys = Object.keys(rowValus);
  // {console.log(Object.values(rowValus))}
  const handleFormChange = (index, e, keys) => {

    // const {name, value} = e.target;
    // console.log (e);
    setRowValues(prev => ({
      ...prev,
      [keys] : e.target.value

    }))
    
    
        // data = [...data, data[0][keys] = event.target.value]

 }
  // {Object.keys(rowValus).forEach((key) => {console.log(key)})}

 const onSubmit = (e)=>{
      e.preventDefault();
      console.log(JSON.stringify(rowValus))
      
 }

 console.log(rowValus)
  return (
    
    <div className="tableModalParebt" >
        <div className="tableModalContainer">
            <div className="tableModalHeader">
              <h1 className="tableModalHeading">اصلاح</h1>
            </div>
            <button className="closeBtn" onClick={()=>setTableModalOpen(false)}>
              <i className="fa fa-times" aria-hidden="true"></i>
            </button>
            <div className="tableModalContent">
              <form onSubmit={onSubmit} className='tableModalForm'>
                <div className='tableModalFormDiv'>
                  {
                    Object.entries(rowValus).map(([keys, value], i) => (keys !=="id" && (<> <label key={keys} className='tableModalLabel' htmlFor={keys}>{keys}</label>
                    <input key={i} id={keys}  placeholder={keys} value={value}  onChange={(e)=>handleFormChange(i,e,keys)} className="formTableInputs"/></>)))
                  }
                </div>
                <div className="submitBTNDiv">
                  <button  className='tableModalSumitBtn'>ارسال</button>
                </div>
              </form>
            </div>
        </div>
    </div>
  )
}

export default TableModal