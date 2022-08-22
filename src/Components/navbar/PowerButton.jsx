import React from 'react'
import * as fa from "react-icons/fa";
const PowerButton = ({handleLogOut}) => {
  return (
    <div className='powerButton'> <fa.FaPowerOff  onClick={handleLogOut} /></div>
  )
}

export default PowerButton