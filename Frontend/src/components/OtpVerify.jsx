import { useState, useContext } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from 'axios';
import { AlertContext } from '../context/AlertContext.jsx';
import { AuthContext } from '../context/AuthContext.jsx';
const BASE_URL = import.meta.env.VITE_API_BASE_URL;

function OtpVerify() {
  const location = useLocation();
  const email = location.state?.email;

  const navigate = useNavigate();

  const { setAlert } = useContext(AlertContext);
  const { setAuth, setUser } = useContext(AuthContext);

  const [otp, setOtp] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setOtp(e.target.value);
  };

  const handleVerify = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await axios.post(
        `${BASE_URL}/api/users/verify-otp`,
        { email, otp },
        { withCredentials: true }
      );
      setAlert({ status: 'success', message: response.data.message || "" })
      setAuth(true);
      setUser(response?.data?.user)
      navigate('/');
    } catch (error) {
      setAlert({ status: 'error', message: error.response.data.message || "error" })
      setLoading(false);
    }
  }
  return (
    <div className="flex flex-col items-center justify-center h-screen">

      <div className="bg-white shadow-xl p-8 rounded-xl w-96">

        <h2 className="text-2xl font-semibold text-center mb-6">
          Verify OTP
        </h2>

        <p className="text-sm text-gray-500 mb-4 text-center">
          Enter the OTP sent to {email}
        </p>

        <form onSubmit={handleVerify}>

          <input
            type="text"
            maxLength="6"
            value={otp}
            onChange={handleChange}
            placeholder="Enter OTP"
            className="w-full px-4 py-2 border rounded-lg mb-4 focus:outline-none focus:ring-2 focus:ring-slate-400"
          />

          <button
            disabled={loading}
            type="submit"
            className="w-full px-6 py-2 bg-slate-500 text-white rounded-lg hover:bg-slate-600"
          >
            {loading ? "Verifying OTP..." : "Verify OTP"}
          </button>

        </form>

      </div>

    </div>
  );
}

export default OtpVerify