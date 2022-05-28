import React from 'react'
import packageJson from '../../../package.json'
import Clock from '../Footer/clock'
import './footer.css'
const Footer = () => {
  return (
    <div className="footer">
    <div className="rightFooter">© 2022 ctelecom. All Rights Reserved</div>
    <div className="middleFooter"><Clock/></div>
    <div className="leftFooter">version:{packageJson.version}</div>
    </div>
  )
}

export default Footer