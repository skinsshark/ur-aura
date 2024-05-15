import Webcam from 'react-webcam';
import { useState, useEffect } from 'react';
import { useFaceDetection } from 'react-use-face-detection';
import FaceDetection from '@mediapipe/face_detection';
import { Camera as CameraUtils } from '@mediapipe/camera_utils';

import './Camera.css';

export type FacePositionType = {
  width: number;
  height: number;
  xCenter: number;
  yCenter: number;
};

function Camera({
  setFacePosition,
}: {
  setFacePosition: (facePosition: FacePositionType) => void;
}) {
  const [windowSize, setWindowSize] = useState({ width: 0, height: 0 });

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

  useEffect(() => {
    if (!boundingBox[0]) return;

    setFacePosition({
      width: boundingBox[0].width * 100,
      height: boundingBox[0].height * 100,
      xCenter: boundingBox[0].xCenter * 100,
      yCenter: boundingBox[0].yCenter * 100,
    });
  }, [boundingBox, setFacePosition]);

  return (
    <div
      style={{
        width: windowSize.width,
        height: windowSize.height,
        position: 'relative',
      }}
    >
      {/* {facePosition && (
        <div
          className="bounding-box"
          style={{
            top: `${facePosition.yCenter * 100}%`,
            left: `${facePosition.xCenter * 100}%`,
            width: `${facePosition.width * 100}%`,
            height: `${facePosition.height * 100}%`,
          }}
        />
      )} */}

      <Webcam
        ref={webcamRef}
        forceScreenshotSourceSize
        style={{
          width: windowSize.width,
          height: windowSize.height,
          position: 'absolute',
        }}
      />
    </div>
  );
}

export default Camera;
