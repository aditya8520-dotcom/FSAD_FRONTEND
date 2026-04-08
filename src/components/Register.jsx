import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import axios from "axios";

const Register = () => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [message, setMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

 const handleRegister = async (e) => {
  e.preventDefault();

  if (password !== confirmPassword) {
    setMessage("Passwords don't match!");
    return;
  }

  setIsLoading(true);
  setMessage('');

  try {
    await axios.post("http://localhost:8081/api/auth/register", {
      username: username,
      email: email,
      password: password
    });

    // ✅ ADD THIS (VERY IMPORTANT)
    const users = JSON.parse(localStorage.getItem("users")) || [];

    users.push({
      username: username,
      email: email,
      role: "student"
    });

    localStorage.setItem("users", JSON.stringify(users));

    setMessage("Registered successfully as STUDENT!");

    setTimeout(() => {
      navigate("/login");
    }, 1500);

  } catch (error) {
    console.error(error);
    setMessage("Registration failed!");
  } finally {
    setIsLoading(false);
  }
};

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-green-900 via-blue-900 to-purple-900 p-4">
      <div className="absolute inset-0 bg-[url('/fit.jpg')] bg-cover bg-center opacity-20"></div>

      <div className="relative w-full max-w-md">
        <div className="bg-white/10 backdrop-blur-lg rounded-3xl p-8 shadow-2xl border border-white/20">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold text-white mb-2">Join FitWell</h2>
            <p className="text-white/80">Create your account and start your wellness journey</p>
          </div>

          {message && (
            <div className={`px-4 py-3 rounded-xl mb-6 ${
              message.includes('successfully')
                ? 'bg-green-100 border border-green-300 text-green-700'
                : 'bg-red-100 border border-red-300 text-red-700'
            }`}>
              {message}
            </div>
          )}

          <form onSubmit={handleRegister} className="space-y-6">
            <div>
              <label className="block text-white/90 text-sm font-medium mb-2">
                Username
              </label>
              <input
                type="text"
                placeholder="Choose a username"
                value={username}
                onChange={e => setUsername(e.target.value)}
                required
                className="w-full px-4 py-3 rounded-xl border border-white/30 bg-white/10 text-white placeholder-white/60 focus:ring-2 focus:ring-green-400 focus:border-transparent transition-all duration-200"
              />
            </div>

            <div>
              <label className="block text-white/90 text-sm font-medium mb-2">
                Email Address
              </label>
              <input
                type="email"
                placeholder="Enter your email address"
                value={email}
                onChange={e => setEmail(e.target.value)}
                required
                className="w-full px-4 py-3 rounded-xl border border-white/30 bg-white/10 text-white placeholder-white/60 focus:ring-2 focus:ring-green-400 focus:border-transparent transition-all duration-200"
              />
            </div>

            <div>
              <label className="block text-white/90 text-sm font-medium mb-2">
                Password
              </label>
              <input
                type="password"
                placeholder="Create a strong password"
                value={password}
                onChange={e => setPassword(e.target.value)}
                required
                className="w-full px-4 py-3 rounded-xl border border-white/30 bg-white/10 text-white placeholder-white/60 focus:ring-2 focus:ring-green-400 focus:border-transparent transition-all duration-200"
              />
            </div>

            <div>
              <label className="block text-white/90 text-sm font-medium mb-2">
                Confirm Password
              </label>
              <input
                type="password"
                placeholder="Confirm your password"
                value={confirmPassword}
                onChange={e => setConfirmPassword(e.target.value)}
                required
                className="w-full px-4 py-3 rounded-xl border border-white/30 bg-white/10 text-white placeholder-white/60 focus:ring-2 focus:ring-green-400 focus:border-transparent transition-all duration-200"
              />
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="w-full bg-gradient-to-r from-green-500 to-blue-600 hover:from-green-600 hover:to-blue-700 text-white font-semibold py-3 px-6 rounded-xl transition-all duration-200 shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isLoading ? 'Creating Account...' : 'Create Account'}
            </button>
          </form>

          <div className="text-center mt-6">
            <p className="text-white/80">
              Already have an account?{' '}
              <Link to="/login" className="text-green-300 hover:text-green-200 font-medium transition-colors">
                Sign in here
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;