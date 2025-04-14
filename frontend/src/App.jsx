// frontend/src/App.jsx
import { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import GlobetrotterChallenge from './components/GlobetrotterChallenge';
import GamePage from './components/GamePage';
import ChallengePage from './components/ChallengePage';
import RegistrationPage from './components/RegistrationPage';
import LoadingPage from './components/LoadingPage';

export default function App() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  return (
    <Router>
      <Routes>
        <Route path="/" element={<GlobetrotterChallenge />} />
        <Route 
          path="/signup" 
          element={<RegistrationPage onRegister={setUser} />} 
        />
        <Route 
          path="/game" 
          element={user ? <GamePage user={user} /> : <Navigate to="/" />} 
        />
        <Route 
          path="/challenge" 
          element={
            loading ? <LoadingPage /> : 
            user ? <ChallengePage user={user} /> : <Navigate to="/" />
          } 
        />
      </Routes>
    </Router>
  );
}