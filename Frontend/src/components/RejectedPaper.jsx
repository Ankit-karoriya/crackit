import { useContext, useEffect } from 'react'
import { RejectedPaperContext } from '../context/RejectedPapersContext'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import axios from 'axios';
import { AlertContext } from '../context/AlertContext.jsx';
const BASE_URL = import.meta.env.VITE_API_BASE_URL;

function RejectedPaper({ index }) {
    const { rejectedPapers, setRejectedPapers } = useContext(RejectedPaperContext);
    const { setAlert } = useContext(AlertContext);

    const approvePaper = async () => {
        try {
            const confirm = window.confirm(`Are you sure you want to approve ${rejectedPapers[index]?.papertitle || "this"} paper? This action cannot be undone.`);
            if (!confirm) return;
            
            const res = await axios.post(`${BASE_URL}/api/paper/approve-paper/${rejectedPapers[index]?._id}`, {}, { withCredentials: true });
            setAlert({ status: "success", message: res.data.message || "" });
            setRejectedPapers(prev => prev.filter((_, i) => i !== index));
        } catch (error) {
            console.error(error);
        }
    }
    return (
        <div className='px-5 bg-red-50 border-red-800 rounded-lg p-3'>
            <div className='flex justify-between'>
                <div>
                    <h3>{rejectedPapers[index]?.papertitle || ""} - {rejectedPapers[index]?.examtype || ""}</h3>
                    <p>{rejectedPapers[index]?.university || ""} • {rejectedPapers[index]?.subject || ""} • {rejectedPapers[index]?.examyear || ""}</p>
                </div>
                <div className='w-fit h-fit rounded-lg px-2 text-xs font-semibold bg-red-200 border-red-700 text-red-900'>Rejected</div>
            </div>
            <div className='flex mt-3 gap-3'>
                <button
                    className='justify-center text-sm font-medium border bg-background hover:bg-gray-200 h-9 rounded-md px-3 flex items-center gap-2 transition-all duration-200'
                    onClick={() => window.open(rejectedPapers[index]?.paperfile || "", "_blank")}
                >
                    <FontAwesomeIcon className='' icon={["fas", "eye"]} />
                    view paper
                </button>
                <button
                    onClick={approvePaper}
                    className='justify-center text-sm font-medium border bg-green-600 text-white hover:bg-green-500 h-9 rounded-md px-3 flex items-center gap-2 transition-all duration-200'
                >
                    <FontAwesomeIcon icon={["fas", "circle-check"]} />
                    Approve
                </button>
            </div>
        </div>
    )
}

export default RejectedPaper
