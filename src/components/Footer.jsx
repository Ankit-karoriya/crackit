import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { Link } from 'react-router-dom'

function Footer() {
  return (
    <>
      <footer className='flex flex-col px-4 py-6 bg-slate-800'>
        {/* Footer details */}
        <div className='flex flex-col md:flex-row justify-between md:px-9 gap-6'>
          <div className='flex flex-col gap-2 md:w-3/5 md:gap-3'>
            <div className='flex gap-3'>
              <FontAwesomeIcon className='text-x text-white bg-orange-400 p-2 rounded-lg' icon={["fas", "book-open"]} />
              <h2 className='text-xl text-white font-semibold'>ExamVault</h2>
            </div>
            <p className='text-gray-400'>Your trusted platform for academic excellence. Share knowledge, help peers succeed, and build a stronger academic community together.</p>
          </div>

          <div className='text-white flex flex-col gap-3'>
            <div className='text-lg font-semibold'>Platform</div>
            <Link to='/home' className='text-sm'>Browse Papers</Link>
            <Link to='/home' className='text-sm'>Upload Content</Link>
            <Link to='/home' className='text-sm'>Quality Guidelines</Link>
          </div>

          <div className='text-white flex flex-col gap-3'>
            <div className='text-lg font-semibold'>Support</div>
            <Link to='/home' className='text-sm'>Help Center</Link>
            <Link to='/home' className='text-sm'>Contact Us</Link>
            <Link to='/home' className='text-sm'>Privacy Policy</Link>
          </div>
        </div>

        <br />
        <hr className='border border-gray-700'/>
        <br />

        {/* Copyright */}
        <div className='text-center text-gray-400'>
          &copy; 2025 ExamVault. Built for academic excellence.
        </div>
      </footer>
    </>
  )
}

export default Footer
