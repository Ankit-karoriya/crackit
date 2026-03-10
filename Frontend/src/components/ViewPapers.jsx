import {useState, useEffect} from 'react'
import axios from 'axios'
import PaperCard from './PaperCard.jsx'
const BASE_URL = import.meta.env.VITE_API_BASE_URL;

function ViewPapers() {
  const [papers, setPapers] = useState([]);

  useEffect(() => {
    const fetchDownloadedPapers = async () => {
      try {
        const response = await axios.get(`${BASE_URL}/api/users/downloaded-papers`, {
          withCredentials: true
        });
        setPapers(response.data.papers);
      } catch (error) {
        console.error(error);
      }
    };

    fetchDownloadedPapers();
  }, []);

  return (
    <div className='p-5 md:px-14'>
      <h2 className='text-3xl font-bold mb-2'>Downloaded Papers</h2>
      <ul className='flex gap-3 flex-wrap'>
        {
          papers.length > 0 ? (
            papers.map((paper) => (
              <PaperCard key={paper._id} paperId={paper._id} paperFile={paper?.paperfile} examName={paper?.examtype} numberofDownloads={paper?.downloads} paperName={paper?.papertitle} subject={paper?.subject} university={paper?.university} year={paper?.examyear} subjectCode={paper?.subjectcode} faculty={paper?.professor} viewOrDownload="View Paper" viewOrDownloadSymbol="eye"/>
            ))
          ) : (
            <p className='text-gray-600'>No downloaded papers found.</p>
          )
        }
      </ul>
    </div>
  )
}

export default ViewPapers
