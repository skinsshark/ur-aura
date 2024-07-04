import React, { useEffect } from 'react';
import './LoadingScreen.css';

const LoadingScreen = (isLoading: { isLoading: boolean }) => {
  const spinningTextRef = React.useRef<HTMLDivElement>(null);
  const loadingScreenRef = React.useRef<HTMLDivElement>(null);

  // spinning text
  const text = 'UR-AURA ⋆⋆⋆⋆⋆⋆⋆⋆⋆⋆ Loading ⋆⋆⋆⋆⋆⋆⋆⋆⋆⋆⋆⋆⋆⋆⋆⋆⋆';

  useEffect(() => {
    // on load, fade in spinning loading text
    const fadeInSpinningTextTimer = setTimeout(() => {
      if (spinningTextRef.current) {
        spinningTextRef.current.style.opacity = '1';
      }
    }, 250);

    // fade out spinning loading text
    const fadeOutSpinningTextTimer = setTimeout(() => {
      if (spinningTextRef.current) {
        spinningTextRef.current.style.opacity = '0';
        spinningTextRef.current.classList.add('force-fade-out');
      }
    }, 4000);

    // fade out loading screen entirely
    const fadeOutLoadingScreenTimer = setTimeout(() => {
      if (loadingScreenRef.current) {
        loadingScreenRef.current.style.opacity = '0';
      }
    }, 5000);

    return () => {
      clearTimeout(fadeOutSpinningTextTimer);
      clearTimeout(fadeInSpinningTextTimer);
      clearTimeout(fadeOutLoadingScreenTimer);
    };
  });

  return (
    <div className="loading-screen" ref={loadingScreenRef}>
      <div className="spinning-text-container" ref={spinningTextRef}>
        {text.split('').map((char, i) => (
          <span
            className="spinning-character"
            key={i}
            style={{
              transform: `rotate(${8 * i}deg)`,
            }}
          >
            {char}
          </span>
        ))}
      </div>
    </div>
  );
};

export default LoadingScreen;
