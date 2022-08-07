import React, { useContext } from 'react'
import { TabContext } from '../../../../contexts/TabContextProvider';

const ImportUI = () => {
    const {tabs} = useContext(TabContext);
    const importUI=tabs.find(f=>f.path==="ImportUI")
    console.log(importUI)
  return (
    <div></div>
  )
}

export default ImportUI