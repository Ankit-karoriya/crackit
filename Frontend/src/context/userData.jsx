import { createContext, useState } from "react";

export const userDataContext = createContext();

export const UserDataProvider = ({ children }) => {
    const [userData, setUserData] = useState(null);

    return (
        <userDataContext.Provider value={{ userData, setUserData }}>
            {children}
        </userDataContext.Provider>
    )
}