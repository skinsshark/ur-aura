import { RefObject, useEffect, useRef, useState } from 'react';
import AuraCluster from './AuraCluster';
import { useFaceDetection } from 'react-use-face-detection';
import FaceDetection from '@mediapipe/face_detection';
import ScreenFlash from './ScreenFlash';
import { AnimatePresence } from 'framer-motion';
import Fade from './Fade';
import { isMobile } from 'react-device-detect';

export type FacePositionType = {
  width: number;
  height: number;
  xCenter: number;
  yCenter: number;
};

const CapturedImage = ({
  webcamImage,
  windowHeight,
}: {
  webcamImage: string;
  windowHeight: number;
}) => {
  const [flash, setFlash] = useState(false);

  const { imgRef, boundingBox } = useFaceDetection({
    faceDetectionOptions: {
      model: 'short',
    },
    faceDetection: new FaceDetection.FaceDetection({
      locateFile: (file) =>
        `https://cdn.jsdelivr.net/npm/@mediapipe/face_detection/${file}`,
    }),
  });

  const [facePosition, setFacePosition] = useState<FacePositionType | null>(
    null
  );

  // bounding box is being calculated against 100%/100% width height
  // need to scale with origin at center
  const scaleRelativeToCenter = (originalXCenter: number, scale: number) => {
    const distanceFromCenter = originalXCenter - 50;
    const scaledDistance = distanceFromCenter * scale; // scaling factor same as width adjustment
    return 50 + scaledDistance;
  };

  useEffect(() => {
    if (!boundingBox[0]) return;

    if (boundingBox[0].width > 0.15) {
      const adjustedWidthScale = isMobile ? 1 : 1.75;
      const adjustedXCenter = scaleRelativeToCenter(
        boundingBox[0].xCenter * 100,
        adjustedWidthScale
      );
      setFacePosition({
        width: boundingBox[0].width * adjustedWidthScale * 100,
        height: boundingBox[0].height * 100,
        xCenter: adjustedXCenter,
        yCenter: boundingBox[0].yCenter * 100,
      });
    } else {
      setFacePosition(null);
    }
  }, [boundingBox]);

  useEffect(() => {
    setFlash(true);
    const timer = setTimeout(() => {
      setFlash(false);
    }, 600);

    return () => clearTimeout(timer);
  }, []);

  const auraRefs: RefObject<SVGSVGElement>[] = [
    useRef<SVGSVGElement>(null),
    useRef<SVGSVGElement>(null),
    useRef<SVGSVGElement>(null),
  ];

  return (
    <>
      <AnimatePresence>
        {flash && (
          <Fade isVisible={flash} duration={0.2} key="screen-flash">
            <ScreenFlash flash={flash} />
          </Fade>
        )}
      </AnimatePresence>

      <div id="captured-webcam-photo">
        {/* for debugging */}
        {facePosition && (
          <div
            className="bounding-box"
            style={{
              top: `${facePosition.yCenter}%`,
              left: `${facePosition.xCenter}%`,
              width: `${facePosition.width}%`,
              height: `${facePosition.height}%`,
            }}
          />
        )}
        <img
          ref={imgRef} // this is causing scary error
          crossOrigin="anonymous"
          alt="person from webcam with aura (hopefully)"
          style={{
            width: windowHeight * 0.75,
            height: windowHeight,
            objectFit: 'cover',
          }}
          src={webcamImage}
        />
        {/* AURA */}
        {facePosition && (
          <AuraCluster facePosition={facePosition} auraRefs={auraRefs} />
        )}
      </div>
    </>
  );
};

export default CapturedImage;
