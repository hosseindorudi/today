import React from 'react'
import sad from '../../assets/imgs/sad.png'
import './errorUI.css'
import * as fi from 'react-icons/fi'
const ErrorUI = () => {
  return (
    <div className="parent404">
    <div className='middleLayer404'>
        <img src={sad} alt='notfound'/>
        
        <h3>Something Went Wrong</h3>
        <button onClick={()=>window.location.reload()}>Refresh <fi.FiRefreshCcw/></button>
    </div>


</div>
  )
}

export default ErrorUI