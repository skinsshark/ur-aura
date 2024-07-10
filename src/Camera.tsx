import Webcam from 'react-webcam';
import { useState, useEffect, useRef } from 'react';

import { toPng } from 'html-to-image';

import './Camera.css';
import ShutterButtonWrapper from './ShutterButtonWrapper';
import useWindowSize from './useWindowSize';
import ExportControlsWrapper from './ExportControlsWrapper';
import { AnimatePresence } from 'framer-motion';
import Fade from './Fade';
import CapturedImage from './CapturedImage';

function Camera({ fadeInVideo }: { fadeInVideo: boolean }) {
  const [deviceId, setDeviceId] = useState('');
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

  // support continuity camera
  useEffect(() => {
    navigator.mediaDevices.enumerateDevices().then((devices) => {
      const videoDevices = devices.filter(
        (device) => device.kind === 'videoinput'
      );

      const continuityCamera = videoDevices.find((device) =>
        device.label.includes('iPhone')
      );

      if (continuityCamera) {
        setDeviceId(continuityCamera.deviceId);
      }
    });
  }, []);

  const onDownloadImage = async () => {
    try {
      const photoEl = document.getElementById(
        'captured-webcam-photo'
      ) as HTMLElement;
      const toPngOptions = {
        cacheBust: false,
        quality: 1,
        width: windowHeight * 0.75,
        height: windowHeight,
      };

      // need to run this 3x times for it to work on safari apple whyyyyy
      await toPng(photoEl, toPngOptions);
      await toPng(photoEl, toPngOptions);
      const dataUrl = await toPng(photoEl, toPngOptions);

      if (dataUrl) {
        const date = new Date();
        // tmp download image
        const link = document.createElement('a');
        link.href = dataUrl;
        link.download = `${date.toISOString()}.png`;
        link.click();
      }
    } catch (e) {
      console.log(e);
    }
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

  const [hasPermission, setHasPermission] = useState<boolean | null>(null);

  useEffect(() => {
    const checkPermissions = async () => {
      try {
        await navigator.mediaDevices.getUserMedia({ video: true });
        setHasPermission(true);
      } catch (error) {
        setHasPermission(false);
      }
    };

    checkPermissions();
  }, []);

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
                videoConstraints={{
                  deviceId,
                }}
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
        {!isAuraReady && hasPermission !== null && (
          <Fade isVisible={!isAuraReady} key="shutter-button-wrapper">
            <ShutterButtonWrapper
              onCaptureImage={onCaptureImage}
              isCapturingPhoto={isCapturingPhoto}
              hasPermission={hasPermission}
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
