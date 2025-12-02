import { createContext, useState } from "react";

export const RejectedPaperContext = createContext();

export const RejectedPaperProvider = ({ children }) => {
    const [rejectedPapers, setrejectedPapers] = useState([]);

    return (
        <RejectedPaperContext value={{ rejectedPapers, setrejectedPapers }}>
            {children}
        </RejectedPaperContext>
    )
}