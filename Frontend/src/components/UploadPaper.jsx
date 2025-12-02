import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import axios from 'axios';
import { useState, useContext } from 'react';
import {useNavigate} from 'react-router-dom';
import {AlertContext} from '../context/AlertContext.jsx';

function UploadPaper() {
  const navigate = useNavigate();
  const {setAlert} = useContext(AlertContext);

  const [paperTitle, setPaperTitle] = useState('');
  const [university, setUniversity] = useState('');
  const [courseName, setCourseName] = useState('');
  const [courseCode, setCourseCode] = useState('');
  const [professorName, setProfessorName] = useState('');
  const [tag, setTag] = useState('');
  const [examYear, setExamyear] = useState(2025);
  const [examType, setExamType] = useState('Midterm');
  const [file, setFile] = useState(null);
  const [isSubmitting , setIsSubmitting ] = useState(false);


  const handleSubmit = async (e) => {
    e.preventDefault();

    setIsSubmitting(true);

    const formData = new FormData();
    formData.append("paperfile", file);
    formData.append("papertitle", paperTitle);
    formData.append("subject", courseName);
    formData.append("university", university);
    formData.append("examyear", examYear);
    formData.append("examtype", examType);
    formData.append("professor", professorName);
    formData.append("subjectcode", courseCode);
    formData.append("tags", tag);

    try {
      const response = await axios.post('http://localhost:8000/api/paper/upload', formData, { headers: { "Content-Type": "multipart/form-data" }, withCredentials: true });

      setAlert({ status: 'success', message: response?.data?.message })
      setIsSubmitting(false);
    } catch (error) {
      console.log(error)
      setAlert({status: 'error', message: error.response?.data?.message});
      setIsSubmitting(false);
    }
  }

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
            <form onSubmit={handleSubmit} action="">

              {/* paper file input field */}
              <div>
                <label className='text-base font-medium text-slate-900' htmlFor="fileUpload">Upload File</label>
                <div className='rounded-lg shadow-sm border-2 border-dashed transition-all duration-200 border-slate-300 cursor-pointer mt-3' onClick={() => document.getElementById("fileUpload").click()}>
                  {
                    file ? <div className='p-4 flex justify-between'>{file.name} <button className='bg-blue-100
                     p-1 rounded-md' onClick={() => setFile(null)}>change File</button></div> : <div className='flex items-center justify-center p-8'>
                      <input
                        type="file"
                        className='hidden'
                        required
                        accept='.pdf,.png,.jpg,.jpeg'
                        id='fileUpload'
                        name='paperfile'
                        onChange={(e) => setFile(e.target.files[0])}
                      />
                      <div className='text-center'>
                        <div className='w-16 h-16 bg-blue-50 rounded-2xl mx-auto mb-4 flex items-center justify-center text-3xl'>
                          <FontAwesomeIcon icon={["fas", "arrow-up-from-bracket"]} />
                        </div>
                        <h3 className='font-semibold text-slate-900 mb-2 text-center'>Upload Exam Paper</h3>
                        <p className='text-slate-600 mb-4 text-center'>Drag and drop your file here, or click to browse</p>
                        <div className='inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold bg-blue-100 border-blue-800'>PDF, PNG, JPG supported</div>
                      </div>
                    </div>
                  }

                </div>
              </div>

              <div className='grid grid-cols-1 md:grid-cols-2 gap-6 mt-5'>
                {/* Paper title input field */}
                <div className='space-y-2'>
                  <label className='text-base font-medium text-slate-900' htmlFor="">Paper Title *</label>
                  <input
                    type="text"
                    required
                    name='papertitle'
                    className='flex h-10 w-full rounded-md border bg-background px-3 py-2 text-base md:text-sm border-slate-300 focus:border-slate-900' placeholder='e.g., Data Structures Final Exam 2024'
                    value={paperTitle}
                    onChange={(e) => setPaperTitle(e.target.value)}
                  />
                </div>

                {/* university name input field */}
                <div className='space-y-2'>
                  <label className='text-base font-medium text-slate-900' htmlFor="">College/University *</label>
                  <input
                    required
                    className='flex h-10 w-full rounded-md border bg-background px-3 py-2 text-base md:text-sm border-slate-300 focus:border-slate-900'
                    type="text"
                    name='university'
                    placeholder='e.g., MIT, Stanford University'
                    value={university}
                    onChange={(e) => setUniversity(e.target.value)}
                  />
                </div>

                {/* course name input field */}
                <div className='space-y-2'>
                  <label className='text-base font-medium text-slate-900' htmlFor="">Course Name *</label>
                  <input
                    required
                    className='flex h-10 w-full rounded-md border bg-background px-3 py-2 text-base md:text-sm border-slate-300 focus:border-slate-900'
                    type="text"
                    name='subject'
                    placeholder='e.g., Data Structures and Algorithms'
                    value={courseName}
                    onChange={(e) => setCourseName(e.target.value)}
                  />
                </div>

                {/* course code input field */}
                <div className='space-y-2'>
                  <label className='text-base font-medium text-slate-900' htmlFor="">Course Code</label>
                  <input
                    className='flex h-10 w-full rounded-md border bg-background px-3 py-2 text-base md:text-sm border-slate-300 focus:border-slate-900'
                    type="text"
                    name='subjectcode'
                    placeholder='e.g., CS101, MATH201'
                    value={courseCode}
                    onChange={(e) => setCourseCode(e.target.value)}
                  />
                </div>
              </div>

              {/* exam year input field */}
              <div className='flex justify-between gap-6 mt-5'>
                <div className='w-full space-y-2'>
                  <label className='w-full text-base font-medium text-slate-900' htmlFor="">Exam Year *</label>
                  <select
                    required
                    className='flex h-10 w-full items-center justify-between rounded-md border bg-background px-3 py-2 text-sm border-slate-300 focus:border-slate-900' name="examyear"
                    value={examYear}
                    onChange={(e) => setExamyear(e.target.value)}
                  >
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

                {/* exam type input field */}
                <div className='w-full space-y-2'>
                  <label className=' text-base font-medium text-slate-900' htmlFor="">Exam Type *</label>
                  <select
                    required
                    className='flex h-10 w-full items-center justify-between rounded-md border bg-background px-3 py-2 text-sm border-slate-300 focus:border-slate-900' name="examtype"
                    value={examType}
                    onChange={(e) => setExamType(e.target.value)}
                  >
                    <option value="Midterm">Midterm</option>
                    <option value="Final">Final</option>
                    <option value="Quiz">Quiz</option>
                    <option value="Assignment">Assignment</option>
                    <option value="Practice">Practice</option>
                  </select>
                </div>
              </div>

              {/* Professor name input field */}
              <div className='grid grid-cols-1 md:grid-cols-2 gap-6 mt-5'>
                <div className='space-y-2'>
                  <label className='text-base font-medium text-slate-900' htmlFor="">Professor Name</label>
                  <input
                    className='flex h-10 w-full rounded-md border bg-background px-3 py-2 text-base md:text-sm border-slate-300 focus:border-slate-900'
                    type="text"
                    name='professor'
                    placeholder='e.g., Dr. John Smith'
                    value={professorName}
                    onChange={(e) => setProfessorName(e.target.value)}
                  />
                </div>

                {/* tags input field */}
                <div className='space-y-2'>
                  <label className='text-base font-medium text-slate-900' htmlFor="">Tags (comma-separated)</label>
                  <input
                    className='flex h-10 w-full rounded-md border bg-background px-3 py-2 text-base md:text-sm border-slate-300 focus:border-slate-900'
                    type="text"
                    name='tags'
                    placeholder='e.g., algorithm, programming, data structures'
                    value={tag}
                    onChange={(e) => setTag(e.target.value)}
                  />
                </div>
              </div>

              {/* button */}
              <div className='w-full p-5 mt-5 flex justify-end'>
                <button 
                type='submit' 
                className={`bg-slate-800 text-white w-fit p-3 rounded-lg flex gap-3 items-center ${isSubmitting ? "bg-slate-600 cursor-not-allowed" : ""}`}>
                  <FontAwesomeIcon icon={["fas", "arrow-up-from-bracket"]} />
                  <p>Submit for Review</p>
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  )
}

export default UploadPaper
