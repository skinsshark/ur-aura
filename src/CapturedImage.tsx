import { RefObject, useEffect, useRef, useState } from 'react';
import AuraCluster from './AuraCluster';
import { useFaceDetection } from 'react-use-face-detection';
import FaceDetection from '@mediapipe/face_detection';

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
  const { imgRef, boundingBox } = useFaceDetection({
    faceDetectionOptions: {
      selfieMode: true,
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
    if (!boundingBox[0]) return;

    if (boundingBox[0].width > 0.15) {
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
  }, [boundingBox]);

  const auraRefs: RefObject<SVGSVGElement>[] = [
    useRef<SVGSVGElement>(null),
    useRef<SVGSVGElement>(null),
    useRef<SVGSVGElement>(null),
  ];

  return (
    <>
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
      <img
        ref={imgRef} // this is causing scary error
        crossOrigin="anonymous"
        id="captured-webcam-photo"
        alt="person from webcam with aura (hopefully)"
        style={{
          width: windowHeight * 0.75,
          height: windowHeight,
          backgroundImage: `url(${webcamImage})`,
          objectFit: 'cover',
        }}
        src={webcamImage}
      />
      {/* AURA */}
      {facePosition && (
        <AuraCluster facePosition={facePosition} auraRefs={auraRefs} />
      )}
    </>
  );
};

export default CapturedImage;
