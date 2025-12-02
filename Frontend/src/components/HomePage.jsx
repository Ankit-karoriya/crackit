import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import PaperCard from './PaperCard.jsx'
import { useContext, useEffect } from 'react'
import axios from 'axios';
import { useState } from 'react';
import { ApprovedPaperContext } from '../context/ApprovedPapersContext.jsx';

function HomePage() {
  const { approvedPapers, setApprovedPapers } = useContext(ApprovedPaperContext);

  const [mostDownloadedPapers, setMostDownloadedPapers] = useState([]);
  const [paperData, setPaperData] = useState({});
  const [filterPapers, setFilterPapers] = useState([]);

  useEffect(() => {
    const mostDownloadedPapersResponse = async () => {
      try {
        const res = await axios.get("http://localhost:8000/api/paper/most-downloaded-papers", { withCredentials: true });
        setMostDownloadedPapers(res.data.data);
      } catch (error) {
        console.log(error.response.data.message);
      }
    }
    mostDownloadedPapersResponse();
  }, [])

  useEffect(() => {
    const paperData = async () => {
      try {
        const res = await axios.get("http://localhost:8000/api/paper/papers-data", { withCredentials: true });
        setPaperData(res.data.data);
        setUniversityFilter(res.data.data?.universities?.[0]);
        setSubjectFilter(res.data.data?.subjects?.[0])
      } catch (error) {
        console.log(error);
      }
    }

    paperData();
  }, [])

  useEffect(() => {
    const approvedPaperData = async () => {
      try {
        const res = await axios.get("http://localhost:8000/api/paper/approved-papers", { withCredentials: true });
        setApprovedPapers(res.data.data);
      } catch (error) {
        console.log(error);
      }
    }

    approvedPaperData();
  }, [])

  const [universityFilter, setUniversityFilter] = useState("");
  const [examTypeFilter, setExamTypeFilter] = useState("Midterm");
  const [examYearFilter, setExamYearFilter] = useState(2025);
  const [subjectFilter, setSubjectFilter] = useState("");

  useEffect(() => {
    const applyFilter = async () => {
      try {
        const res = await axios.post("http://localhost:8000/api/paper/filter-papers", 
          {
            university: universityFilter,
            examType: examTypeFilter,
            examYear: examYearFilter,
            subject: subjectFilter
          }, 
          {withCredentials: true}
        )
        setFilterPapers(res.data.data);
      } catch (error) {
        console.log(error);
      }
    }
    applyFilter();
  }, [universityFilter, examTypeFilter, examYearFilter, subjectFilter])
  return (
    <div>

      {/* Dark Image */}
      <div className='bg-slate-900 py-14 text-center'>
        <h2 className='text-3xl px-5 md:text-5xl lg:text-6xl text-white font-bold'>Academic Excellence</h2>
        <h4 className='text-3xl md:text-5xl lg:text-6xl text-yellow-300 font-bold'>Made Accessible</h4>
        <p className='text-xl text-gray-300 m-5'>Discover exam papers, study materials, and academic resources shared by students from universities worldwide.</p>
        {/* <div className='flex max-w-screen-md mx-6 md:mx-auto bg-slate-800 p-2 rounded-xl border border-gray-600 items-center justify-start gap-3'>
          <FontAwesomeIcon className='text-gray-300' icon={["fas", "magnifying-glass"]} />
          <input className='bg-slate-800 w-full outline-none text-white' type="text" name="search" id="search" placeholder='Search by course, college, or professor...' />
        </div> */}
      </div>

      {/* Remaining part of the home */}
      <div className='m-10'>

        {/* grid boxes */}
        <div className='grid grid-cols-2 lg:grid-cols-4 gap-5 mb-10'>
          <div className='rounded-lg border border-gray-300 p-5 bg-white/80 shadow-lg flex flex-row justify-between items-center'>
            <div>
              <p className='text-md font-sans font-semibold text-gray-600'>Total Papers</p>
              <p className='text-3xl font-bold'>{approvedPapers?.length || ""}</p>
            </div>
            <FontAwesomeIcon className='p-2 md:p-4 md:text-3xl bg-blue-100 text-blue-600 rounded-lg' icon={["fas", "file"]} />
          </div>
          <div className='rounded-lg border border-gray-300 p-5 bg-white/80 shadow-lg flex flex-row justify-between items-center'>
            <div>
              <p className='text-md font-sans font-semibold text-gray-600'>Universities</p>
              <p className='text-3xl font-bold'>{paperData?.universities?.length || ""}</p>
            </div>
            <FontAwesomeIcon className='p-2 md:p-4 md:text-3xl bg-green-100 text-green-600 rounded-lg' icon={["fas", "building-columns"]} />
          </div>
          <div className='rounded-lg border border-gray-300 p-5 bg-white/80 shadow-lg flex flex-row justify-between items-center'>
            <div>
              <p className='text-md font-sans font-semibold text-gray-600'>Total Downloads</p>
              <p className='text-3xl font-bold'>{paperData?.downloads || ""}</p>
            </div>
            <FontAwesomeIcon className='p-2 md:p-4 md:text-3xl bg-purple-100 text-purple-600 rounded-lg' icon={["fas", "download"]} />
          </div>
          <div className='rounded-lg border border-gray-300 p-5 bg-white/80 shadow-lg flex flex-row justify-between items-center'>
            <div>
              <p className='text-md font-sans font-semibold text-gray-600'>Total Subjects</p>
              <p className='text-3xl font-bold'>{paperData?.subjects?.length || ""}</p>
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
          <div className='grid grid-cols-1 md:grid-cols-4 gap-6'>
            {
              mostDownloadedPapers?.map((value, index) => <PaperCard key={index} paperId={value._id} examName={value?.examtype || ""} paperFile={value?.paperfile} numberofDownloads={value?.downloads || ""} paperName={value?.papertitle || ""} subject={value?.subject || ""} university={value?.university || ""} year={value?.examyear || ""} subjectCode={value?.subjectcode || ""} faculty={value?.professor || ""} />)
            }
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
              <span className='text-sm font-sans text-gray-500 font-semibold'>College/University</span>
              <select onChange={(e) => setUniversityFilter(e.target.value)} className="w-48 min-w-fit px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500">
                {
                  paperData?.universities?.map((value, index) => <option key={index} value={value}>{value}</option>)
                }
              </select>
            </div>

            {/* Exam Type */}
            <div className="flex flex-col gap-2">
              <span className='w-48 text-sm font-sans text-gray-500 font-semibold'>Exam Type</span>
              <select onChange={(e) => setExamTypeFilter(e.target.value)} className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500">
                <option value="Midterm">Mid Term</option>
                <option value="Final">Final Exam</option>
                <option value="Quiz">Quiz</option>
                <option value="Practice">Practice</option>
                <option value="Backlog">Backlog</option>
              </select>
            </div>

            {/* Year */}
            <div className="flex flex-col gap-2">
              <span className='w-48 text-sm font-sans text-gray-500 font-semibold'>Year</span>
              <select onChange={(e) => setExamYearFilter(e.target.value)} className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500">
                <option value="2025">2025</option>
                <option value="2024">2024</option>
                <option value="2023">2023</option>
                <option value="2022">2022</option>
                <option value="2021">2021</option>
                <option value="2020">2020</option>
                <option value="2019">2019</option>
                <option value="2018">2018</option>
                <option value="2017">2017</option>
                <option value="2016">2016</option>
                <option value="2015">2015</option>
              </select>
            </div>

            {/* Subject */}
            <div className="flex flex-col gap-2">
              <span className='text-sm font-sans text-gray-500 font-semibold'>Subject</span>
              <select onChange={(e) => setSubjectFilter(e.target.value)} className="w-48 min-w-fit px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500">
                {
                  paperData?.subjects?.map((value, index) => <option key={index} value={value}>{value}</option>)
                }
              </select>
            </div>
          </div>

        </div>

        {/* All Papers */}
        <div className='mt-7'>
          <h2 className='text-2xl font-bold text-black mb-2'>Filtered Papers</h2>
          <p className='text-sm text-gray-500'>{filterPapers?.length} papers available</p>
          <div className='mt-5 flex gap-3 flex-wrap md:gap-7'>
            {
              filterPapers?.map((value, index) => <PaperCard key={index} paperId={value._id} examName={value?.examtype || ""} numberofDownloads={value?.downloads || ""} paperName={value?.papertitle || ""} paperFile={value?.paperfile} subject={value?.subject || ""} university={value?.university || ""} year={value?.examyear || ""} subjectCode={value?.subjectcode || ""} faculty={value.professor || ""}/>)
            }
          </div>
        </div>
      </div>

    </div>
  )
}

export default HomePage
