import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import axios from 'axios';

const MFAVerify = ({ setIsLoggedIn }) => {
  const navigate = useNavigate();
  const [code, setCode] = useState('');
  const [message, setMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [pendingMfa, setPendingMfa] = useState(null);
  const [qrCodeImage, setQrCodeImage] = useState('');

  useEffect(() => {
    const stored = localStorage.getItem('pendingMfa');
    if (stored) {
      const data = JSON.parse(stored);
      setPendingMfa(data);
      setQrCodeImage(data.qr || '');
      if (!data.userId) {
        navigate('/login');
      }
    } else {
      navigate('/login');
    }
  }, [navigate]);

const handleVerify = async (e) => {
  e.preventDefault();

  if (!code || code.length !== 6) {
    setMessage("Enter 6-digit code");
    return;
  }

  setIsLoading(true);
  setMessage("");

  try {
    const res = await axios.post("http://localhost:8081/api/auth/verify-mfa", {
      userId: pendingMfa.userId,
      otp: code
    });

    const data = res.data;

    // ✅ STORE LOGIN DATA (CRITICAL)
    localStorage.setItem("isLoggedIn", "true");
    localStorage.setItem("username", data.username);
    localStorage.setItem("userRole", data.role);

    // 🔥 IMPORTANT: use username as key everywhere
    localStorage.setItem("userEmail", data.username);

    console.log("LOGIN DATA STORED:", data);

    setIsLoggedIn(true);
    localStorage.removeItem("pendingMfa");

    setTimeout(() => {
      navigate(data.role === "admin" ? "/admin" : "/dashboard");
    }, 1000);

  } catch (error) {
    setMessage(error.response?.data || "Invalid OTP");
  } finally {
    setIsLoading(false);
  }
};

  const title = qrCodeImage ? 'Setup MFA - Scan QR' : 'Verify MFA - Enter Code';

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-900 via-blue-950 to-slate-900 p-4">
      <div className="absolute inset-0 bg-[url('/fit.jpg')] bg-cover bg-center opacity-15"></div>

      <div className="relative w-full max-w-lg">
        <div className="bg-white/10 backdrop-blur-2xl rounded-3xl p-8 shadow-2xl border border-white/20">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold text-white mb-2">{title}</h2>
            <p className="text-white/80 text-lg">
              {qrCodeImage ? 'Scan with Authenticator app, then enter code below' : 'Enter 6-digit code from app'}
            </p>
          </div>

          {qrCodeImage && (
            <div className="mb-8 flex justify-center">
              <img src={qrCodeImage} alt="Scan QR" className="w-64 h-64 rounded-2xl border-4 border-white/20 shadow-2xl" />
            </div>
          )}

          {message && (
            <div className={`p-4 rounded-xl mb-6 text-center font-medium ${
              message.includes('Success') ? 'bg-green-500/20 text-green-100 border-green-500/30 border' 
              : 'bg-red-500/20 text-red-100 border-red-500/30 border'
            }`}>
              {message}
            </div>
          )}

          <form onSubmit={handleVerify} className="space-y-4">
            <input
              type="text"
              maxLength="6"
              placeholder="123456"
              value={code}
              onChange={(e) => setCode(e.target.value.replace(/\D/g, ''))}
              className="w-full px-6 py-4 rounded-2xl bg-white/10 text-white text-xl text-center font-mono tracking-wider border-2 border-white/20 focus:border-blue-400 focus:outline-none"
              disabled={isLoading}
            />
            <button
              type="submit"
              disabled={isLoading || code.length !== 6}
              className="w-full bg-gradient-to-r from-cyan-500 to-blue-600 text-white py-4 rounded-2xl font-bold text-lg shadow-xl hover:from-cyan-600 hover:to-blue-700 disabled:opacity-50 transition-all"
            >
              {isLoading ? 'Verifying...' : 'Verify Code'}
            </button>
          </form>

          <div className="mt-8 text-center">
            <Link to="/login" className="text-white/80 hover:text-white font-medium underline">← Back to Login</Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MFAVerify;

