import React from "react";

const AppContext = React.createContext({
    app: {
        forms:[],
        activeTab:"/dashboard",
        title:"dashboard",
        lang:'',
        langCode:'',
        sidebarOpen:false,
        SafeMode:false,
    }, setApp: () => {}
})
export default AppContext