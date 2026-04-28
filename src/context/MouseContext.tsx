import React, { createContext, useContext, useState, useEffect } from 'react';

interface MousePosition {
  x: number;
  y: number;
}

interface MouseContextType {
  mouse: MousePosition;
}

const MouseContext = createContext<MouseContextType | undefined>(undefined);

export const MouseProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [mouse, setMouse] = useState<MousePosition>({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (event: MouseEvent) => {
      // Normalizza le coordinate tra -1 e 1
      const x = (event.clientX / window.innerWidth) * 2 - 1;
      const y = (event.clientY / window.innerHeight) * 2 - 1;
      setMouse({ x, y });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return (
    <MouseContext.Provider value={{ mouse }}>
      {children}
    </MouseContext.Provider>
  );
};

export const useMouseContext = () => {
  const context = useContext(MouseContext);
  if (!context) {
    throw new Error('useMouseContext deve essere usato dentro un MouseProvider');
  }
  return context;
};
