import { useEffect, useRef, useState } from 'react';
import Camera from './Camera';

import './App.css';
import LoadingScreen from './LoadingScreen';
import { AnimatePresence } from 'framer-motion';
import Fade from './Fade';
import StartButton from './StartButton';

// rename these bc what are they even
const FADE_IN_DURATION = 4000;
export const FADE_OUT_DURATION = 1000;

function App() {
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [showCamera, setShowCamera] = useState<boolean>(false);

  const [fadeOutStartButton, setFadeOutStartButton] = useState<boolean>(false);
  const [fadeInVideo, setFadeInVideo] = useState<boolean>(false);

  const pageBorderRef = useRef<HTMLDivElement>(null);

  const handleStartButtonClick = () => {
    setFadeOutStartButton(true);
    setTimeout(() => {
      setShowCamera(true);
      setFadeOutStartButton(false);
      setFadeInVideo(true);
    }, FADE_OUT_DURATION);
  };

  useEffect(() => {
    if (showCamera) {
      const timer = setTimeout(() => {
        setFadeInVideo(false);
      }, FADE_IN_DURATION);

      return () => clearTimeout(timer);
    }
  }, [showCamera]);

  // animation timeline:
  // 0s: spinning text fades in
  // 2s: border fades in
  // 4s: spinning text fades out
  // 5s: entire loading screen fades out
  // 7s: loading screen unmounts
  useEffect(() => {
    // after 2 seconds of loading, fade in page border
    const borderFadeInTimer = setTimeout(() => {
      if (pageBorderRef.current) {
        pageBorderRef.current.style.opacity = '1';
      }
    }, 2000);

    // total "load" is 7 seconds -- unmount invisible loading screen
    const loadingScreenUnmountTimer = setTimeout(() => {
      setIsLoading(false);
    }, 7000);

    return () => {
      clearTimeout(borderFadeInTimer);
      clearTimeout(loadingScreenUnmountTimer);
    };
  }, []);

  return (
    <>
      <div className="lil-border" ref={pageBorderRef} />
      {isLoading && <LoadingScreen />}
      <div className="page-wrapper">
        <div className="text-sidebar">
          <header>
            {/* ⋆⁂･ﾟ*⋆⁂･ﾟ* */}
            <h1>UR-@URA</h1>
            <p>your energy, colorized</p>
          </header>
          <footer>
            <p>
              visit me IRL to purchase your aura photo and companion guidebook.
              email or DM for private events/inquiries
            </p>
          </footer>

          <StartButton
            fadeOutStartButton={fadeOutStartButton}
            onClick={handleStartButtonClick}
            showCamera={showCamera}
            isMobile={true}
          />
        </div>

        <div className="camera-wrapper">
          {showCamera ? (
            <div
              className={`camera-overlay ${fadeInVideo ? 'fade-in' : ''}`}
              style={{ animationDuration: `${FADE_IN_DURATION}ms` }}
            >
              <Camera fadeInVideo={fadeInVideo} />
            </div>
          ) : (
            <StartButton
              fadeOutStartButton={fadeOutStartButton}
              onClick={handleStartButtonClick}
              showCamera={showCamera}
            />
          )}
        </div>
      </div>
    </>
  );
}

export default App;
