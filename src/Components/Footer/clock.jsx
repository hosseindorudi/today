
import React, { useContext, useEffect, useState } from 'react'
import AppContext from '../../contexts/AppContext';
import './clock.css'
function Clock() {
  const context = useContext(AppContext)
    const [time,setTime]=useState(new Date().toLocaleTimeString(context.app.lang === 'fa' ?'fa-IR' : 'en-US',{hour: '2-digit', minute:'2-digit', hour12: false}));
    const [date, setDate] = useState()

    useEffect(()=>{  
        setInterval(() => {
          let todayTime = new Date().toLocaleTimeString(context.app.lang === 'fa' ?'fa-IR' : 'en-US',{hour: '2-digit', minute:'2-digit', hour12: false});
          setTime(todayTime);
        }, 60000);
        let today = new Date().toLocaleDateString(context.app.lang === 'fa' ?'fa-IR' : 'en-US');
        setDate(today)
    },[context.app.lang])
  return (
    <div className='clock'>
       <div>{time}</div><div>{date}</div>
    </div>
  )
}

export default Clock