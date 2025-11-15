import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { Link, NavLink, useNavigate } from 'react-router-dom'
import axios from 'axios'
import { AuthContext } from '../context/AuthContext';
import { useContext } from 'react';
import { AlertContext } from '../context/AlertContext';

function Navbar() {
  const {user, setAuth, setUser} = useContext(AuthContext);
  const {setAlert} = useContext(AlertContext);
  const navigate = useNavigate();
  const handleLogout = async () => {
    try {
      const res = await axios.post("http://localhost:8000/api/users/logout", {},  {withCredentials: true});
      setAuth(false);
      setUser({});
      setAlert({ status: 'success', message: res?.data?.message || ""})
      navigate('/login');
    } catch (error) {
      setAlert({ status: 'error', message: error.response.data.message || "error"})
    }
  }
  return (
    <header className='h-fit flex justify-between p-3 md:px-4 lg:px-5 border-b-2'>
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
          className={({ isActive }) => `flex gap-2 w-fit h-fit px-3 py-2 hover:bg-slate-100 hover:rounded-xl duration-200 ${isActive ? "bg-slate-200 rounded-xl text-slate-900" : ""}`}>
          <div className='text-xl'><FontAwesomeIcon icon={["fas", "house"]} /></div>
          <div>Browse Papers</div>
        </NavLink>

        <NavLink
          to='/upload'
          className={({ isActive }) => `flex gap-2 w-fit h-fit px-3 py-2 hover:bg-blue-100 hover:rounded-xl duration-200 ${isActive ? "bg-blue-200 rounded-xl text-blue-900" : ""}`}>
          <div className='text-xl'><FontAwesomeIcon icon={["fas", "arrow-up-from-bracket"]} /></div>
          <div>Upload Paper</div>
        </NavLink>

        <NavLink
          to='/admin'
          className={({ isActive }) => `flex gap-2 w-fit h-fit px-3 py-2 hover:bg-orange-100 hover:rounded-xl duration-200 ${isActive ? "bg-amber-200 text-orange-900 rounded-xl" : ""}`}>
          <div className='text-xl'><FontAwesomeIcon icon={["fas", "shield"]} /></div>
          <div>Admin Panel</div>
        </NavLink>
      </div>

      {/* Admins info */}
      <div className='flex gap-5 justify-center items-center'>
        <div className='hidden lg:flex flex-col gap-0'>
          <p className='text-lg font-semibold h-6'>{user?.fullname || ""}</p>
          <p className='text-sm text-gray-500 text-right'>admin</p>
        </div>
        <div className='flex bg-orange-400 text-white h-10 w-10 rounded-full items-center justify-center text-lg font-semibold'>{user?.fullname?.[0]?.toUpperCase() || ""}</div>
        <button
          className='text-xl cursor-pointer hover:bg-gray-200 p-2 duration-200 hover:rounded-lg'
          onClick={handleLogout}
        ><FontAwesomeIcon icon={["fas", "right-from-bracket"]} /></button>
      </div>
    </header>
  )
}

export default Navbar
