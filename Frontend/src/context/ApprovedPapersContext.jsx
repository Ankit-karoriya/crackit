import { createContext, useEffect, useState } from "react";
import axios from "axios";

export const ApprovedPaperContext = createContext();

export const ApprovedPaperProvider = ({ children }) => {
    const [approvedPapers, setApprovedPapers] = useState([]);

    return (
        <ApprovedPaperContext value={{ approvedPapers, setApprovedPapers }}>
            {children}
        </ApprovedPaperContext>
    )
}