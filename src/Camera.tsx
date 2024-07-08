import Webcam from 'react-webcam';
import { useState, useEffect, useCallback, useRef, RefObject } from 'react';
import { useFaceDetection } from 'react-use-face-detection';
import FaceDetection from '@mediapipe/face_detection';
import { Camera as CameraUtils } from '@mediapipe/camera_utils';

import * as htmlToImage from 'html-to-image';

import './Camera.css';
import { mergeRefs } from './mergeRefs';
import AuraCluster from './AuraCluster';
import ShutterButtonWrapper from './ShutterButtonWrapper';
import useWindowSize from './useWindowSize';
import ExportControlsWrapper from './ExportControlsWrapper';
import { AnimatePresence } from 'framer-motion';
import Fade from './Fade';

export type FacePositionType = {
  width: number;
  height: number;
  xCenter: number;
  yCenter: number;
};

function Camera({ fadeInVideo }: { fadeInVideo: boolean }) {
  const { height: windowHeight } = useWindowSize();
  const videoRef = useRef(null);
  const [facePosition, setFacePosition] = useState<FacePositionType | null>(
    null
  );

  const [isCapturingPhoto, setIsCapturingPhoto] = useState(false);
  const [webcamImage, setWebcamImage] = useState<string | null>(null);
  const [isAuraReady, setIsAuraReady] = useState(false);

  const auraRefs: RefObject<SVGSVGElement>[] = [
    useRef<SVGSVGElement>(null),
    useRef<SVGSVGElement>(null),
    useRef<SVGSVGElement>(null),
  ];

  const { webcamRef, boundingBox } = useFaceDetection({
    faceDetectionOptions: {
      selfieMode: true,
      model: 'short',
    },
    faceDetection: new FaceDetection.FaceDetection({
      locateFile: (file) =>
        `https://cdn.jsdelivr.net/npm/@mediapipe/face_detection/${file}`,
    }),
    camera: ({ mediaSrc, onFrame }) =>
      new CameraUtils(mediaSrc, {
        onFrame,
      }),
  });

  const onRetakePhoto = () => {
    setWebcamImage(null);
    setIsAuraReady(false);
    setIsCapturingPhoto(false);
  };

  const onCaptureImage = useCallback(() => {
    setIsCapturingPhoto(true);

    // @ts-ignore
    const imgSrc = videoRef?.current?.getScreenshot();
    setWebcamImage(imgSrc);
  }, []);

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

  const adjustXCenterForAdjustedWidth = (
    oldXCenter: number,
    oldWidth: number
  ) => {
    const newWidth = oldWidth * 1.75;
    const adjustment = (newWidth - oldWidth) / 2;
    const newXCenter = oldXCenter - adjustment;
    return newXCenter;
  };

  useEffect(() => {
    if (!boundingBox[0] || isCapturingPhoto || isAuraReady) return;

    // only detect face if large enough on screen
    if (boundingBox[0].width > 0.15 && (!isCapturingPhoto || webcamImage)) {
      const adjustedCenter = adjustXCenterForAdjustedWidth(
        boundingBox[0].xCenter,
        boundingBox[0].width
      );
      setFacePosition({
        width: boundingBox[0].width * 1.75 * 100,
        height: boundingBox[0].height * 100,
        xCenter: adjustedCenter * 100,
        yCenter: boundingBox[0].yCenter * 100,
      });
    } else {
      setFacePosition(null);
    }
  }, [boundingBox, setFacePosition]);

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
      <div
        style={{
          width: windowHeight * 0.75,
          height: windowHeight,
          position: 'relative',
        }}
      >
        {/* {facePosition && (
          <div
            className="bounding-box"
            style={{
              top: `${facePosition.yCenter}%`,
              left: `${facePosition.xCenter}%`,
              width: `${facePosition.width}%`,
              height: `${facePosition.height}%`,
            }}
          />
        )} */}

        {webcamImage && facePosition ? (
          <div
            id="captured-webcam-photo"
            style={{
              width: windowHeight * 0.75,
              height: windowHeight,
              backgroundImage: `url(${webcamImage})`,
            }}
          >
            {/* AURA */}
            <AuraCluster facePosition={facePosition} auraRefs={auraRefs} />
          </div>
        ) : (
          <Webcam
            ref={mergeRefs([webcamRef, videoRef])}
            forceScreenshotSourceSize
            mirrored
            screenshotFormat="image/jpeg"
            style={{
              width: windowHeight * 0.75,
              height: windowHeight,
              position: 'absolute',
            }}
          />
        )}
      </div>

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
