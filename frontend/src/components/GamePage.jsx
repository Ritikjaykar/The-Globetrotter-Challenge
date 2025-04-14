import React, { useState, useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { apiClient } from '../api/client';

// Import monument images
import parisImage from '../assets/paris.svg';
import romeImage from '../assets/rome.svg';
import tokyoImage from '../assets/tokyo.svg';

const GamePage = () => {
  const [username, setUsername] = useState('');
  const navigate = useNavigate();
  const [destination, setDestination] = useState(null);
  const [options, setOptions] = useState([]);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [isCorrect, setIsCorrect] = useState(null);
  const [funFact, setFunFact] = useState('');
  const [score, setScore] = useState({ correct: 0, incorrect: 0 });
  const [loading, setLoading] = useState(true);
  const [currentMonument, setCurrentMonument] = useState(null);
  const [showMonument, setShowMonument] = useState(false);
  const [monumentSize, setMonumentSize] = useState(50);
  const [monumentOpacity, setMonumentOpacity] = useState(20);
  const [showCustomizationPanel, setShowCustomizationPanel] = useState(false);

  const monumentImages = {
    "Paris, France": parisImage,
    "Rome, Italy": romeImage,
    "Tokyo, Japan": tokyoImage
  };

  const mockDestinations = [
    {
      name: "Paris, France",
      clues: ["The city of lights awaits you", "Home to a famous tower constructed for a World's Fair"],
      funFacts: ["This city has over 170 museums and art galleries", "A famous cemetery here is home to over 1 million bodies"]
    },
    {
      name: "Rome, Italy",
      clues: ["All roads lead to this ancient city", "Once the center of a mighty empire"],
      funFacts: ["This city contains the smallest country in the world", "It has more than 2000 fountains"]
    },
    {
      name: "Tokyo, Japan",
      clues: ["This metropolis has the world's busiest pedestrian crossing", "A city where tradition meets futuristic technology"],
      funFacts: ["This city has over 200 miles of underground shopping malls", "Its metro system carries over 3 billion passengers annually"]
    }
  ];

  // Fetch user data on component mount
  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const user = localStorage.getItem('globetrotterUser');
        if (!user) {
          navigate('/');
          return;
        }
        
        const response = await apiClient.get(`/users/${user}`);
        setUsername(response.data.username);
        setScore(prev => ({ ...prev, correct: response.data.score }));
      } catch (err) {
        console.error('Error fetching user data:', err);
      }
    };
    fetchUserData();
  }, [navigate]);

  const fetchRandomDestination = useCallback(() => {
    setLoading(true);
    setShowMonument(false);
    
    setTimeout(() => {
      const randomIndex = Math.floor(Math.random() * mockDestinations.length);
      const selectedDestination = mockDestinations[randomIndex];
      setCurrentMonument(monumentImages[selectedDestination.name]);
      
      const otherOptions = mockDestinations
        .filter(dest => dest.name !== selectedDestination.name)
        .map(dest => dest.name);
      
      const allOptions = [...Array.from({ length: 3 }, () => 
        otherOptions[Math.floor(Math.random() * otherOptions.length)]
      ), selectedDestination.name];
      
      setDestination(selectedDestination);
      setOptions(allOptions.sort(() => Math.random() - 0.5));
      setSelectedAnswer(null);
      setIsCorrect(null);
      setFunFact('');
      setLoading(false);
      
      setTimeout(() => setShowMonument(true), 300);
    }, 1000);
  }, []);

  useEffect(() => {
    fetchRandomDestination();
  }, [fetchRandomDestination]);

  const handleAnswerSelect = async (answer) => {
    if (selectedAnswer) return;
    
    setSelectedAnswer(answer);
    const correct = answer === destination.name;
    setIsCorrect(correct);

    try {
      await apiClient.post(`/users/${username}/add-score`, { 
        score: correct ? 10 : -5 
      });
      setScore(prev => correct 
        ? { ...prev, correct: prev.correct + 10 }
        : { ...prev, incorrect: prev.incorrect + 1 }
      );
    } catch (err) {
      console.error('Error updating score:', err);
    }

    setFunFact(destination.funFacts[Math.floor(Math.random() * destination.funFacts.length)]);
  };

  const handleNext = () => fetchRandomDestination();

  const handleChallenge = () => {
    localStorage.setItem('globetrotterScore', score.correct.toString());
    navigate('/challenge');
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-indigo-600 via-purple-600 to-pink-600">
        <div className="text-xl font-bold text-white flex items-center gap-3">
          <svg className="animate-spin h-8 w-8 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
          </svg>
          Loading your destination...
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen relative overflow-hidden bg-gradient-to-br from-indigo-600 via-purple-600 to-pink-600 flex flex-col py-4">
      {/* Monument visualization and main content remains same */}
      {/* ... (keep existing JSX structure unchanged) ... */}
    </div>
  );
};

export default GamePage;