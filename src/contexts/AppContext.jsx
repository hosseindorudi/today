import React from "react";

const AppContext = React.createContext({
    app: {
        forms:[],
        activeTab:"/dashboard",
        title:"dashboard",
        lang:'',
        langCode:'',
        sidebarOpen:false,
        verified:false
    }, setApp: () => {}
})
export default AppContext