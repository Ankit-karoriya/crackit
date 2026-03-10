import { useState, useContext } from 'react';
import {Link, useNavigate} from 'react-router-dom';
import axios from 'axios';
import { AlertContext } from '../context/AlertContext.jsx';
import { AuthContext } from '../context/AuthContext.jsx';
const BASE_URL = import.meta.env.VITE_API_BASE_URL;

function Login() {
    const navigate = useNavigate();
    const {setAuth, setUser} = useContext(AuthContext)
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const {setAlert} = useContext(AlertContext);

    const handleUsernameChange = (e) => {
        const value = e.target.value;
        setEmail(value);
    };

    const handlePasswordChange = (e) => {
        const value = e.target.value;
        setPassword(value);
    }

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await axios.post(`${BASE_URL}/api/users/login`, {email, password}, {withCredentials: true});
            setAuth(true);
            setUser(response?.data?.loginuser);
            setAlert({status: "success", message: response.data.message || ""});
            navigate('/');
        } catch (error) {
            setAlert({status: "error", message: error.response.data.message || "error"})
        }
    }


  return (
    <div className='flex flex-col h-screen items-center justify-center'>
    <h1 className='text-3xl font-bold text-slate-900 pt-20'>CrackIt - Exam Paper Sharing Platform</h1>
    <div className='flex h-screen items-center justify-center w-full'>
            <form
                className='bg-white shadow-2xl rounded-2xl p-8 w-full max-w-md border'
                onSubmit={handleSubmit}
            >
                <h1 className='text-2xl text-center text-slate-500 font-bold'>Login</h1>
                <br />

                {/* Email */}
                <div className="mb-4">
                    <label className="block text-gray-700 mb-1">Email</label>
                    <input
                        type="email"
                        name="email"
                        value={email}
                        onChange={handleUsernameChange}
                        placeholder="Enter Email"
                        required
                        className='w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-slate-400 focus:outline-none'
                    />
                </div>

                {/* Password */}
                <div className="mb-4">
                    <label className="block text-gray-700 mb-1">Password</label>
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
                    className="w-full py-2 mt-4 bg-slate-500 text-white font-semibold rounded-lg hover:bg-slate-600 transition duration-200"
                >
                    Login
                </button>

                {/* Text & Button */}
                <div className="mt-2 flex">
                    <p>
                        New user?
                    </p>
                    <Link
                        to="/register"
                        className="text-blue-500 underline cursor-pointer ml-1"
                    >
                        Signup
                    </Link>

                </div>
            </form>
        </div>
        </div>
  )
}

export default Login
