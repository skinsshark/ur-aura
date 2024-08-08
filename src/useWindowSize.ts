import { useState, useEffect } from 'react';

const useWindowSize = () => {
  const [windowSize, setWindowSize] = useState<{
    width: number;
    height: number;
  }>({ width: 0, height: 0 });

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 599) {
        setWindowSize({
          width: window.innerWidth,
          height: (window.innerWidth * 4) / 3,
        });
      } else {
        setWindowSize({
          width: window.innerWidth * 0.75,
          height: window.innerHeight,
        });
      }
    };

    window.addEventListener('resize', handleResize);
    handleResize();

    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return windowSize;
};

export default useWindowSize;
