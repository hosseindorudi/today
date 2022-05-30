import React from "react";

const AppContext = React.createContext({
    app: {
        forms:[],
        activeTab:"/dashboard",
        lang:'',
        langCode:'',
        sidebarOpen:false
    }, setApp: () => {}
})
export default AppContext