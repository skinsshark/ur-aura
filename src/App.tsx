import { useEffect, useRef, useState } from 'react';
import Camera from './Camera';

import './App.css';
import LoadingScreen from './LoadingScreen';

const FADE_IN_DURATION = 4000;
const FADE_OUT_DURATION = 1000;

function App() {
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [showCamera, setShowCamera] = useState<boolean>(false);

  const [fadeOutStartButton, setFadeOutStartButton] = useState<boolean>(false);
  const [fadeInVideo, setFadeInVideo] = useState<boolean>(false);

  const pageBorderRef = useRef<HTMLDivElement>(null);

  const handleButtonClick = () => {
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
      {isLoading && <LoadingScreen isLoading={isLoading} />}
      <div className="page-wrapper">
        <div className="text-sidebar">
          <header>
            <h1>UR-AURA</h1>
            <p>your energy, colorized</p>
            <h4>
              <a
                href="https://sharonzheng.com/"
                target="_blank"
                rel="noreferrer"
              >
                {/* ⋆⁂･ﾟ*⋆⁂･ﾟ* */}⋆⋆⋆
              </a>
            </h4>
          </header>
          <footer>
            <p>
              Visit me IRL to purchase your aura photo and companion guidebook.
              DM or email for private events/inquiries.
            </p>
          </footer>
        </div>

        <div className="camera-wrapper">
          {showCamera ? (
            <div
              className={`camera-overlay ${fadeInVideo ? 'fade-in' : ''}`}
              style={{ animationDuration: `${FADE_IN_DURATION}ms` }}
            >
              <Camera />
            </div>
          ) : (
            <div
              className={`start-camera ${fadeOutStartButton ? 'fade-out' : ''}`}
              style={{ transitionDuration: `${FADE_OUT_DURATION}ms` }}
            >
              <svg
                width="680"
                height="680"
                viewBox="0 0 922 922"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <mask id="path-1-inside-1_167_2258" fill="white">
                  <path d="M461 0L467.273 341.304L509.188 2.52542L479.75 342.616L556.847 10.0739L492.022 345.224L603.457 22.563L503.954 349.101L648.506 39.8555L515.415 354.204L691.5 61.7623L526.28 360.477L731.969 88.0432L536.43 367.851L769.469 118.41L545.754 376.246L803.59 152.531L554.149 385.57L833.957 190.031L561.523 395.72L860.238 230.5L567.796 406.585L882.144 273.494L572.899 418.046L899.437 318.543L576.776 429.978L911.926 365.153L579.384 442.25L919.475 412.812L580.696 454.727L922 461L580.696 467.273L919.475 509.188L579.384 479.75L911.926 556.847L576.776 492.022L899.437 603.457L572.899 503.954L882.144 648.506L567.796 515.415L860.238 691.5L561.523 526.28L833.957 731.969L554.149 536.43L803.59 769.469L545.754 545.754L769.469 803.59L536.43 554.149L731.969 833.957L526.28 561.523L691.5 860.238L515.415 567.796L648.506 882.144L503.954 572.899L603.457 899.437L492.022 576.776L556.847 911.926L479.75 579.384L509.188 919.475L467.273 580.696L461 922L454.727 580.696L412.812 919.475L442.25 579.384L365.153 911.926L429.978 576.776L318.543 899.437L418.046 572.899L273.494 882.144L406.585 567.796L230.5 860.238L395.72 561.523L190.031 833.957L385.57 554.149L152.531 803.59L376.246 545.754L118.41 769.469L367.851 536.43L88.0432 731.969L360.477 526.28L61.7623 691.5L354.204 515.415L39.8555 648.506L349.101 503.954L22.563 603.457L345.224 492.022L10.0739 556.847L342.616 479.75L2.52542 509.188L341.304 467.273L0 461L341.304 454.727L2.52542 412.812L342.616 442.25L10.0739 365.153L345.224 429.978L22.563 318.543L349.101 418.046L39.8555 273.494L354.204 406.585L61.7623 230.5L360.477 395.72L88.0432 190.031L367.851 385.57L118.41 152.531L376.246 376.246L152.531 118.41L385.57 367.851L190.031 88.0432L395.72 360.477L230.5 61.7623L406.585 354.204L273.494 39.8555L418.046 349.101L318.543 22.563L429.978 345.224L365.153 10.0739L442.25 342.616L412.812 2.52542L454.727 341.304L461 0Z" />
                </mask>
                <path
                  d="M461 0L467.273 341.304L509.188 2.52542L479.75 342.616L556.847 10.0739L492.022 345.224L603.457 22.563L503.954 349.101L648.506 39.8555L515.415 354.204L691.5 61.7623L526.28 360.477L731.969 88.0432L536.43 367.851L769.469 118.41L545.754 376.246L803.59 152.531L554.149 385.57L833.957 190.031L561.523 395.72L860.238 230.5L567.796 406.585L882.144 273.494L572.899 418.046L899.437 318.543L576.776 429.978L911.926 365.153L579.384 442.25L919.475 412.812L580.696 454.727L922 461L580.696 467.273L919.475 509.188L579.384 479.75L911.926 556.847L576.776 492.022L899.437 603.457L572.899 503.954L882.144 648.506L567.796 515.415L860.238 691.5L561.523 526.28L833.957 731.969L554.149 536.43L803.59 769.469L545.754 545.754L769.469 803.59L536.43 554.149L731.969 833.957L526.28 561.523L691.5 860.238L515.415 567.796L648.506 882.144L503.954 572.899L603.457 899.437L492.022 576.776L556.847 911.926L479.75 579.384L509.188 919.475L467.273 580.696L461 922L454.727 580.696L412.812 919.475L442.25 579.384L365.153 911.926L429.978 576.776L318.543 899.437L418.046 572.899L273.494 882.144L406.585 567.796L230.5 860.238L395.72 561.523L190.031 833.957L385.57 554.149L152.531 803.59L376.246 545.754L118.41 769.469L367.851 536.43L88.0432 731.969L360.477 526.28L61.7623 691.5L354.204 515.415L39.8555 648.506L349.101 503.954L22.563 603.457L345.224 492.022L10.0739 556.847L342.616 479.75L2.52542 509.188L341.304 467.273L0 461L341.304 454.727L2.52542 412.812L342.616 442.25L10.0739 365.153L345.224 429.978L22.563 318.543L349.101 418.046L39.8555 273.494L354.204 406.585L61.7623 230.5L360.477 395.72L88.0432 190.031L367.851 385.57L118.41 152.531L376.246 376.246L152.531 118.41L385.57 367.851L190.031 88.0432L395.72 360.477L230.5 61.7623L406.585 354.204L273.494 39.8555L418.046 349.101L318.543 22.563L429.978 345.224L365.153 10.0739L442.25 342.616L412.812 2.52542L454.727 341.304L461 0Z"
                  stroke="white"
                  strokeWidth="21.1145"
                  mask="url(#path-1-inside-1_167_2258)"
                />
              </svg>

              <button onClick={handleButtonClick}>click to open camera</button>
            </div>
          )}
        </div>
      </div>
    </>
  );
}

export default App;
