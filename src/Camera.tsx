import Webcam from 'react-webcam';
import { useState, useEffect, useCallback, useRef, RefObject } from 'react';
import { useFaceDetection } from 'react-use-face-detection';
import FaceDetection from '@mediapipe/face_detection';
import { Camera as CameraUtils } from '@mediapipe/camera_utils';

import './Camera.css';
import { mergeRefs } from './mergeRefs';
import AuraCluster from './AuraCluster';

export type FacePositionType = {
  width: number;
  height: number;
  xCenter: number;
  yCenter: number;
};

function Camera() {
  const [windowSize, setWindowSize] = useState({ width: 0, height: 0 });
  const videoRef = useRef(null);
  const [facePosition, setFacePosition] = useState<FacePositionType | null>(
    null
  );

  const auraRefs: RefObject<SVGSVGElement>[] = [
    useRef<SVGSVGElement>(null),
    useRef<SVGSVGElement>(null),
    useRef<SVGSVGElement>(null),
    useRef<SVGSVGElement>(null),
  ];

  useEffect(() => {
    const handleResize = () => {
      setWindowSize({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    };
    window.addEventListener('resize', handleResize);
    handleResize();

    return () => window.removeEventListener('resize', handleResize);
  }, []);

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

  const captureImage = useCallback(() => {
    // @ts-ignore
    const imgSrc = videoRef?.current?.getScreenshot();
    // const imgSrc = videoRef?.current?.getScreenshot({
    //   width: 210,
    //   height: 340,
    // });

    const date = new Date();
    // tmp download image
    const link = document.createElement('a');
    link.href = imgSrc;
    link.download = `${date.toISOString()}.jpg`;
    link.click();

    // todo: image needs to be cropped and
    // needs to take a screenshot of the entire screen
    // with the aura overlay, could swap out video for img??
  }, [videoRef]);

  useEffect(() => {
    if (!boundingBox[0]) return;

    // only detect face if large enough on screen
    if (boundingBox[0].width > 0.15) {
      setFacePosition({
        width: boundingBox[0].width * 100,
        height: boundingBox[0].height * 100,
        xCenter: boundingBox[0].xCenter * 100,
        yCenter: boundingBox[0].yCenter * 100,
      });
    } else {
      setFacePosition(null);
    }
  }, [boundingBox, setFacePosition]);

  return (
    <>
      <div
        style={{
          width: windowSize.width / 2,
          height: windowSize.height,
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

        <Webcam
          ref={mergeRefs([webcamRef, videoRef])}
          forceScreenshotSourceSize
          mirrored
          screenshotFormat="image/jpeg"
          style={{
            width: windowSize.width / 2,
            height: windowSize.height,
            position: 'absolute',
          }}
        />
      </div>

      {/* AURA */}
      {facePosition !== null && (
        <AuraCluster facePosition={facePosition} auraRefs={auraRefs} />
      )}

      <div className="shutter-button" onClick={captureImage}>
        <svg
          width="334"
          height="338"
          viewBox="0 0 167 169"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M81.4218 118.783L83.5 153.027L85.5782 118.783C85.8341 114.566 91.59 113.552 93.2727 117.426L106.938 148.895L97.1784 116.005C95.9767 111.955 101.038 109.033 103.945 112.098L127.549 136.995L107.129 109.427C104.614 106.032 108.371 101.555 112.151 103.441L142.847 118.764L114.229 99.8418C110.705 97.5118 112.704 92.0196 116.901 92.4998L150.986 96.3997L117.623 88.4066C113.515 87.4223 113.515 81.5777 117.623 80.5934L150.986 72.6003L116.901 76.5002C112.704 76.9804 110.705 71.4882 114.229 69.1582L142.847 50.2363L112.151 65.5586C108.371 67.4454 104.614 62.9681 107.129 59.5734L127.549 32.005L103.945 56.9017C101.038 59.9674 95.9767 57.0451 97.1784 52.9951L106.938 20.1053L93.2727 51.5735C91.59 55.4485 85.8341 54.4336 85.5782 50.2168L83.5 15.9726L81.4218 50.2168C81.1659 54.4336 75.41 55.4485 73.7273 51.5735L60.0622 20.1053L69.8216 52.9951C71.0233 57.0451 65.9617 59.9674 63.0552 56.9017L39.4514 32.005L59.8712 59.5734C62.3857 62.9681 58.6288 67.4454 54.849 65.5586L24.1535 50.2363L52.7708 69.1582C56.2946 71.4882 54.2957 76.9804 50.0985 76.5002L16.0137 72.6003L49.3768 80.5934C53.485 81.5777 53.485 87.4223 49.3768 88.4066L16.0137 96.3997L50.0985 92.4998C54.2956 92.0196 56.2947 97.5118 52.7708 99.8418L24.1535 118.764L54.849 103.441C58.6288 101.555 62.3856 106.032 59.8712 109.427L39.4514 136.995L63.0552 112.098C65.9617 109.033 71.0233 111.955 69.8216 116.005L60.0622 148.895L73.7273 117.426C75.41 113.551 81.1659 114.566 81.4218 118.783Z"
            stroke="#fff"
            strokeWidth="2"
          />
        </svg>
      </div>
    </>
  );
}

export default Camera;
