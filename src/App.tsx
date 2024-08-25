import { useEffect, useRef, useState } from 'react';
import Camera from './Camera';

import './App.css';
import LoadingScreen from './LoadingScreen';
import StartButton from './StartButton';
import { AnimatePresence } from 'framer-motion';
import Fade from './Fade';
import useMediaQuery from './useMediaQuery';
import ReactGA from 'react-ga4';
import { Analytics } from '@vercel/analytics/react';

const DESCRIPTION_TEXT = `
  the electromagnetic field around you is your aura, captured in colors to illustrate your present, past, and future states. visit me IRL to purchase your aura photo and companion guidebook
`;

function App() {
  ReactGA.initialize(process.env.REACT_APP_GA4_ID as string);

  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [showCamera, setShowCamera] = useState<boolean>(false);
  const [showStartButton, setShowStartButton] = useState<boolean>(true);

  const pageBorderRef = useRef<HTMLDivElement>(null);
  const isMobileSizeViewport = useMediaQuery('(max-width: 768px)');

  // animation timeline:
  // 0s: spinning text fades in
  // 2s: border fades in
  // 4s: spinning text fades out
  // 5s: entire loading screen fades out
  // 7s: loading screen unmounts
  useEffect(() => {
    // smths weird w the css so force scroll to top on load
    window.scrollTo(0, 0);
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
      <Analytics />
      <div className="lil-border" ref={pageBorderRef} />
      {isLoading && <LoadingScreen />}
      <div className="page-wrapper">
        <div className="text-sidebar">
          <header>
            {/* ⋆⁂･ﾟ*⋆⁂･ﾟ* */}
            <h1>UR-@URA</h1>
            <p>your energy, colorized</p>
          </header>
          {isMobileSizeViewport ? (
            <AnimatePresence>
              {showStartButton && (
                <Fade isVisible={showStartButton} key="text-description">
                  <footer>
                    <p>{DESCRIPTION_TEXT}</p>
                  </footer>
                </Fade>
              )}
            </AnimatePresence>
          ) : (
            <footer>
              <p>{DESCRIPTION_TEXT}</p>
            </footer>
          )}
        </div>

        <div className="camera-wrapper">
          <AnimatePresence>
            {showCamera && (
              <Fade
                isVisible={showCamera}
                key="camera-wrapper"
                className="camera-overlay"
              >
                <Camera />
              </Fade>
            )}
          </AnimatePresence>

          <AnimatePresence>
            {showStartButton && (
              <Fade
                isVisible={showStartButton}
                key="start-button-wrapper"
                className="start-camera"
              >
                <StartButton
                  onClick={() => {
                    setShowStartButton(false);
                    setShowCamera(true);
                  }}
                />
              </Fade>
            )}
          </AnimatePresence>
        </div>
      </div>
    </>
  );
}

export default App;
