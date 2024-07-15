import { createContext, useState } from "react";

export const contextApi = createContext();

function StoredContexts({ children }){

    const [noChat, setNoChat] = useState(true);

    const [authUser , setAuthUser] = useState(JSON.parse(localStorage.getItem("chat-user")) || null);

    const values = {
        noChat, setNoChat,
        authUser , setAuthUser
    }

    return(
        <contextApi.Provider value={values}>
            {children}
        </contextApi.Provider>
    )
}

export default StoredContexts;