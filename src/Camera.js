import Webcam from 'react-webcam';
import { useState, useEffect } from 'react';
import { useFaceDetection } from 'react-use-face-detection';
import FaceDetection from '@mediapipe/face_detection';
import './Camera.css';
import { Camera as CameraUtils } from '@mediapipe/camera_utils';

function Camera() {
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

  const you = boundingBox?.[0];

  return (
    <div
      style={{
        width: windowSize.width,
        height: windowSize.height,
        position: 'relative',
      }}
    >
      {you && (
        <div
          className="bounding-box"
          style={{
            top: `${you.yCenter * 100}%`,
            left: `${you.xCenter * 100}%`,
            width: `${you.width * 100}%`,
            height: `${you.height * 100}%`,
          }}
        />
      )}

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
