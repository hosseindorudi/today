import React from "react";

const FormTabsContext = React.createContext({
    selectedForms: [{name:'پروفایل',key:"profile"}], setSelectedForms: () => {}
})
export default FormTabsContext