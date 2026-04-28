import React, { useState, useEffect } from 'react';
import { useMouseContext } from '../context/MouseContext';

const TitleWithParallax: React.FC = () => {
  const { mouse } = useMouseContext();
  const [transform, setTransform] = useState('translate(0, 0)');

  useEffect(() => {
    // Effetto parallasse leggero sul titolo
    const offsetX = mouse.x * 15; // Aumenta per più movimento
    const offsetY = mouse.y * 15;
    setTransform(`translate(${offsetX}px, ${offsetY}px)`);
  }, [mouse]);

  return (
    <h1 
      className="text-4xl md:text-5xl lg:text-6xl font-bold font-montserrat leading-tight transition-transform duration-100"
      style={{ transform }}
    >
      I'm{' '}
      <span className="bg-gradient-to-r from-purple-400 via-pink-500 to-red-500 bg-clip-text text-transparent">
        Giovanni Morelli
      </span>
      , a software developer.
    </h1>
  );
};

export default TitleWithParallax;
