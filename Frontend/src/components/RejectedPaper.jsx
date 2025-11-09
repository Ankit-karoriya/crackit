import React from 'react'

function RejectedPaper() {
    return (
        <div className='flex justify-between px-5 bg-red-50 border-red-800 rounded-lg p-3'>
            <div>
                <h3>Advanced Data Structures Final Exam - Spring 2024</h3>
                <p>Stanford University • Advanced Data Structures and Algorithms • 2024</p>
            </div>
            <div className='w-fit h-fit rounded-lg px-2 text-xs font-semibold bg-red-200 border-red-700 text-red-900'>Rejected</div>
        </div>
    )
}

export default RejectedPaper
