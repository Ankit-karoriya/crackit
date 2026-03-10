import { useContext, useEffect } from 'react'
import { ApprovedPaperContext } from '../context/ApprovedPapersContext.jsx'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import axios from 'axios';
import { AlertContext } from '../context/AlertContext.jsx';
const BASE_URL = import.meta.env.VITE_API_BASE_URL;

function ApprovedPaper({ index }) {
    const { approvedPapers, setApprovedPapers } = useContext(ApprovedPaperContext);
    const { setAlert } = useContext(AlertContext);

    const rejectPaper = async () => {
        try {
            const confirm = window.confirm(`Are you sure you want to reject ${approvedPapers[index]?.papertitle || "this"} paper? This action cannot be undone.`);
            if (!confirm) return;
            const res = await axios.post(`${BASE_URL}/api/paper/reject-paper/${approvedPapers[index]?._id}`, {}, { withCredentials: true });
            setAlert({ status: "success", message: res.data.message || "" });
            setApprovedPapers(prev => prev.filter((_, i) => i !== index));
        } catch (error) {
            console.error(error);
        }
    };
    return (
        <div className='px-5 bg-green-50 border-green-800 rounded-lg p-3'>
            <div className='flex justify-between'>
                <div>
                    <h3>{approvedPapers[index]?.papertitle || ""} - {approvedPapers[index]?.examtype || ""}</h3>
                    <p>{approvedPapers[index]?.university || ""} • {approvedPapers[index]?.subject || ""} • {approvedPapers[index]?.examyear || ""}</p>
                </div>
                <div className='w-fit h-fit rounded-lg px-2 text-xs font-semibold bg-green-200 border-green-700 text-green-900'>Approved</div>
            </div>
            <div className='flex gap-3 mt-3'>
                <button
                    className='justify-center text-sm font-medium border bg-background hover:bg-gray-200 h-9 rounded-md px-3 flex items-center gap-2 transition-all duration-200'
                    onClick={() => window.open(approvedPapers[index]?.paperfile || "", "_blank")}
                >
                    <FontAwesomeIcon className='' icon={["fas", "eye"]} />
                    view paper
                </button>

                <button
                    onClick={rejectPaper}
                    className='justify-center text-sm font-medium border bg-red-600 text-white hover:bg-red-500 h-9 rounded-md px-3 flex items-center gap-2 transition-all duration-200'>
                    <FontAwesomeIcon icon={["fas", "circle-xmark"]} />
                    Reject
                </button>
            </div>
        </div>
    )
}

export default ApprovedPaper
