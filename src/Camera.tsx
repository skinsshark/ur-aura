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

function Camera() {
  const [deviceId, setDeviceId] = useState<string>('');
  const { height, width } = useWindowSize();
  const videoRef = useRef(null);

  console.log({ height, width });

  const [isCapturingPhoto, setIsCapturingPhoto] = useState<boolean>(false);
  const [webcamImage, setWebcamImage] = useState<string | null>(null);
  const [isAuraReady, setIsAuraReady] = useState<boolean>(false);

  const onRetakePhoto = () => {
    setWebcamImage(null);
    setIsAuraReady(false);
    setIsCapturingPhoto(false);
  };

  const onCaptureImage = () => {
    // @ts-ignore
    const imgSrc = videoRef?.current?.getScreenshot();
    setWebcamImage(imgSrc);
  };

  // support continuity camera
  // useEffect(() => {
  //   navigator.mediaDevices.enumerateDevices().then((devices) => {
  //     const videoDevices = devices.filter(
  //       (device) => device.kind === 'videoinput'
  //     );

  //     const continuityCamera = videoDevices.find((device) =>
  //       device.label.includes('iPhone')
  //     );

  //     if (continuityCamera) {
  //       setDeviceId(continuityCamera.deviceId);
  //     }
  //   });
  // }, []);

  const onDownloadImage = async () => {
    try {
      const photoEl = document.getElementById(
        'captured-webcam-photo'
      ) as HTMLElement;
      const toPngOptions = {
        cacheBust: false,
        quality: 1,
        width,
        height,
      };

      // need to run this 3x times for it to work on safari apple whyyyyy
      await toPng(photoEl, toPngOptions);
      await toPng(photoEl, toPngOptions);
      const dataUrl = await toPng(photoEl, toPngOptions);

      // this is crazy bc css classes were loaded but not applied
      if (dataUrl) {
        const hiddenPolaroid = document.createElement('div');
        hiddenPolaroid.className = 'polaroid';
        hiddenPolaroid.style.backgroundColor = '#eee';
        hiddenPolaroid.style.display = 'flex';
        hiddenPolaroid.style.gap = '20px';
        hiddenPolaroid.style.flexDirection = 'column';
        hiddenPolaroid.style.alignItems = 'center';
        hiddenPolaroid.style.position = 'absolute';
        hiddenPolaroid.style.transform = 'translateZ(-99999px)';
        hiddenPolaroid.style.zIndex = '-999999';

        const imgElement = document.createElement('img');
        imgElement.src = dataUrl;
        imgElement.style.marginTop = '200px';
        imgElement.width = 925;
        imgElement.height = 1234;

        hiddenPolaroid.appendChild(imgElement);
        const polaroidText = document.createElement('div');
        polaroidText.style.fontFamily = "'SimSong', 'Times New Roman', serif";
        polaroidText.style.display = 'flex';
        polaroidText.style.flexDirection = 'column';
        polaroidText.style.alignItems = 'center';
        polaroidText.style.gap = '8px';

        const polaroidTitle = document.createElement('div');
        polaroidTitle.innerText = 'UR-@URA';
        polaroidTitle.style.fontSize = '128px';

        // const polaroidSubtitle = document.createElement('div');
        // polaroidSubtitle.innerText = 'your energy, colorized';
        // polaroidSubtitle.style.fontSize = '48px';

        const polaroidLink = document.createElement('div');
        polaroidLink.innerText = 'ur-aura.sharonzheng.com';
        polaroidLink.style.fontSize = '48px';

        const polaroidTag = document.createElement('div');
        polaroidTag.innerText = '(tag @sharon in your stories)';
        polaroidTag.style.fontSize = '48px';

        polaroidText.appendChild(polaroidTitle);
        // polaroidText.appendChild(polaroidSubtitle);
        polaroidText.appendChild(polaroidLink);
        polaroidText.appendChild(polaroidTag);

        hiddenPolaroid.appendChild(polaroidText);

        await document.fonts.ready;
        const polaroidToPngOptions = {
          cacheBust: false,
          quality: 1,
          width: 1080,
          height: 1920,
        };

        // need to run this 3x times for it to work on safari apple whyyyyy
        await toPng(hiddenPolaroid, polaroidToPngOptions);
        await toPng(hiddenPolaroid, polaroidToPngOptions);
        const downloadImageUrl = await toPng(
          hiddenPolaroid,
          polaroidToPngOptions
        );

        document.body.appendChild(hiddenPolaroid);

        const date = new Date();
        // tmp download image
        const link = document.createElement('a');
        link.href = downloadImageUrl;
        link.download = `${date.toISOString()}.png`;
        link.click();
        setTimeout(() => {
          hiddenPolaroid.remove();
        }, 1000);
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
    <>
      {webcamImage ? (
        <div
          style={{
            width,
            height,
            position: 'relative',
          }}
        >
          <CapturedImage webcamImage={webcamImage} windowHeight={height} />
        </div>
      ) : (
        <div
          style={{
            width,
            height,
            position: 'relative',
          }}
        >
          <AnimatePresence>
            <Fade
              isVisible={isCapturingPhoto || !isAuraReady}
              delay={1}
              key="webcam"
            >
              <Webcam
                audio={false}
                ref={videoRef}
                forceScreenshotSourceSize
                mirrored
                videoConstraints={{
                  deviceId,
                }}
                screenshotFormat="image/jpeg"
                style={{
                  width,
                  height,
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
              setIsCapturingPhoto={setIsCapturingPhoto}
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
    </>
  );
}

export default Camera;
