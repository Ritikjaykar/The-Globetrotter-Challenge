import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { apiClient } from '../api/client';

const SignupPage = () => {
  const [name, setName] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSignup = async (e) => {
    e.preventDefault();
    try {
      const response = await apiClient.post('/users/register', { username: name });
      localStorage.setItem('globetrotterUser', response.data.username);
      navigate('/game');
    } catch (err) {
      setError(err.message || 'Registration failed. Please try another username.');
    }
  };

  return (
    <div className="min-h-screen bg-green-400 flex items-center justify-center">
      <div className="bg-white p-8 rounded-xl shadow-lg w-full max-w-sm">
        <h2 className="text-2xl font-bold mb-4 text-green-600">Sign Up</h2>
        {error && <div className="mb-4 text-red-500 text-sm">{error}</div>}
        <form onSubmit={handleSignup}>
          <input 
            type="text"
            placeholder="Choose a username"
            className="w-full px-4 py-2 border rounded mb-4"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
            minLength={3}
          />
          <button 
            type="submit"
            className="bg-green-600 text-white w-full py-2 rounded hover:bg-green-700"
          >
            Sign Up
          </button>
        </form>
        <p className="mt-4 text-sm">
          Already have an account? <Link to="/login" className="text-green-600 underline">Login</Link>
        </p>
      </div>
    </div>
  );
};
export default SignupPage;