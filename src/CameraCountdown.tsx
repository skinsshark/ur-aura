import { useState, useEffect } from 'react';
import { AnimatePresence } from 'framer-motion';
import Fade from './Fade';

const CameraCountdown = ({ onComplete }: { onComplete: () => void }) => {
  const [count, setCount] = useState(3);

  useEffect(() => {
    if (count > 0) {
      const timer = setTimeout(() => setCount(count - 1), 1000);
      return () => clearTimeout(timer);
    } else {
      onComplete(); // countdown complete to take photo
    }
  }, [count, onComplete]);

  return (
    <div className="countdown-numbers">
      <AnimatePresence>
        {count === 3 && (
          <Fade isVisible={count === 3} skipExit={true} key={count}>
            <span className="countdown-number">{count}....</span>
          </Fade>
        )}
        {count === 2 && (
          <Fade isVisible={count === 2} skipExit={true} key={count}>
            <span className="countdown-number">{count}....</span>
          </Fade>
        )}
        {count === 1 && (
          <Fade isVisible={count === 1} skipExit={true} key={count}>
            <span className="countdown-number">{count}....</span>
          </Fade>
        )}
      </AnimatePresence>
    </div>
  );
};

export default CameraCountdown;
