import React from "react";

const AppContext = React.createContext({
    app: {
        forms:[],
        activeTab:"",
        lang:''
    }, setApp: () => {}
})
export default AppContext