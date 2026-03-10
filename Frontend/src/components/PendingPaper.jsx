import { useContext } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { PendingPaperContext } from '../context/PendingPapersContext.jsx'
import axios from 'axios';
import { AlertContext } from '../context/AlertContext.jsx';
const BASE_URL = import.meta.env.VITE_API_BASE_URL;

function PendingPaper({ index }) {
  const { pendingPapers, setPendingPapers } = useContext(PendingPaperContext);
  const { setAlert } = useContext(AlertContext);

  const approvePaper = async () => {
    try {
      const confirmation = window.confirm(`Are you sure you want to approve ${pendingPapers[index]?.papertitle || "this"} paper? This action cannot be undone.`);
      if (!confirmation) return;

      const res = await axios.post(`${BASE_URL}/api/paper/approve-paper/${pendingPapers[index]?._id}`, {}, { withCredentials: true });
      setAlert({ status: "success", message: res.data.message || "" });
      setPendingPapers(prev => prev.filter((_, i) => i !== index));
    } catch (error) {
      console.error(error);
    }
  }

  const rejectPaper = async () => {
    try {
      const confirmation = window.confirm(`Are you sure you want to reject ${pendingPapers[index]?.papertitle || "this"} paper? This action cannot be undone.`);
      if (!confirmation) return;

      const res = await axios.post(`${BASE_URL}/api/paper/reject-paper/${pendingPapers[index]?._id}`, {}, { withCredentials: true });
      setAlert({ status: "success", message: res.data.message || "" });
      setPendingPapers(prev => prev.filter((_, i) => i !== index));
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <div className='p-6 border border-orange-600 w-full rounded-lg bg-yellow-50'>
      <div className='flex justify-between'>
        <div>
          <h3 className='font-bold text-slate-900 text-lg mb-2'>{pendingPapers[index]?.papertitle || ""}</h3>
          <div className='grid grid-cols-1 sm:grid-cols-2 gap-3 text-sm text-slate-600'>
            <div className='flex items-center'>
              <FontAwesomeIcon icon={["fas", "user"]} />
              <span>{pendingPapers[index]?.university || ""}</span>
            </div>
            <div className='flex items-center'>
              <FontAwesomeIcon className='' icon={["fas", "calendar-days"]} />
              <span>{pendingPapers[index]?.examtype || ""} {pendingPapers[index]?.examyear || ""}</span>
            </div>
            <div><span className='font-medium'>Course: </span>{pendingPapers[index]?.subject || ""}</div>
            <div><span className='font-medium'>Type: </span>{pendingPapers[index]?.examtype || ""}</div>
          </div>
          <p className='text-sm text-slate-600 mt-2'><span className='font-medium'>Professor: </span>{pendingPapers[index]?.professor || ""}</p>
          <p className='text-xs text-slate-500 mt-3'>Submitted by {pendingPapers[index]?.uploader?.fullname || ""} as {pendingPapers[index]?.uploader?.email || ""} on {new Date(pendingPapers[index]?.createdAt || "")?.toLocaleString()}</p>
        </div>

        <div className='inline-flex w-fit h-fit items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold hover:bg-primary/80 bg-amber-100 text-amber-800 border-amber-200'>Pending Review</div>
      </div>

      {/* buttons */}
      <div className='flex flex-wrap gap-3 mt-3'>
        <button
          className='justify-center text-sm font-medium border bg-background hover:bg-gray-200 h-9 rounded-md px-3 flex items-center gap-2 transition-all duration-200'
          onClick={() => window.open(pendingPapers[index]?.paperfile || "", "_blank")}
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

        <button onClick={rejectPaper} className='justify-center text-sm font-medium border bg-red-600 text-white hover:bg-red-500 h-9 rounded-md px-3 flex items-center gap-2 transition-all duration-200'><FontAwesomeIcon icon={["fas", "circle-xmark"]} />Reject</button>
      </div>
    </div>
  )
}

export default PendingPaper;
