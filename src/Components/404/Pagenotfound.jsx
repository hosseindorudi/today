import React from 'react'
import sad from '../../assets/imgs/sad.png'
import './pagenotfound.css'
const Pagenotfound = () => {
  return (
    <div className="parent404">
            <div className='middleLayer404'>
                <img src={sad}/>
                <h1>404</h1>
                <h3>PAGE NOT FOUND</h3>
            </div>


        </div>
  )
}

export default Pagenotfound