import {useContext} from 'react'
import { ApprovedPaperContext } from '../context/ApprovedPapersContext.jsx'

function ApprovedPaper({index}) {
    const {approvedPapers} = useContext(ApprovedPaperContext);
    return (
        <div className='flex justify-between px-5 bg-green-50 border-green-800 rounded-lg p-3'>
            <div>
                <h3>{approvedPapers[index]?.papertitle || ""} - {approvedPapers[index]?.examtype || ""}</h3>
                <p>{approvedPapers[index]?.university || ""} • {approvedPapers[index]?.subject || ""} • {approvedPapers[index]?.examyear || ""}</p>
            </div>
            <div className='w-fit h-fit rounded-lg px-2 text-xs font-semibold bg-green-200 border-green-700 text-green-900'>Approved</div>
        </div>
    )
}

export default ApprovedPaper
