import React from 'react';
import { useNavigate } from 'react-router-dom';

export function StartGameButton() {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate('/login'); // or '/signup' if that's your main page
  };

  return (
    <button
      onClick={handleClick}
      className="z-50 min-w-[100px] px-8 py-4 text-2xl font-bold tracking-wide text-white 
              rounded-full border-2 border-white/20 bg-green-600 shadow-2xl backdrop-blur-sm transition-all
              duration-300 hover:scale-105 hover:bg-green-700 hover:shadow-3xl font-barlow"
    >
      YEAH!!
    </button>
  );
}

export function NoButton() {
  const handleTourClick = () => {
    window.open(
      'https://earth.google.com/web/@25.36642006,-64.1680448,-11047.67146553a,14720328.89416695d,35y,-0h,0t,0r/data=CgRCAggBOgMKATBCAggASg0I____________ARAA',
      '_blank'
    );
  };

  return (
    <button
      onClick={handleTourClick}
      className="z-50 min-w-[100px] px-8 py-4 text-2xl font-bold tracking-wide text-white 
              rounded-full border-2 border-white/20 bg-red-600 shadow-2xl backdrop-blur-sm transition-all
              duration-300 hover:scale-105 hover:bg-red-700 hover:shadow-3xl font-barlow"
    >
      TAKE TOUR!
    </button>
  );
}
