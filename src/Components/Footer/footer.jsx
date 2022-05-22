import React from 'react'
import packageJson from '../../../package.json'
import Clock from '../Footer/clock'

const Footer = () => {
  return (
      <>
    <div className="rightFooter">© 2022 ctelecom. All Rights Reserved</div>
    <div className="middleFooter"><Clock/></div>
    <div className="leftFooter">version:{packageJson.version}</div>
    </>
  )
}

export default Footer