import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import PaperCard from './PaperCard.jsx'

function HomePage() {
  return (
    <div>

      {/* Dark Image */}
      <div className='bg-slate-900 py-14 text-center'>
        <h2 className='text-3xl px-5 md:text-5xl lg:text-6xl text-white font-bold'>Academic Excellence</h2>
        <h4 className='text-3xl md:text-5xl lg:text-6xl text-yellow-300 font-bold'>Made Accessible</h4>
        <p className='text-xl text-gray-300 m-5'>Discover thousands of exam papers, study materials, and academic resources shared by students from top universities worldwide.</p>
        <div className='flex max-w-screen-md mx-6 md:mx-auto bg-slate-800 p-2 rounded-xl border border-gray-600 items-center justify-start gap-3'>
          <FontAwesomeIcon className='text-gray-300' icon={["fas", "magnifying-glass"]} />
          <input className='bg-slate-800 w-full outline-none text-white' type="text" name="search" id="search" placeholder='Search by course, college, or professor...' />
        </div>
      </div>

      {/* Remaining part of the home */}
      <div className='m-10'>

        {/* grid boxes */}
        <div className='grid grid-cols-2 lg:grid-cols-4 gap-5 mb-10'>
          <div className='rounded-lg border border-gray-300 p-5 bg-white/80 shadow-lg flex flex-row justify-between items-center'>
            <div>
              <p className='text-md font-sans font-semibold text-gray-600'>Total Papers</p>
              <p className='text-3xl font-bold'>5</p>
            </div>
            <FontAwesomeIcon className='p-2 md:p-4 md:text-3xl bg-blue-100 text-blue-600 rounded-lg' icon={["fas", "file"]} />
          </div>
          <div className='rounded-lg border border-gray-300 p-5 bg-white/80 shadow-lg flex flex-row justify-between items-center'>
            <div>
              <p className='text-md font-sans font-semibold text-gray-600'>Universities</p>
              <p className='text-3xl font-bold'>5</p>
            </div>
            <FontAwesomeIcon className='p-2 md:p-4 md:text-3xl bg-green-100 text-green-600 rounded-lg' icon={["fas", "building-columns"]} />
          </div>
          <div className='rounded-lg border border-gray-300 p-5 bg-white/80 shadow-lg flex flex-row justify-between items-center'>
            <div>
              <p className='text-md font-sans font-semibold text-gray-600'>Total Downloads</p>
              <p className='text-3xl font-bold'>918</p>
            </div>
            <FontAwesomeIcon className='p-2 md:p-4 md:text-3xl bg-purple-100 text-purple-600 rounded-lg' icon={["fas", "download"]} />
          </div>
          <div className='rounded-lg border border-gray-300 p-5 bg-white/80 shadow-lg flex flex-row justify-between items-center'>
            <div>
              <p className='text-md font-sans font-semibold text-gray-600'>This Month</p>
              <p className='text-3xl font-bold'>0</p>
            </div>
            <FontAwesomeIcon className='p-2 md:p-4 md:text-3xl bg-orange-100 text-orange-600 rounded-lg' icon={["fas", "arrow-trend-up"]} />
          </div>
        </div>

        {/*Featured Papers*/}
        <div className='mb-12'>
          <div className='flex items-center gap-3 mb-6'>
            <div className='w-8 h-8 bg-gradient-to-br from-amber-400 to-amber-600 rounded-lg flex items-center justify-center text-white'><FontAwesomeIcon icon={["far", "star"]} /></div>
            <h2 className='text-2xl font-bold text-slate-900'>Featured Papers</h2>
            <div className='inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 hover:bg-primary/80 bg-amber-100 text-amber-800 border-amber-200'>
              <FontAwesomeIcon icon={["fas", "arrow-trend-up"]} />
              Popular
            </div>
          </div>
          <div className='grid grid-cols-1 md:grid-cols-3 gap-6'>
            <PaperCard examName='Practice' numberofDownloads='324' paperName='Calculus II Midterm Practice Set' subject='Calculus II' university='Stanford University' year='Fall 2024' subjectCode='MATH21A' faculty='Dr. Jennifer Lopez' />

            <PaperCard examName='Final' numberofDownloads='247' paperName='Advanced Data Structures Final Exam - Spring 2024' subject='Advanced Data Structures and Algorithms' university='Harvard University' year='Spring 2024' subjectCode='CS146' faculty='Dr. Sarah Chen' />

            <PaperCard examName='Quiz' numberofDownloads='0' paperName='Database Systems Quiz 3 - Spring 2024' subject='Database Systems' university='UC Berkeley' year='Spring 2024' subjectCode='CS186' faculty='Dr. Lisa Wang' />
          </div>

        </div>

        {/* Filter Papers */}
        <div className='shadow-lg p-7 flex flex-col gap-4'>
          <div className='flex gap-3 items-center text-xl'>
            <FontAwesomeIcon icon={["fas", "filter"]} />
            Filter Papers
          </div>
          <div className="flex flex-wrap gap-8">
            {/* College */}
            <div className='flex flex-col gap-2'>
              <span className='text-sm font-sans text-gray-500 font-semibold'>College</span>
              <select className="w-48 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500">
              <option disabled value="">All colleges</option>
              <option value="college1">Harvard University</option>
              <option value="college2">Stanford University</option>
              <option value="college3">UC Berkeley</option>
              <option value="college3">MIT</option>
              <option value="college3">MITS</option>
            </select>
            </div>

            {/* Exam Type */}
            <div className="flex flex-col gap-2">
              <span className='w-48 text-sm font-sans text-gray-500 font-semibold'>Exam Type</span>
              <select className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500">
              <option disabled value="">Exam Type</option>
              <option value="midterm">Mid Term</option>
              <option value="final">Final Exam</option>
              <option value="final">Quiz</option>
              <option value="final">Practice</option>
              <option value="backlog">Backlog</option>
            </select>
            </div>

            {/* Year */}
            <div className="flex flex-col gap-2">
              <span className='w-48 text-sm font-sans text-gray-500 font-semibold'>Year</span>
              <select className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500">
              <option disabled value="">Year</option>
              <option value="2025">2025</option>
              <option value="2024">2024</option>
              <option value="2023">2023</option>
              <option value="2023">2022</option>
              <option value="2023">2021</option>
              <option value="2023">2020</option>
              <option value="2023">2019</option>
              <option value="2023">2018</option>
              <option value="2023">2017</option>
              <option value="2023">2016</option>
              <option value="2023">2015</option>
            </select>
            </div>

            {/* Semester */}
            <div className="flex flex-col gap-2">
              <span className='text-sm font-sans text-gray-500 font-semibold'>Semester</span>
              <select className="w-48 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500">
              <option disabled value="">Semester</option>
              <option value="1">1st Semester</option>
              <option value="2">2nd Semester</option>
              <option value="3">3rd Semester</option>
              <option value="4">4th Semester</option>
              <option value="5">5th Semester</option>
              <option value="6">6th Semester</option>
              <option value="7">7th Semester</option>
              <option value="8">8th Semester</option>
            </select>
            </div>
          </div>

        </div>
        
        {/* All Papers */}
        <div className='mt-7'>
          <h2 className='text-2xl font-bold text-black mb-2'>All Papers</h2>
          <p className='text-sm text-gray-500'>5 papers available</p>
          <div className='mt-5 flex gap-3 flex-wrap md:gap-7'>
            <PaperCard examName='Practice' numberofDownloads='324' paperName='Calculus II Midterm Practice Set' subject='Calculus II' university='Stanford University' year='Fall 2024' subjectCode='MATH21A' faculty='Dr. Jennifer Lopez' />

            <PaperCard examName='Final' numberofDownloads='247' paperName='Advanced Data Structures Final Exam - Spring 2024' subject='Advanced Data Structures and Algorithms' university='Harvard University' year='Spring 2024' subjectCode='CS146' faculty='Dr. Sarah Chen' />

            <PaperCard examName='Quiz' numberofDownloads='0' paperName='Database Systems Quiz 3 - Spring 2024' subject='Database Systems' university='UC Berkeley' year='Spring 2024' subjectCode='CS186' faculty='Dr. Lisa Wang' />

            <PaperCard examName='Final' numberofDownloads='157' paperName='Operating Systems Final - Winter 2024' subject='Operating Systems' university='Carnegie Mellon University' year='Winter 2024' subjectCode='15-213' faculty='Prof. David Miller' />

            <PaperCard examName='Midterm' numberofDownloads='190' paperName='Machine Learning Midterm - Fall 2023' subject='Introduction to Machine Learning' university='MIT' year='Fall 2023' subjectCode='6.034' faculty='Prof. Michael Zhang' />
          </div>
        </div>
      </div>

    </div>
  )
}

export default HomePage
