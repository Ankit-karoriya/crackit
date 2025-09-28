import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

function UploadPaper() {
  return (
    <div className='min-h-screen bg-gradient-to-br from-slate-50 to-white'>
      <div className='max-w-4xl mx-auto px-4 py-8'>
        <div className='text-center mb-12'>
          <h1 className='text-3xl sm:text-4xl font-bold text-slate-900 mb-4'>Share Your Knowledge</h1>
          <p className='text-lg text-slate-600 max-w-2xl mx-auto'>Upload exam papers to help fellow students succeed. All submissions are reviewed by our admin team to ensure quality and relevance.</p>
        </div>
        <div className='flex flex-col gap-3 shadow-xl rounded-lg'>
          <div className='flex flex-row items-center gap-3 p-6'>
            <FontAwesomeIcon className=' w-5 h-5' icon={["far", "file"]} />
            <h3 className='font-semibold text-xl text-slate-900'>Paper Details</h3>
          </div>
          <div className='p-6 pt-0'>
            <form action="">
              <div>
                <label className='text-base font-medium text-slate-900' htmlFor="fileUpload">Upload File</label>
                <div className='rounded-lg shadow-sm border-2 border-dashed transition-all duration-200 border-slate-300 cursor-pointer mt-3' onClick={() => document.getElementById("fileUpload").click()}>
                  <div className='flex items-center justify-center p-8'>
                    <input type="file" className='hidden' accept='.pdf,.png,.jpg,.jpeg' id='fileUpload' />
                    <div className='text-center'>
                      <div className='w-16 h-16 bg-slate-100 rounded-2xl mx-auto mb-4 flex items-center justify-center text-3xl'>
                        <FontAwesomeIcon icon={["fas", "arrow-up-from-bracket"]} />
                      </div>
                      <h3 className='font-semibold text-slate-900 mb-2 text-center'>Upload Exam Paper</h3>
                      <p className='text-slate-600 mb-4 text-center'>Drag and drop your file here, or click to browse</p>
                      <div className='inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold'>PDF, PNG, JPG supported</div>
                    </div>
                  </div>
                </div>
              </div>
              <div className='grid grid-cols-1 md:grid-cols-2 gap-6 mt-5'>
                <div className='space-y-2'>
                  <label className='text-base font-medium text-slate-900' htmlFor="">Paper Title *</label>
                  <input className='flex h-10 w-full rounded-md border bg-background px-3 py-2 text-base md:text-sm border-slate-300 focus:border-slate-900' type="text" placeholder='e.g., Data Structures Final Exam 2024' />
                </div>
                <div className='space-y-2'>
                  <label className='text-base font-medium text-slate-900' htmlFor="">College/University *</label>
                  <input className='flex h-10 w-full rounded-md border bg-background px-3 py-2 text-base md:text-sm border-slate-300 focus:border-slate-900' type="text" placeholder='e.g., MIT, Stanford University' />
                </div>
                <div className='space-y-2'>
                  <label className='text-base font-medium text-slate-900' htmlFor="">Course Name *</label>
                  <input className='flex h-10 w-full rounded-md border bg-background px-3 py-2 text-base md:text-sm border-slate-300 focus:border-slate-900' type="text" placeholder='e.g., Data Structures and Algorithms' />
                </div>
                <div className='space-y-2'>
                  <label className='text-base font-medium text-slate-900' htmlFor="">Course Code</label>
                  <input className='flex h-10 w-full rounded-md border bg-background px-3 py-2 text-base md:text-sm border-slate-300 focus:border-slate-900' type="text" placeholder='e.g., CS101, MATH201' />
                </div>
              </div>
              <div className='grid grid-cols-1 md:grid-cols-3 gap-6 mt-5'>
                <div className='space-y-2'>
                  <label className=' text-base font-medium text-slate-900' htmlFor="">Exam Year *</label>
                  <select className='flex h-10 w-full items-center justify-between rounded-md border bg-background px-3 py-2 text-sm border-slate-300 focus:border-slate-900' name="" id="">
                    <option value="2025">2025</option>
                    <option value="2024">2024</option>
                    <option value="2023">2023</option>
                    <option value="2022">2022</option>
                    <option value="2021">2021</option>
                    <option value="2020">2020</option>
                    <option value="2019">2019</option>
                    <option value="2018">2018</option>
                  </select>
                </div>

                <div className='space-y-2'>
                  <label className=' text-base font-medium text-slate-900' htmlFor="">Semester *</label>
                  <select className='flex h-10 w-full items-center justify-between rounded-md border bg-background px-3 py-2 text-sm border-slate-300 focus:border-slate-900' name="" id="">
                    <option value="2025">Semester 1</option>
                    <option value="2024">Semester 2</option>
                    <option value="2023">Semester 3</option>
                    <option value="2022">Semester 4</option>
                    <option value="2021">Semester 5</option>
                    <option value="2020">Semester 6</option>
                    <option value="2019">Semester 7</option>
                    <option value="2018">Semester 8</option>
                  </select>
                </div>

                <div className='space-y-2'>
                  <label className=' text-base font-medium text-slate-900' htmlFor="">Exam Type *</label>
                  <select className='flex h-10 w-full items-center justify-between rounded-md border bg-background px-3 py-2 text-sm border-slate-300 focus:border-slate-900' name="" id="">
                    <option value="Midterm">Midterm</option>
                    <option value="Final">Final</option>
                    <option value="Quiz">Quiz</option>
                    <option value="Assignment">Assignment</option>
                    <option value="Practice">Practice</option>
                  </select>

                </div>
              </div>
              <div className='grid grid-cols-1 md:grid-cols-2 gap-6 mt-5'>
                <div className='space-y-2'>
                  <label className='text-base font-medium text-slate-900' htmlFor="">Professor Name</label>
                  <input className='flex h-10 w-full rounded-md border bg-background px-3 py-2 text-base md:text-sm border-slate-300 focus:border-slate-900' type="text" placeholder='e.g., Dr. John Smith' />
                </div>

                <div className='space-y-2'>
                  <label className='text-base font-medium text-slate-900' htmlFor="">Tags (comma-separated)</label>
                  <input className='flex h-10 w-full rounded-md border bg-background px-3 py-2 text-base md:text-sm border-slate-300 focus:border-slate-900' type="text" placeholder='e.g., algorithm, programming, data structures' />
                </div>
              </div>
              <div className='w-full p-5 mt-5 flex justify-end'>
                <div className='bg-slate-800 text-white w-fit p-3 rounded-lg flex gap-3 items-center'>
                  <FontAwesomeIcon icon={["fas", "arrow-up-from-bracket"]} />
                  <button>Submit for Review</button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  )
}

export default UploadPaper
