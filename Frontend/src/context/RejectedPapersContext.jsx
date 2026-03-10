import { createContext, useState } from "react";

export const RejectedPaperContext = createContext();

export const RejectedPaperProvider = ({ children }) => {
    const [rejectedPapers, setRejectedPapers] = useState([]);

    return (
        <RejectedPaperContext value={{ rejectedPapers, setRejectedPapers }}>
            {children}
        </RejectedPaperContext>
    )
}