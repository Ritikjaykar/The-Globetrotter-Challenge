import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';

const LoginPage = () => {
  const [name, setName] = useState('');
  const navigate = useNavigate();

  const handleLogin = () => {
    localStorage.setItem('globetrotterUser', name);
    navigate('/game');
  };

  return (
    <div className="min-h-screen bg-blue-400 flex items-center justify-center">
      <div className="bg-white p-8 rounded-xl shadow-lg w-full max-w-sm">
        <h2 className="text-2xl font-bold mb-4 text-blue-600">Login</h2>
        <input 
          type="text"
          placeholder="Enter your name"
          className="w-full px-4 py-2 border rounded mb-4"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <button 
          onClick={handleLogin}
          className="bg-blue-600 text-white w-full py-2 rounded hover:bg-blue-700"
        >
          Login
        </button>
        <p className="mt-4 text-sm">
          Don't have an account? <Link to="/signup" className="text-blue-600 underline">Sign up</Link>
        </p>
      </div>
    </div>
  );
};

export default LoginPage;
