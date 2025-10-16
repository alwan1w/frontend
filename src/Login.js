import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';

function Login() {
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await axios.get('https://randomuser.me/api/?results=1');
        setUserData(response.data.results[0]);
        setLoading(false);
      } catch (err) {
        console.error('Gagal fetch data');
        setLoading(false);
      }
    };
    fetchUserData();
  }, []);

  const handleLogin = () => {
    navigate('/profile', { state: { userData } });
  };

  if (loading) return <div className="loading">Loading...</div>;

  return (
    <div className="flex items-center justify-center min-h-screen p-4 bg-gradient-to-br from-gray-900 to-black">
      <motion.div
        className="bg-gray-800 p-8 rounded-xl shadow-[0_0_15px_cyan] w-full max-w-md"
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: 'easeOut' }}
      >
        <h1 className="mb-6 text-3xl font-bold text-center text-cyan-400 neon-text">Login to My Profile</h1>
        <div className="mb-4">
          <label className="block mb-2 text-gray-300">Username</label>
          <motion.input
            type="text"
            value={userData.login.username}
            readOnly
            className="w-full p-3 text-white bg-gray-700 rounded focus:outline-none focus:ring-2 focus:ring-cyan-400"
            whileFocus={{ scale: 1.02 }}
          />
        </div>
        <div className="mb-6">
          <label className="block mb-2 text-gray-300">Password</label>
          <motion.input
            type="password"
            value={userData.login.password}
            readOnly
            className="w-full p-3 text-white bg-gray-700 rounded focus:outline-none focus:ring-2 focus:ring-cyan-400"
            whileFocus={{ scale: 1.02 }}
          />
        </div>
        <motion.button
          onClick={handleLogin}
          className="w-full p-3 font-bold text-gray-900 transition-colors rounded bg-cyan-400 hover:bg-cyan-300"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          Enter Profile
        </motion.button>
      </motion.div>
    </div>
  );
}

export default Login;