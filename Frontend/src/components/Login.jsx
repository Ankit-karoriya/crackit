import { useState } from 'react';
import {Link} from 'react-router-dom';

function Login() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleUsernameChange = (e) => {
        const value = e.target.value;
        setEmail(value);
    };

    const handlePasswordChange = (e) => {
        const value = e.target.value;
        setPassword(value);
    }


  return (
    <div className='flex h-screen items-center justify-center dark:bg-gray-800'>
            <form
                className='bg-white dark:bg-gray-600 shadow-2xl rounded-2xl p-8 w-full max-w-md'
            >
                <h1 className='text-2xl text-center text-slate-500 dark:text-slate-100 font-bold'>Login</h1>
                <br />

                {/* Email */}
                <div className="mb-4">
                    <label className="block text-gray-700 dark:text-gray-300 mb-1">Email</label>
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
                    className="w-full py-2 mt-4 bg-slate-500 dark:bg-slate-200 dark:text-slate-500 dark:hover:bg-slate-300 text-white font-semibold rounded-lg hover:bg-slate-600 transition duration-200"
                >
                    Login
                </button>

                {/* Text & Button */}
                <div className="mt-2 flex dark:text-slate-300">
                    <p>
                        New user?
                    </p>
                    <Link
                        to="/register"
                        className="text-blue-500 dark:text-blue-200 underline cursor-pointer ml-1"
                    >
                        Signup
                    </Link>

                </div>
            </form>
        </div>
  )
}

export default Login
