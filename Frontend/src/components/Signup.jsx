import { useState, useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { AuthContext } from '../context/AuthContext.jsx';
import { AlertContext } from '../context/AlertContext.jsx';

function Signup() {
  const navigate = useNavigate();
  const {setAlert} = useContext(AlertContext);
  const { auth, setAuth, setUser } = useContext(AuthContext);
  const [email, setEmail] = useState('');
  const [fullname, setFullname] = useState('');
  const [fullnameError, setFullnameError] = useState('');
  const [password, setPassword] = useState('');

  const handleEmailChange = (e) => {
    const value = e.target.value;
    setEmail(value.trim());
  };

  const handleFullnameChange = (e) => {
    const value = e.target.value;
    if (/^[A-Za-z ]*$/.test(value)) {
      setFullname(value);
      setFullnameError('');
    }
    
    else {
      setFullnameError('Only letters and spaces are allowed');
    }
  }

  const handlePasswordChange = (e) => {
    const value = e.target.value;
    setPassword(value);
  }

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post("http://localhost:8000/api/users/register", { email, fullname, password }, {withCredentials: true})
      setAlert({ status: 'success', message: response.data.message || ""})
      setAuth(true);
      setUser(response?.data?.user)
        navigate('/');
    } catch (error) {
      setAlert({ status: 'error', message: error.response.data.message || "error"})
    }
  }
  return (
    <div className="flex h-screen items-center justify-center dark:bg-slate-800">

      <form
        className="bg-white dark:bg-gray-600 shadow-2xl rounded-2xl p-8 w-full max-w-md" onSubmit={handleSubmit}
      >
        <h2 className="text-2xl font-semibold text-center mb-6 text-slate-500 dark:text-white">
          Create Account
        </h2>

        {/* Email */}
        <div className="mb-4">
          <label className="block text-gray-700 dark:text-gray-300 mb-1">Email</label>
          <input
            type="email"
            name="email"
            value={email}
            onChange={handleEmailChange}
            placeholder="Enter Email Id"
            required
            className='w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-slate-400 focus:outline-none'
          />
        </div>

        {/* Full Name */}
        <div className="mb-4">
          <label className="block text-gray-700 dark:text-gray-300 mb-1">Full Name</label>
          <input
            type="text"
            name="fullname"
            placeholder="Enter your full name"
            required
            value={fullname}
            onChange={handleFullnameChange}
            onBlur={() => setFullnameError('')}
            className={`w-full px-4 py-2 border rounded-lg focus:ring-2  focus:outline-none ${fullnameError ? "focus:ring-red-400" : "focus:ring-slate-400"} `}
          />
          {
            fullnameError && <p className='text-sm text-red-500 dark:text-red-300 mt-1'>{fullnameError}</p>
          }
        </div>

        {/* Password */}
        <div className="mb-4">
          <label className="block text-gray-700 dark:text-gray-300 mb-1">Password</label>
          <input
            type="password"
            name="password"
            value={password}
            onChange={handlePasswordChange}
            placeholder="Enter your password"
            required
            className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-slate-400 focus:outline-none"
          />
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          className="w-full py-2 mt-4 dark:bg-slate-200 dark:text-slate-500 dark:hover:bg-slate-300 bg-slate-500 text-white font-semibold rounded-lg hover:bg-slate-600 transition duration-200"
        >
          Sign Up
        </button>

        {/* Text & Button */}
        <div className="mt-2 flex dark:text-slate-300">
          <p>
            Have an account?
          </p>
          <Link
            to="/login"
            className="text-blue-500 dark:text-blue-200 underline cursor-pointer ml-1"
          >
            Login
          </Link>

        </div>
      </form>
    </div>
  )
}

export default Signup
