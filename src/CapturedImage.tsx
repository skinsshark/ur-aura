import { RefObject, useEffect, useRef, useState } from 'react';
import AuraCluster from './AuraCluster';
import { useFaceDetection } from 'react-use-face-detection';
import FaceDetection from '@mediapipe/face_detection';
import { SelfieSegmentation } from '@mediapipe/selfie_segmentation';

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
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const contextRef = useRef<CanvasRenderingContext2D>();
  const [segmentedImgSrc, setSegmentedImgSrc] = useState<string | null>(null);

  const { imgRef, boundingBox } = useFaceDetection({
    faceDetectionOptions: {
      model: 'short',
    },
    faceDetection: new FaceDetection.FaceDetection({
      locateFile: (file) =>
        `https://cdn.jsdelivr.net/npm/@mediapipe/face_detection/${file}`,
    }),
  });

  useEffect(() => {
    if (canvasRef.current) {
      const ctx = canvasRef.current.getContext('2d');
      if (ctx) contextRef.current = ctx;
    }

    const selfieSegmentation = new SelfieSegmentation({
      locateFile: (file) =>
        `https://cdn.jsdelivr.net/npm/@mediapipe/selfie_segmentation/${file}`,
    });
    selfieSegmentation.setOptions({
      modelSelection: 1,
      selfieMode: true,
    });

    selfieSegmentation.onResults(onResults);

    const sendToMediaPipe = async () => {
      // If there video isn't ready yet, just loop againf
      if (imgRef.current) {
        await selfieSegmentation.send({ image: imgRef.current });
      }
      requestAnimationFrame(sendToMediaPipe);
    };

    sendToMediaPipe();
  }, [imgRef]);

  const onResults = (results: any) => {
    if (contextRef.current && canvasRef.current) {
      contextRef.current.save();
      contextRef.current.clearRect(
        0,
        0,
        canvasRef.current.width,
        canvasRef.current.height
      );
      contextRef.current.drawImage(
        results.segmentationMask,
        0,
        0,
        canvasRef.current.width,
        canvasRef.current.height
      );

      contextRef.current.globalCompositeOperation = 'source-out';
      contextRef.current.fillStyle = 'red';
      contextRef.current.fillRect(
        0,
        0,
        canvasRef.current.width,
        canvasRef.current.height
      );

      contextRef.current.globalCompositeOperation = 'destination-atop';
      contextRef.current.drawImage(
        results.image,
        0,
        0,
        canvasRef.current.width,
        canvasRef.current.height
      );

      contextRef.current.restore();

      const dataURL = canvasRef.current.toDataURL();
      setSegmentedImgSrc(dataURL); // Set the base64-encoded data URL
      console.log(segmentedImgSrc);
    }
  };

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
    <div id="captured-webcam-photo">
      {/* for debugging */}
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
      {segmentedImgSrc && (
        <img
          src={segmentedImgSrc}
          alt="Segmented Result"
          style={{ position: 'absolute', top: 0, left: 0 }}
        />
      )}
      <canvas
        ref={canvasRef}
        style={{
          display: 'none',
        }}
      />
    </div>
  );
};

export default CapturedImage;
