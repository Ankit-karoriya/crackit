import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import axios from 'axios'
const BASE_URL = import.meta.env.VITE_API_BASE_URL;

function PaperCard({paperId, paperFile, examName, numberofDownloads, paperName, subject, university, year, subjectCode, faculty, viewOrDownload, viewOrDownloadSymbol}) {
    const handelDownload = async () => {
    if (viewOrDownloadSymbol === "eye") {
        window.open(paperFile, "_blank");
        return;
    }

    try {
        await axios.post(
            `${BASE_URL}/api/paper/download/${paperId}`,
            {},
            { withCredentials: true }
        );

        const downloadUrl = paperFile.replace("/upload/", "/upload/fl_attachment/");
        window.open(downloadUrl);

    } catch (error) {
        console.error(error);
    }
};
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
                    {subjectCode && <div className='p-1 border border-gray-300 rounded-full text-xs font-semibold'>{subjectCode}</div>}
                </div>
                <div className='flex items-center text-sm text-slate-600'>
                    <FontAwesomeIcon icon={["fas", "user"]} />
                    <span>{faculty}</span>
                </div>
                <a onClick={handelDownload} className='bg-slate-800 hover:bg-slate-700 hover:text-gray-200 text-white flex flex-row justify-center gap-2 items-center rounded-lg p-2 transition-all duration-200 cursor-pointer'>
                    <FontAwesomeIcon icon={["fas", `${viewOrDownloadSymbol}`]} />
                    <span>{viewOrDownload}</span>
                </a>
            </div>
            </div>
        </>
    )
}

export default PaperCard
