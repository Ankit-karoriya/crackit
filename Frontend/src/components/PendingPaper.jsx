import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

function PendingPaper() {
  return (
    <div className='p-6 border border-orange-600 w-full rounded-lg bg-yellow-50'>
      <div className='flex justify-between'>
        <div>
            <h3 className='font-bold text-slate-900 text-lg mb-2'>Computer Networks Assignment 4</h3>
            <div className='grid grid-cols-1 sm:grid-cols-2 gap-3 text-sm text-slate-600'>
                <div className='flex items-center'>
                    <FontAwesomeIcon icon={["fas", "user"]} />
                    <span>Georgia Tech</span>
                </div>
                <div className='flex items-center'>
                    <FontAwesomeIcon className='' icon={["fas", "calendar-days"]} />
                    <span>Spring 2024</span>
                </div>
                <div><span className='font-medium'>Course:</span>Computer Networks</div>
                <div><span className='font-medium'>Type:</span>Assignment</div>
            </div>
            <p className='text-sm text-slate-600 mt-2'><span className='font-medium'>Professor:</span> Prof. Robert Kim</p>
            <p className='text-xs text-slate-500 mt-3'>Submitted by 24cs10is62@mitsgwl.ac.in on Aug 19, 2025 at 5:24 PM</p>
        </div>

        <div className='inline-flex w-fit h-fit items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold hover:bg-primary/80 bg-amber-100 text-amber-800 border-amber-200'>Pending Review</div>
      </div>

      {/* buttons */}
      <div className='flex gap-3 mt-3'>
        <button className='justify-center text-sm font-medium border bg-background hover:bg-gray-200 h-9 rounded-md px-3 flex items-center gap-2 transition-all duration-200'><FontAwesomeIcon className='' icon={["fas", "eye"]} />view paper</button>

        <button className='justify-center text-sm font-medium border bg-green-600 text-white hover:bg-green-500 h-9 rounded-md px-3 flex items-center gap-2 transition-all duration-200'><FontAwesomeIcon icon={["fas", "circle-check"]} />Approve</button>

        <button className='justify-center text-sm font-medium border bg-red-600 text-white hover:bg-red-500 h-9 rounded-md px-3 flex items-center gap-2 transition-all duration-200'><FontAwesomeIcon icon={["fas", "circle-xmark"]} />Reject</button>
      </div>
    </div>
  )
}

export default PendingPaper;
