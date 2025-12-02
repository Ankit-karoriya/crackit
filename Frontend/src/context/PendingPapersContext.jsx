import { createContext, useState } from "react";

export const PendingPaperContext = createContext();

export const PendingPaperProvider = ({children}) => {
    const [pendingPapers, setPendingPapers] = useState([]);
    return (
        <PendingPaperContext.Provider value={{pendingPapers, setPendingPapers}}>
            {children}
        </PendingPaperContext.Provider>
    )
}