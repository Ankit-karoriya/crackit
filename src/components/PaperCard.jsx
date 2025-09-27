import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

function PaperCard({examName, numberofDownloads, paperName, subject, university, year, subjectCode, faculty}) {
    return (
        <>
            <div className='rounded-lg shadow-sm hover:shadow-xl transition-all duration-300 border border-gray-100 bg-white/80 hover:bg-white/95 max-w-80 p-5'>
            <div>
                <div className='flex justify-between items-start mb-2'>
                    <div className='inline-flex items-center rounded-full px-2.5 py-0.5 transition-colors focus:outline-none hover:bg-primary/80 bg-amber-100 text-amber-800 border-amber-200 border text-xs font-medium'>{examName}</div>
                    <div className='flex items-center text-xs text-slate-500'>
                        <FontAwesomeIcon icon={["fas", "download"]} />
                        {numberofDownloads}
                    </div>
                </div>
                <h3 className='font-bold text-slate-900group-hover:text-slate-700 '>{paperName}</h3>
                <p className='text-sm text-slate-600 font-medium'>{subject}</p>
            </div>
            <div className='pt-3 flex flex-col gap-3'>
                <div className='flex items-center text-sm text-slate-600'>
                    <span>🎓︎</span>
                    <span>{university}</span>
                </div>
                <div className='flex justify-between'>
                    <div className='flex items-center text-sm text-slate-600'>
                        <FontAwesomeIcon icon={["fas", "calendar"]} />
                        <span>{year}</span>
                    </div>
                    <div className='p-1 border border-gray-300 rounded-full text-xs font-semibold'>{subjectCode}</div>
                </div>
                <div className='flex items-center text-sm text-slate-600'>
                    <FontAwesomeIcon icon={["fas", "user"]} />
                    <span>{faculty}</span>
                </div>
                <button className='bg-slate-800 hover:bg-slate-700 hover:text-gray-200 text-white flex flex-row justify-center gap-2 items-center rounded-lg p-2 transition-all duration-200'>
                    <FontAwesomeIcon icon={["fas", "download"]} />
                    <span>Download Paper</span>
                </button>
            </div>
            </div>
        </>
    )
}

export default PaperCard
