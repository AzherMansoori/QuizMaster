import React from 'react'

const AppContext = React.createContext({
    isLogin: false,  
    setLogin: (auth) => {
    },
    isMessagesUpdated: false,  
    updateMessages: () => {
    },
});
export default AppContext;