import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { Link, NavLink } from 'react-router-dom'

function Navbar() {
  return (
    <div className='h-fit flex justify-between p-3 md:px-4 lg:px-5'>
      {/* Logo and name */}
      <Link to="/home" className='flex gap-2 cursor-pointer'>
        <div className='text-3xl lg:text-5xl'><FontAwesomeIcon icon={["fas", "book-open"]} /></div>
        <div className='hidden lg:block flex-col'>
          <h1 className='text-2xl font-bold h-7'>ExamVault</h1>
          <h3 className='text-sm text-gray-500'>Academic Excellence</h3>
        </div>
      </Link>

      {/* Buttons having different pages */}
      <div className='hidden md:flex gap-8'>
        <NavLink
          to='/'
          className={({ isActive }) => `flex gap-2 w-fit h-fit px-3 py-2 hover:bg-gray-100 hover:rounded-xl duration-200 ${isActive ? "bg-gray-200 rounded-xl" : ""}`}>
          <div className='text-xl'><FontAwesomeIcon icon={["fas", "house"]} /></div>
          <div>Browse Papers</div>
        </NavLink>

        <NavLink 
        to='/upload'
        className={({isActive}) => `flex gap-2 w-fit h-fit px-3 py-2 hover:bg-gray-100 hover:rounded-xl duration-200 ${isActive ? "bg-gray-200 rounded-xl" : ""}`}>
          <div className='text-xl'><FontAwesomeIcon icon={["fas", "arrow-up-from-bracket"]} /></div>
          <div>Upload Paper</div>
        </NavLink>

        <NavLink 
        to='/admin'
        className={({isActive}) => `flex gap-2 w-fit h-fit px-3 py-2 hover:bg-gray-100 hover:rounded-xl duration-200 ${isActive ? "bg-gray-200 rounded-xl" : ""}`}>
          <div className='text-xl'><FontAwesomeIcon icon={["fas", "shield"]} /></div>
          <div>Admin Panel</div>
        </NavLink>
      </div>

      {/* Admins info */}
      <div className='flex gap-5 justify-center items-center'>
        <div className='hidden lg:flex flex-col gap-0'>
          <p className='text-lg font-semibold h-6'>Ishwar Patel</p>
          <p className='text-sm text-gray-500 text-right'>admin</p>
        </div>
        <div className='flex bg-orange-400 text-white h-10 w-10 rounded-full items-center justify-center text-lg font-semibold'>B</div>
        <button className='text-xl cursor-pointer hover:bg-gray-200 p-2 duration-200 hover:rounded-lg'><FontAwesomeIcon icon={["fas", "right-from-bracket"]} /></button>
      </div>
    </div>
  )
}

export default Navbar
