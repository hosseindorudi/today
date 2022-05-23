import React from "react";

const AppContext = React.createContext({
    app: {
        forms:[],
        activeTab:"",
        lang:'',
        sidebarOpen:false
    }, setApp: () => {}
})
export default AppContext