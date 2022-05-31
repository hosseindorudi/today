import React from 'react'
import packageJson from '../../../package.json'
import Clock from '../Footer/clock'
import './footer.css'
const Footer = () => {
  const today=new Date();

  return (
    <div className="footer">
    <div className="rightFooter">Copyright &copy; Ctelecom {today.getFullYear()}</div>
    <div className="middleFooter"><Clock/></div>
    <div className="leftFooter">version:{packageJson.version}</div>
    </div>
  )
}

export default Footer