import React from "react";

const AppContext = React.createContext({
    app: {
        forms:[],
        activeTab:"",
        lang:'',
        langCode:'',
        sidebarOpen:false,
        langOpen:false,
        logOutOpen:false
    }, setApp: () => {}
})
export default AppContext