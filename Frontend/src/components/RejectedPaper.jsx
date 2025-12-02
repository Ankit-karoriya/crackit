import {useContext} from 'react'
import { RejectedPaperContext } from '../context/RejectedPapersContext'

function RejectedPaper({index}) {
    const {rejectedPapers} = useContext(RejectedPaperContext);
    return (
        <div className='flex justify-between px-5 bg-red-50 border-red-800 rounded-lg p-3'>
            <div>
                <h3>{rejectedPapers[index]?.papertitle || ""} - {rejectedPapers[index]?.examtype || ""}</h3>
                <p>{rejectedPapers[index]?.university || ""} • {rejectedPapers[index]?.subject || ""} • {rejectedPapers[index]?.examyear || ""}</p>
            </div>
            <div className='w-fit h-fit rounded-lg px-2 text-xs font-semibold bg-red-200 border-red-700 text-red-900'>Rejected</div>
        </div>
    )
}

export default RejectedPaper
