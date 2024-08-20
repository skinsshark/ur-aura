import Webcam from 'react-webcam';
import { useState, useEffect, useRef } from 'react';

import { toBlob } from 'html-to-image';

import './Camera.css';
import ShutterButtonWrapper from './ShutterButtonWrapper';
import useWindowSize from './useWindowSize';
import ExportControlsWrapper from './ExportControlsWrapper';
import { AnimatePresence } from 'framer-motion';
import Fade from './Fade';
import CapturedImage from './CapturedImage';
import { isMobile } from 'react-device-detect';

function Camera() {
  const [deviceId, setDeviceId] = useState<string>('');
  const { height, width } = useWindowSize();
  const videoRef = useRef(null);

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
      const toBlobOptions = {
        cacheBust: false,
        quality: 1,
        width: isMobile ? width : height * 0.75,
        height,
      };

      // need to run this 3x times for it to work on safari apple whyyyyy
      await toBlob(photoEl, toBlobOptions);
      await toBlob(photoEl, toBlobOptions);
      const auraImageBlob = await toBlob(photoEl, toBlobOptions);

      if (auraImageBlob !== null) {
        const hiddenPolaroid = document.createElement('div');
        hiddenPolaroid.className = 'polaroid';
        hiddenPolaroid.style.backgroundColor = '#eee';
        hiddenPolaroid.style.display = 'flex';
        hiddenPolaroid.style.gap = '8px';
        hiddenPolaroid.style.flexDirection = 'column';
        hiddenPolaroid.style.alignItems = 'center';
        hiddenPolaroid.style.position = 'absolute';

        const imgElement = document.createElement('img');
        const auraImageUrl = URL.createObjectURL(auraImageBlob);
        imgElement.src = auraImageUrl;
        imgElement.style.marginTop = '100px';
        imgElement.width = 370;
        imgElement.height = 493.6;

        hiddenPolaroid.appendChild(imgElement);
        const polaroidText = document.createElement('div');
        polaroidText.style.fontFamily = "'SimSong', 'Times New Roman', serif";
        polaroidText.style.display = 'flex';
        polaroidText.style.flexDirection = 'column';
        polaroidText.style.alignItems = 'center';
        polaroidText.style.gap = '4px';

        const polaroidTitle = document.createElement('div');
        polaroidTitle.innerText = 'UR-@URA';
        polaroidTitle.style.fontSize = '52px';

        // const polaroidSubtitle = document.createElement('div');
        // polaroidSubtitle.innerText = 'your energy, colorized';
        // polaroidSubtitle.style.fontSize = '48px';

        const polaroidLink = document.createElement('div');
        polaroidLink.innerText = 'ur-aura.sharonzheng.com';
        polaroidLink.style.fontSize = '20px';

        const polaroidTag = document.createElement('div');
        polaroidTag.innerText = '(tag @sharon on instagram)';
        polaroidTag.style.fontSize = '20px';

        polaroidText.appendChild(polaroidTitle);
        // polaroidText.appendChild(polaroidSubtitle);
        polaroidText.appendChild(polaroidLink);
        polaroidText.appendChild(polaroidTag);

        hiddenPolaroid.appendChild(polaroidText);

        await document.fonts.ready;
        const polaroidToPngOptions = {
          cacheBust: false,
          quality: 1,
          width: 432,
          height: 768,
        };

        // need to run this 3x times for it to work on safari apple whyyyyy
        await toBlob(hiddenPolaroid, polaroidToPngOptions);
        await toBlob(hiddenPolaroid, polaroidToPngOptions);

        const downloadImageBlob = await toBlob(
          hiddenPolaroid,
          polaroidToPngOptions
        );
        if (downloadImageBlob !== null) {
          document.body.appendChild(hiddenPolaroid);

          const date = new Date().toISOString();

          // check if the web share api is supported
          if (navigator.share && isMobile) {
            const file = new File([downloadImageBlob], `${date}.png`, {
              type: downloadImageBlob.type,
            });
            await navigator.share({
              title: date,
              text: 'your energy, colorized @ ur-aura.sharonzheng.com',
              files: [file],
            });
          } else {
            // tmp download image
            const link = document.createElement('a');
            const downloadImageUrl = URL.createObjectURL(downloadImageBlob);
            link.href = downloadImageUrl;
            link.download = `${date}.png`;
            link.click();
          }
          setTimeout(() => {
            hiddenPolaroid.remove();
          }, 1000);
        }
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
            width: isMobile ? width : height * 0.75,
            height,
            position: 'relative',
          }}
        >
          <CapturedImage webcamImage={webcamImage} windowHeight={height} />
        </div>
      ) : (
        <div
          style={{
            width: isMobile ? width : height * 0.75,
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
                  width: isMobile ? width : height * 0.75,
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
