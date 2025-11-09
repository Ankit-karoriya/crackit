import React from 'react'

function ApprovedPaper() {
    return (
        <div className='flex justify-between px-5 bg-green-50 border-green-800 rounded-lg p-3'>
            <div>
                <h3>Advanced Data Structures Final Exam - Spring 2024</h3>
                <p>Stanford University • Advanced Data Structures and Algorithms • 2024</p>
            </div>
            <div className='w-fit h-fit rounded-lg px-2 text-xs font-semibold bg-green-200 border-green-700 text-green-900'>Approved</div>
        </div>
    )
}

export default ApprovedPaper
