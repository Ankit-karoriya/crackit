import { useState, useEffect } from 'react'
import PaperCard from './UserUploadedPaperCard.jsx'
import axios from 'axios';
const BASE_URL = import.meta.env.VITE_API_BASE_URL;

function UserUploadedPapers() {

  const [papers, setPapers] = useState([]);

  useEffect(() => {
    const getallpapers = async () => {
      try {
        const res = await axios.get(`${BASE_URL}/api/users/uploaded-papers`, { withCredentials: true });
        setPapers(res.data.papers);
      } catch (error) {
        console.error(error);
      }
    };
    getallpapers();
  }, [])

  const handleDelete = (paperId) => {
    setPapers(prev => prev.filter(paper => paper._id !== paperId));
  }

  return (
    <div className='p-5 md:px-14'>
      <h2 className='text-3xl font-bold mb-2'>User Uploaded papers</h2>
      <ul className='flex gap-3 flex-wrap'>
        {
          papers.length > 0 ? (
            papers.map((paper) => (
              <PaperCard key={paper._id} paperId={paper._id} paperName={paper.papertitle} status={paper.status} subject={paper?.subject} examName={paper?.examtype} year={paper?.examyear} faculty={paper?.professor} submittedAt={paper?.createdAt} paperFile={paper.paperfile} onDelete={handleDelete} numberofDownloads={paper?.downloads}/>
            ))
          ) : (
            <p className='text-gray-600'>No papers uploaded yet.</p>
          )
        }
      </ul>
    </div>
  )
}

export default UserUploadedPapers
