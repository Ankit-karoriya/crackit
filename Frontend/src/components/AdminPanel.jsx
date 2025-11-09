import { useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'


function AdminPanel() {
  const [viewPaper, setViewPaper] = useState('pending');

  return (
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
        <div className='py-1 px-2 w-fit h-fit text-xs font-semibold border border-green-800 bg-green-50 rounded-2xl text-green-700'>BTCS24O1062 ISHWAR PATEL - Admin</div>
      </div>

      {/* exam paper details */}
      <div className='grid grid-cols-2 lg:grid-cols-4 gap-5 mt-10 mb-10'>
        <div className='rounded-lg border border-gray-300 p-5 bg-white/80 shadow-lg flex flex-row justify-between items-center'>
          <div>
            <p className='text-md font-sans font-semibold text-gray-600'>Pending Review</p>
            <p className='text-3xl font-bold'>1</p>
          </div>
          <FontAwesomeIcon className='p-2 md:p-4 md:text-3xl bg-orange-100 text-orange-500 rounded-lg' icon={["fas", "clock"]} />
        </div>
        <div className='rounded-lg border border-gray-300 p-5 bg-white/80 shadow-lg flex flex-row justify-between items-center'>
          <div>
            <p className='text-md font-sans font-semibold text-gray-600'>Approved</p>
            <p className='text-3xl font-bold'>5</p>
          </div>
          <FontAwesomeIcon className='p-2 md:p-4 md:text-3xl bg-green-100 text-green-600 rounded-lg' icon={["fas", "circle-check"]} />
        </div>
        <div className='rounded-lg border border-gray-300 p-5 bg-white/80 shadow-lg flex flex-row justify-between items-center'>
          <div>
            <p className='text-md font-sans font-semibold text-gray-600'>Rejected</p>
            <p className='text-3xl font-bold'>0</p>
          </div>
          <FontAwesomeIcon className='p-2 md:p-4 md:text-3xl bg-red-100 text-red-600 rounded-lg' icon={["fas", "circle-xmark"]} />
        </div>
        <div className='rounded-lg border border-gray-300 p-5 bg-white/80 shadow-lg flex flex-row justify-between items-center'>
          <div>
            <p className='text-md font-sans font-semibold text-gray-600'>Total Downloads</p>
            <p className='text-3xl font-bold'>918</p>
          </div>
          <FontAwesomeIcon className='p-2 md:p-4 md:text-3xl bg-blue-100 text-blue-600 rounded-lg' icon={["fas", "download"]} />
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
            className={`md:px-10 cursor-pointer p-2 bg-slate-100 rounded-lg ${viewPaper=='pending' ? "bg-white rounded-lg text-yellow-700" : ""}`}
            onClick={() => setViewPaper('pending')}
          >
            <FontAwesomeIcon icon={["fas", "clock"]} />Pending(1)</button>

          <button
            className={`md:px-10 cursor-pointer p-2 bg-slate-100 rounded-lg ${viewPaper=='approved' ? "bg-white rounded-lg text-green-600" : ""}`}
            onClick={() => setViewPaper('approved')}
          ><FontAwesomeIcon icon={["fas", "circle-check"]} />Approved(5)</button>

          <button
            className={`md:px-10 cursor-pointer p-2 bg-slate-100 rounded-lg ${viewPaper=='rejected' ? "bg-white rounded-lg text-red-600" : ""}`}
            onClick={() => setViewPaper('rejected')}
          ><FontAwesomeIcon icon={["fas", "circle-xmark"]} />Rejected(0)</button>
        </div>

        <div>
          {viewPaper}
        </div>

      </div>
    </div>
  )
}

export default AdminPanel
