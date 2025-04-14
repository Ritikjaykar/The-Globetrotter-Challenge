import { useState, useEffect } from 'react';
import { StartGameButton, NoButton } from './Buttons';

export default function GlobetrotterChallenge() {
  const [textPosition, setTextPosition] = useState(100);
  const [rotation, setRotation] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setTextPosition(prev => (prev < -100 ? 100 : prev - 0.08));
    }, 30);
    const rotationInterval = setInterval(() => {
      setRotation(prev => (prev + 0.5) % 360);
    }, 30);

    return () => {
      clearInterval(interval);
      clearInterval(rotationInterval);
    };
  }, []);

  return (
    <div className="fixed inset-0 h-screen w-screen overflow-hidden bg-cover bg-center bg-no-repeat"
      style={{ backgroundImage: "url('/25501.jpg')" }}>

      {/* 🌞 Rotating Image */}
      <img
        src="/set_of_glyph_suns.svg"
        alt="Top Glyphs"
        className="absolute z-10 h-[650px] w-[650px] -translate-x-1/2 opacity-90"
        style={{
          top: '-45%',
          left: '30%',
          transform: `rotate(${rotation}deg)`,
          filter: 'brightness(1.2)'
        }}
      />

      {/* 🛰️ Scrolling Main Title */}
      <div
        className="absolute top-1/2 left-1/2 z-[5] -translate-y-1/2 whitespace-nowrap font-barlow font-bold leading-none text-black opacity-100"
        style={{
          transform: `translate(-70%, -17%) translateX(${textPosition}vw)`,
          fontSize: '280px',
          textShadow: '0 20px 20px rgba(52, 50, 50, 0.2)'
        }}
      >
        THE GLOBETROTTER CHALLENGE
      </div>

      {/* 👽 SVG Centerpiece */}
      <img
        src="/258288-P4T75J-908.svg"
        alt="Centered SVG"
        className="absolute left-1/2 top-[59%] z-[10] h-[900px] w-[800px] -translate-x-1/2 -translate-y-1/2"
      />

      {/* 🎯 Center Section */}
      <div className="relative bottom-[-65%] left-1/2 z-[50] w-full -translate-x-1/2 text-center">
        <div style={{ textShadow: '0 20px 20px rgba(20, 18, 18, 0.2)' }} className="mb-8 font-barlow text-8xl font-extrabold text-white">
          ARE YOU READY?
        </div>
        <div className="flex justify-center gap-8 px-4">
          <StartGameButton />
          <NoButton />
        </div>
      </div>
    </div>
  );
}
