import { useState, useContext, useEffect } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { PendingPaperContext } from '../context/PendingPapersContext.jsx';
import { ApprovedPaperContext } from '../context/ApprovedPapersContext.jsx';
import { RejectedPaperContext } from '../context/RejectedPapersContext.jsx';
import axios from 'axios';
import PendingPaper from './PendingPaper.jsx';
import { AuthContext } from '../context/AuthContext.jsx';
import ApprovedPaper from './ApprovedPaper.jsx';
import RejectedPaper from './RejectedPaper.jsx';
import { AlertContext } from '../context/AlertContext.jsx';
const BASE_URL = import.meta.env.VITE_API_BASE_URL;


function AdminPanel() {
  const { user } = useContext(AuthContext);
  const { setAlert } = useContext(AlertContext)
  const { pendingPapers, setPendingPapers } = useContext(PendingPaperContext);
  const { approvedPapers, setApprovedPapers } = useContext(ApprovedPaperContext);
  const { rejectedPapers, setRejectedPapers } = useContext(RejectedPaperContext);

  const [viewPaper, setViewPaper] = useState('pending');
  const [password, setPassword] = useState('');
  const [isAdmin, setIsAdmin] = useState(false);

  const handleAdminLogin = async () => {
    try {
      const res = await axios.post(`${BASE_URL}/api/users/admin-login`, { password: password }, { withCredentials: true });
      setIsAdmin(true);
      setAlert({ status: 'success', message: res.data.message });
    } catch (error) {
      setIsAdmin(false);
      setAlert({ status: 'error', message: error.response.data.message })
    }
  }

  useEffect(() => {
    const verifyAdmin = async () => {
      try {
        const res = await axios.get(
          `${BASE_URL}/api/users/check-admin`,
          { withCredentials: true }
        );
        setIsAdmin(true);
      } catch (err) {
        setIsAdmin(false);
      }
    };

    verifyAdmin();
  }, []);

  useEffect(() => {
    const pendingPaperData = async () => {
      try {
        const res = await axios.get(`${BASE_URL}/api/paper/pending-papers`, { withCredentials: true });
        setPendingPapers(res.data.data);
      } catch (error) {
        console.error(error);
      }
    }

    pendingPaperData();
  }, [])

  useEffect(() => {
    const approvedPaperData = async () => {
      try {
        const res = await axios.get(`${BASE_URL}/api/paper/approved-papers`, { withCredentials: true });
        setApprovedPapers(res.data.data);
      } catch (error) {
        console.error(error);
      }
    }

    approvedPaperData();
  }, [])

  useEffect(() => {
    const rejectedPaperData = async () => {
      try {
        const res = await axios.get(`${BASE_URL}/api/paper/rejected-papers`, { withCredentials: true });
        setRejectedPapers(res.data.data);
      } catch (error) {
        console.error(error);
      }
    }

    rejectedPaperData();
  }, [])

  return (
    <>
      {!isAdmin ?
        <div className='w-full h-full p-16 flex flex-col gap-3 justify-center items-center'>
          <FontAwesomeIcon className='text-9xl text-orange-400' icon={["fas", "key"]} />
          <p className='text-xl'>Enter the password to work as admin</p>
          <input type="password" className='p-3 outline-none border border-amber-300 rounded-xl' placeholder='Enter password' onChange={(e) => setPassword(e.target.value)} />
          <button onClick={handleAdminLogin} className='bg-slate-500 p-2 rounded-lg text-white cursor-pointer'>Become Admin</button>
        </div>
        :

        <div className='mt-10 px-5 md:px-14'>

          {/* Admin dashbord */}
          <div className='flex flex-col md:flex-row justify-between gap-3'>
            <div className='flex flex-col gap-3'>
              <div className='flex gap-3'>
                <FontAwesomeIcon icon={["fas", "shield"]} className='p-3 text-xl bg-gradient-to-br from-amber-400 to-amber-600 text-white rounded-xl' />
                <div className='text-3xl font-bold'>Admin Dashboard</div>
              </div>
              <div className='text-md text-gray-600'>Manage and moderate exam paper submissions</div>
            </div>
            <div className='py-1 px-2 w-fit h-fit text-xs font-semibold border border-green-800 bg-green-50 rounded-2xl text-green-700'>{user?.fullname?.toUpperCase() || ""} - Admin</div>
          </div>

          {/* exam paper details */}
          <div className='grid grid-cols-2 lg:grid-cols-4 gap-5 mt-10 mb-10'>
            <div className='rounded-lg border border-gray-300 p-5 bg-white/80 shadow-lg flex flex-row justify-between items-center'>
              <div>
                <p className='text-md font-sans font-semibold text-gray-600'>Pending Review</p>
                <p className='text-3xl font-bold'>{pendingPapers?.length || 0}</p>
              </div>
              <FontAwesomeIcon className='p-2 md:p-4 md:text-3xl bg-orange-100 text-orange-500 rounded-lg' icon={["fas", "clock"]} />
            </div>
            <div className='rounded-lg border border-gray-300 p-5 bg-white/80 shadow-lg flex flex-row justify-between items-center'>
              <div>
                <p className='text-md font-sans font-semibold text-gray-600'>Approved</p>
                <p className='text-3xl font-bold'>{approvedPapers?.length || 0}</p>
              </div>
              <FontAwesomeIcon className='p-2 md:p-4 md:text-3xl bg-green-100 text-green-600 rounded-lg' icon={["fas", "circle-check"]} />
            </div>
            <div className='rounded-lg border border-gray-300 p-5 bg-white/80 shadow-lg flex flex-row justify-between items-center'>
              <div>
                <p className='text-md font-sans font-semibold text-gray-600'>Rejected</p>
                <p className='text-3xl font-bold'>{rejectedPapers?.length || 0}</p>
              </div>
              <FontAwesomeIcon className='p-2 md:p-4 md:text-3xl bg-red-100 text-red-600 rounded-lg' icon={["fas", "circle-xmark"]} />
            </div>

          </div>

          {/* paper managment */}
          <div className='mt-7 mb-7 flex flex-col shadow-lg rounded-lg p-6'>
            <h3 className='flex gap-3 justify-center items-center'>
              <FontAwesomeIcon className='text-lg' icon={["fas", "file"]} />
              <span className='text-2xl font-semibold'>Paper Management</span>
            </h3>
            <div className='bg-gray-200 p-1 px-7 py-2 mt-3 rounded-lg gap-3 mb-7 w-fit space-x-3'>
              <button
                className={`md:px-10 cursor-pointer p-2 bg-slate-100 rounded-lg ${viewPaper == 'pending' ? "bg-white rounded-lg text-yellow-700" : ""}`}
                onClick={() => setViewPaper('pending')}
              >
                <FontAwesomeIcon icon={["fas", "clock"]} />Pending({pendingPapers?.length || 0})</button>

              <button
                className={`md:px-10 cursor-pointer p-2 bg-slate-100 rounded-lg ${viewPaper == 'approved' ? "bg-white rounded-lg text-green-600" : ""}`}
                onClick={() => setViewPaper('approved')}
              ><FontAwesomeIcon icon={["fas", "circle-check"]} />Approved({approvedPapers?.length || 0})</button>

              <button
                className={`md:px-10 cursor-pointer p-2 bg-slate-100 rounded-lg ${viewPaper == 'rejected' ? "bg-white rounded-lg text-red-600" : ""}`}
                onClick={() => setViewPaper('rejected')}
              ><FontAwesomeIcon icon={["fas", "circle-xmark"]} />Rejected({rejectedPapers?.length || 0})</button>
            </div>

            <div className='grid grid-cols-1 md:grid-cols-2 gap-3'>
              {
                viewPaper === "pending" && (pendingPapers?.length ? pendingPapers.map((_, index) => <PendingPaper index={index} key={index} />) : <p>No pending papers</p>)
              }
              {
                viewPaper === "approved" && (approvedPapers?.length ? approvedPapers.map((_, index) => <ApprovedPaper index={index} key={index} />) : <p>No Approved papers</p>)
              }
              {
                viewPaper === "rejected" && (rejectedPapers?.length ? rejectedPapers.map((_, index) => <RejectedPaper index={index} key={index} />) : <p>No rejected papers</p>)
              }
            </div>

          </div>
        </div>
      }
    </>
  )
}

export default AdminPanel
