import React from "react";
import { Link } from "react-router-dom";

const HomePage = () => {
  return (
    <div className="min-h-screen w-full bg-gradient-to-br from-blue-900 via-purple-900 to-indigo-900 flex items-center justify-center relative overflow-hidden pt-24">
      {/* Background pattern */}
      <div className="absolute inset-0 bg-[url('/fit.jpg')] bg-cover bg-center opacity-20"></div>
      <div className="absolute inset-0 bg-gradient-to-br from-blue-900/80 via-purple-900/80 to-indigo-900/80"></div>

      {/* Main content */}
      <div className="relative z-10 text-center px-6 max-w-5xl">
        {/* App Title Header */}
        <div className="mb-8">
          <h1 className="text-8xl md:text-9xl font-bold text-white mb-4 leading-tight tracking-tight">
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-300 via-blue-300 to-purple-300 drop-shadow-2xl">
              FitWell
            </span>
          </h1>
          <div className="w-32 h-1 bg-gradient-to-r from-cyan-400 to-blue-400 mx-auto rounded-full mb-6"></div>
          <p className="text-2xl md:text-3xl font-light text-white/90 tracking-wide">
            Holistic Health Tracker
          </p>
        </div>

        <h2 className="text-4xl md:text-5xl font-semibold text-white mb-8 leading-tight">
          Transform Your Health Journey
        </h2>

        <p className="text-xl md:text-2xl text-white/90 mb-12 leading-relaxed max-w-3xl mx-auto">
          Your comprehensive companion for tracking fitness, nutrition, mental wellness, and overall wellbeing.
          Get personalized insights and take control of your health with our integrated monitoring platform.
        </p>

        <div className="flex flex-col sm:flex-row gap-6 justify-center items-center mb-16">
          <Link to="/register">
            <button className="bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-600 hover:to-blue-600 text-white font-bold py-5 px-10 rounded-full text-xl transition-all duration-300 shadow-2xl hover:shadow-cyan-500/25 transform hover:scale-105 hover:-translate-y-1">
              Start Your Journey
            </button>
          </Link>
          <Link to="/login">
            <button className="bg-white/10 backdrop-blur-lg text-white font-semibold py-5 px-10 rounded-full text-xl border-2 border-white/30 hover:bg-white/20 hover:border-white/50 transition-all duration-300 shadow-xl hover:shadow-white/10 transform hover:scale-105">
              Sign In
            </button>
          </Link>
        </div>

        {/* Feature highlights */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="bg-white/10 backdrop-blur-lg rounded-3xl p-8 border border-white/20 shadow-2xl hover:bg-white/15 transition-all duration-300 transform hover:scale-105">
            <h3 className="text-2xl font-bold text-white mb-3">Fitness Tracking</h3>
            <p className="text-white/80 text-lg leading-relaxed">Log workouts, track calories, and monitor your physical progress with detailed analytics</p>
          </div>
          <div className="bg-white/10 backdrop-blur-lg rounded-3xl p-8 border border-white/20 shadow-2xl hover:bg-white/15 transition-all duration-300 transform hover:scale-105">
            <h3 className="text-2xl font-bold text-white mb-3">Mental Wellness</h3>
            <p className="text-white/80 text-lg leading-relaxed">Track mood, practice mindfulness, and maintain emotional balance with guided sessions</p>
          </div>
          <div className="bg-white/10 backdrop-blur-lg rounded-3xl p-8 border border-white/20 shadow-2xl hover:bg-white/15 transition-all duration-300 transform hover:scale-105">
            <h3 className="text-2xl font-bold text-white mb-3">Nutrition Guide</h3>
            <p className="text-white/80 text-lg leading-relaxed">Get personalized nutrition advice and healthy eating tips tailored to your goals</p>
          </div>
        </div>

        {/* Call to action */}
        <div className="mt-16">
          <p className="text-lg text-white/70 mb-4">Join thousands of users on their wellness journey</p>
          <div className="flex justify-center items-center gap-2 text-white/60">
            <span>⭐⭐⭐⭐⭐</span>
            <span className="text-sm">4.9/5 from 10,000+ users</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomePage;