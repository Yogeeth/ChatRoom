import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';

export default function CreateRoom({ onSetData }) {
  const [code, setCode] = useState('');
  const navigate = useNavigate();

  const handleCreateRoom = () => {
    if (code.length === 8) {
      onSetData(code);
      navigate(`/chat?code=${code}`);
    } else {
      alert('Please enter an 8-digit code.');
    }
  };

  return (
    <div className="h-screen flex flex-col justify-center items-center bg-gradient-to-r from-gray-800 to-gray-900">
      {/* Main Heading */}
      <motion.div
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="text-center mb-10"
      >
        <h1 className="text-7xl uppercase font-bold bg-gradient-to-r from-blue-400 to-blue-800 bg-clip-text text-transparent">
          Welcome
        </h1>
        <p className="text-gray-400 mt-4">Create Room to Share with Each Other</p>
      </motion.div>

      {/* Input and Button */}
      <motion.div
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.3 }}
        className="flex flex-col items-center"
      >
        <input
          className="px-4 py-2 w-80 rounded-lg border border-gray-700 bg-gray-800 text-white placeholder-gray-500 focus:ring-2 focus:ring-blue-500 outline-none mb-4"
          placeholder="Enter A Code Of 8 Digits"
          value={code}
          onChange={(e) => setCode(e.target.value)}
        />
        {/* <div className='flex gap-5'>
        <motion.button
          onClick={handleCreateRoom}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="px-6 py-3 bg-blue-600 rounded-full text-white font-semibold hover:bg-blue-700 transition duration-300"
        >
          Create Room
        </motion.button>
        <motion.button
          onClick={handleCreateRoom}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="px-6 py-3 bg-blue-600 rounded-full text-white font-semibold hover:bg-blue-700 transition duration-300"
        >
          Join The Chat
        </motion.button>
        </div> */}
                <motion.button
          onClick={handleCreateRoom}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="px-6 py-3 bg-blue-600 rounded-full text-white font-semibold hover:bg-blue-700 transition duration-300"
        >
          Create / Join
        </motion.button>

      </motion.div>
    </div>
  );
}
