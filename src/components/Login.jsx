import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import axios from "axios";

const Login = ({ setIsLoggedIn }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

const handleLogin = async (e) => {
  e.preventDefault();
  setIsLoading(true);
  setMessage('');

  try {
    const res = await axios.post("http://localhost:8081/api/auth/login", {
      username,
      password
    });

    const data = res.data;

    // ✅ HANDLE BASED ON STATUS
    if (data.status === "MFA_SETUP") {
      localStorage.setItem("pendingMfa", JSON.stringify({
        userId: data.userId,
        qr: data.qr,
        setup: true
      }));

      navigate("/mfa");
    }

    else if (data.status === "MFA_VERIFY") {
      localStorage.setItem("pendingMfa", JSON.stringify({
        userId: data.userId,
        setup: false
      }));

      navigate("/mfa");
    }

    else {
      // ✅ SUCCESSFUL LOGIN - Set localStorage
      localStorage.setItem("username", data.username);
      localStorage.setItem("userEmail", data.username); // fallback compatibility
      localStorage.setItem("userRole", data.role || "student");
      
      setIsLoggedIn(true);
      setMessage("Login successful! Redirecting...");
    }

  } catch (error) {
    console.error(error);
    const serverMessage = error?.response?.data;
    setMessage(typeof serverMessage === 'string' ? serverMessage : "Invalid credentials");
  } finally {
    setIsLoading(false);
  }
};

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-900 via-purple-900 to-indigo-900 p-4">
      <div className="absolute inset-0 bg-[url('/fit.jpg')] bg-cover bg-center opacity-20"></div>

      <div className="relative w-full max-w-md">
        <div className="bg-white/10 backdrop-blur-lg rounded-3xl p-8 shadow-2xl border border-white/20">
          
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold text-white mb-2">Welcome Back</h2>
          </div>

          {message && (
            <div className="bg-red-100 text-red-700 px-4 py-3 rounded-xl mb-6 text-center">
              {message}
            </div>
          )}

          <form onSubmit={handleLogin} className="space-y-6">

            <input
              type="text"
              placeholder="Username"
              value={username}
              onChange={e => setUsername(e.target.value)}
              required
              className="w-full px-4 py-3 rounded-xl bg-white/10 text-white outline-none"
            />

            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={e => setPassword(e.target.value)}
              required
              className="w-full px-4 py-3 rounded-xl bg-white/10 text-white outline-none"
            />

            <button
              type="submit"
              disabled={isLoading}
              className="w-full bg-blue-500 text-white py-3 rounded-xl hover:bg-blue-600 transition"
            >
              {isLoading ? 'Signing In...' : 'Login'}
            </button>

          </form>

          <p className="text-center mt-4 text-white">
            Don't have account?{" "}
            <Link to="/register" className="underline">Register</Link>
          </p>

        </div>
      </div>
    </div>
  );
};

export default Login;