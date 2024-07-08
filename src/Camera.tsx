import Webcam from 'react-webcam';
import { useState, useEffect, useRef } from 'react';

import * as htmlToImage from 'html-to-image';

import './Camera.css';
import ShutterButtonWrapper from './ShutterButtonWrapper';
import useWindowSize from './useWindowSize';
import ExportControlsWrapper from './ExportControlsWrapper';
import { AnimatePresence } from 'framer-motion';
import Fade from './Fade';
import CapturedImage from './CapturedImage';

function Camera({ fadeInVideo }: { fadeInVideo: boolean }) {
  const { height: windowHeight } = useWindowSize();
  const videoRef = useRef(null);

  const [isCapturingPhoto, setIsCapturingPhoto] = useState(false);
  const [webcamImage, setWebcamImage] = useState<string | null>(null);
  const [isAuraReady, setIsAuraReady] = useState(false);

  const onRetakePhoto = () => {
    setWebcamImage(null);
    setIsAuraReady(false);
    setIsCapturingPhoto(false);
  };

  const onCaptureImage = () => {
    setIsCapturingPhoto(true);

    // @ts-ignore
    const imgSrc = videoRef?.current?.getScreenshot();
    setWebcamImage(imgSrc);
  };

  const onDownloadImage = () => {
    htmlToImage
      .toPng(document.getElementById('captured-webcam-photo') as HTMLElement)
      .then((dataUrl) => {
        const date = new Date();
        // tmp download image
        const link = document.createElement('a');
        link.href = dataUrl;
        link.download = `${date.toISOString()}.png`;
        link.click();
      });
  };

  // determine if aura is rendered
  useEffect(() => {
    if (webcamImage) {
      const auraTimer = setTimeout(() => {
        setIsAuraReady(true);
        setIsCapturingPhoto(false);
      }, 4000);

      return () => clearTimeout(auraTimer);
    } else {
      setIsAuraReady(false);
    }
  }, [webcamImage]);

  return (
    <div
      className={`camera-wrapper ${fadeInVideo ? 'fade-in' : ''}`}
      style={{ animationDuration: `4000ms`, animationDelay: `500ms` }}
    >
      {webcamImage ? (
        <div
          style={{
            width: windowHeight * 0.75,
            height: windowHeight,
            position: 'relative',
          }}
        >
          <CapturedImage
            webcamImage={webcamImage}
            windowHeight={windowHeight}
          />
        </div>
      ) : (
        <div
          style={{
            width: windowHeight * 0.75,
            height: windowHeight,
            position: 'relative',
          }}
        >
          {' '}
          <AnimatePresence>
            <Fade
              isVisible={!isCapturingPhoto && !isAuraReady}
              delay={1}
              key="webcam"
            >
              <Webcam
                ref={videoRef}
                forceScreenshotSourceSize
                mirrored
                screenshotFormat="image/jpeg"
                style={{
                  width: windowHeight * 0.75,
                  height: windowHeight,
                  position: 'absolute',
                }}
              />
            </Fade>
          </AnimatePresence>
        </div>
      )}

      <AnimatePresence>
        {!isAuraReady && (
          <Fade isVisible={!isAuraReady} key="shutter-button-wrapper">
            <ShutterButtonWrapper
              onCaptureImage={onCaptureImage}
              isCapturingPhoto={isCapturingPhoto}
            />
          </Fade>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {isAuraReady && (
          <Fade isVisible={isAuraReady} key="exports-controls-wrapper">
            <ExportControlsWrapper
              onRetakePhoto={onRetakePhoto}
              onDownloadImage={onDownloadImage}
            />
          </Fade>
        )}
      </AnimatePresence>
    </div>
  );
}

export default Camera;
