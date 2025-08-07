import { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { FaShieldAlt, FaEnvelope } from 'react-icons/fa';
import toast, { Toaster } from 'react-hot-toast';
import { apiAuthHandle } from '../config/apiAuthHandle.js';

const VerifyOTP = () => {
  const [otp, setOtp] = useState('');
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();
  const email = location.state?.email || localStorage.getItem('verificationEmail');

  useEffect(() => {
    if (!email) {
      navigate('/signup')
      return
    }

  }, [email, navigate])

  const handleSubmit = async (e) => {
    e.preventDefault()

    if (otp.length !== 6) {
      toast.error('OTP must be 6 digits')
      return
    }

    setLoading(true)

    try {
      const response = await apiAuthHandle.post('/verify-otp', {
        email,
        otp
      });

      toast.success(response.data.message);
      localStorage.removeItem('verificationEmail');

      // Navigate to login after successful verification
      setTimeout(() => {
        navigate('/login');
      }, 2000);
    } catch (error) {
      toast.error(error.response?.data?.message || 'OTP verification failed');
    } finally {
      setLoading(false);
    }
  };


  const handleOtpChange = (e) => {
    const value = e.target.value.replace(/\D/g, ''); // Only allow digits
    if (value.length <= 6) {
      setOtp(value);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <Toaster
        position="top-center"
        reverseOrder={false}
      />
      <div className="max-w-md w-full space-y-8">
        <div>
          <div className="flex justify-center">
            <FaShieldAlt className="text-indigo-600 text-6xl" />
          </div>
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
            Verify Your Email
          </h2>
          <p className="mt-2 text-center text-sm text-gray-600">
            We've sent a verification code to
          </p>
          <p className="text-center text-sm text-indigo-600 font-medium">
            {email}
          </p>
        </div>

        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>


          <div>
            <label htmlFor="otp" className="sr-only">
              Enter OTP
            </label>
            <div className="relative">
              <FaEnvelope className="absolute top-3 left-3 text-gray-400" />
              <input
                id="otp"
                name="otp"
                type="text"
                required
                maxLength="6"
                className="appearance-none rounded-md relative block w-full px-10 py-3 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm text-center text-2xl tracking-widest"
                placeholder="000000"
                value={otp}
                onChange={handleOtpChange}
              />
            </div>
          </div>

          <div>
            <button
              type="submit"
              disabled={loading}
              className="group relative w-full flex justify-center py-3 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? 'Verifying...' : 'Verify OTP'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default VerifyOTP;