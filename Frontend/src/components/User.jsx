import { useContext, useEffect, useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { Link, } from 'react-router-dom'
import { userDataContext } from '../context/userData.jsx'
import axios from 'axios';
const BASE_URL = import.meta.env.VITE_API_BASE_URL;

function User() {
  const {userData, setUserData} = useContext(userDataContext);

  const [edit, setEdit] = useState(false);
  const [editedDetails, setEditedDetails] = useState({});

  useEffect(() => {
    // Fetch user data from api and set in context
    if(userData) return;

    const fetchUserData = async () => {
    try {
      const res = await axios.get(`${BASE_URL}/api/users/me`, {withCredentials: true});
      setUserData(res.data);
    } catch (error) {
      console.error(error);
    }
  }
  fetchUserData();
  }, [])

  const handleEditProfile = async () => {
    try {
      const res = await axios.put(`${BASE_URL}/api/users/edit-profile`, editedDetails, {withCredentials: true});
      setUserData({...userData, ...res.data.data});
      setEdit(false);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    // User Dashbord
    <div className='p-5 md:px-14'>
      {/* Heading */}
      <div className='md:flex-row justify-between gap-3'>
        <div className="flex flex-col gap-3">
          <div className="flex gap-3">
            <FontAwesomeIcon icon={["fas", "shield"]} className='p-3 text-xl bg-gradient-to-br from-amber-400 to-amber-600 text-white rounded-xl' />
            <div className="text-3xl font-bold">User Dashboard</div>
          </div>
          <div className="text-md text-gray-600">Manage your uploaded or downloaded exam papers</div>
        </div>
      </div>

      {/* uploaded papers detail list */}
      <div className='grid grid-cols-2 lg:grid-cols-4 gap-5 mt-10 mb-10'>
        <div className='rounded-lg border border-gray-300 p-5 bg-white/80 shadow-lg flex flex-row justify-between items-center'>
          <div>
            <p className='text-md font-sans font-semibold text-gray-600'>Total papers uploaded</p>
            <p className='text-3xl font-bold'>{userData?.user?.totalUploadedPapers || 0}</p>
          </div>
          <FontAwesomeIcon className='p-2 md:p-4 md:text-3xl bg-blue-100 text-blue-500 rounded-lg' icon={["fas", "file"]} />
        </div>

        <div className='rounded-lg border border-gray-300 p-5 bg-white/80 shadow-lg flex flex-row justify-between items-center'>
          <div>
            <p className='text-md font-sans font-semibold text-gray-600'>Pending for review</p>
            <p className='text-3xl font-bold'>{userData?.user?.pendingPapers || 0}</p>
          </div>
          <FontAwesomeIcon className='p-2 md:p-4 md:text-3xl bg-orange-100 text-orange-500 rounded-lg' icon={["fas", "clock"]} />
        </div>

        <div className='rounded-lg border border-gray-300 p-5 bg-white/80 shadow-lg flex flex-row justify-between items-center'>
          <div>
            <p className='text-md font-sans font-semibold text-gray-600'>Approved papers</p>
            <p className='text-3xl font-bold'>{userData?.user?.approvedPapers || 0}</p>
          </div>
          <FontAwesomeIcon className='p-2 md:p-4 md:text-3xl bg-green-100 text-green-600 rounded-lg' icon={["fas", "circle-check"]} />
        </div>

        <div className='rounded-lg border border-gray-300 p-5 bg-white/80 shadow-lg flex flex-row justify-between items-center'>
          <div>
            <p className='text-md font-sans font-semibold text-gray-600'>Rejected papers</p>
            <p className='text-3xl font-bold'>{userData?.user?.rejectedPapers || 0}</p>
          </div>
          <FontAwesomeIcon className='p-2 md:p-4 md:text-3xl bg-red-100 text-red-600 rounded-lg' icon={["fas", "circle-xmark"]} />
        </div>
      </div>

      {/* Profile Card */}
      <div className="mx-auto p-6">
        <div className="bg-white shadow-md rounded-lg p-6 mb-6">
          <div className='flex justify-between'>
            <h2 className="text-2xl font-bold mb-4">User Profile</h2>
            <button onClick={() => setEdit(true)} className='py-1 px-2 w-fit h-fit text-xs font-semibold border border-green-800 bg-green-50 rounded-2xl text-green-700 cursor-pointer'>Edit profile</button>
          </div>
          

          <div className="space-y-2">
            <p>
              <span className="font-semibold">Full Name:</span>{" "}
              {
                edit ? (
                  <input type="text" className='border-b-2 border-gray-300 outline-none' placeholder={userData?.user?.fullname || ""} onChange={(e) => setEditedDetails({...editedDetails, fullname: e.target.value})} />
                ) : (userData?.user?.fullname || "Not available")
              }
              
            </p>

            <p>
              <span className="font-semibold">Email:</span>{" "}
              {userData?.user?.email || "Not available"}
            </p>

            <p>
              <span className="font-semibold">University:</span>{" "}
              {
                edit ? (
                  <input type="text" className='border-b-2 border-gray-300 outline-none' placeholder={userData?.user?.university || ""} onChange={(e) => setEditedDetails({...editedDetails, university: e.target.value})} />
                ) : (userData?.user?.university || "Not available")
              }
            </p>

            <p>
              <span className="font-semibold">Total Papers Downloaded:</span>{" "}
              {userData?.user?.totalDownloadedPapers || 0}
            </p>

            <p>
              <span className="font-semibold">Total Uploaded Papers:</span>{" "}
              {userData?.user?.totalUploadedPapers || 0}
            </p>
          </div>
        </div>

        {
          edit && (
            <div className='flex gap-3 justify-end'>
              <button className='py-1 px-3 text-sm font-semibold border border-gray-300 bg-gray-100 rounded-md' onClick={() => setEdit(false)}>Cancel</button>
              <button className='py-1 px-3 text-sm font-semibold border border-green-800 bg-green-50 rounded-md' onClick={() => handleEditProfile()}>Save</button>
            </div>
          )
        }
      </div>

      {/* uploaded or saved papers buttons */}
      <div className='mt-3 md:mt-5 flex flex-wrap justify-center gap-5'>
        <Link to='uploads' className='p-2 md:p-3 bg-blue-600 hover:bg-blue-400 text-white font-bold text-lg md:text-lg rounded-xl'>View uploaded papers</Link>
        <Link to='papers' className='p-2 md:p-3 bg-green-600 hover:bg-green-400 text-white font-bold text-lg md:text-lg rounded-xl'>view downloaded papers</Link>
      </div>
    </div>
  )
}

export default User
