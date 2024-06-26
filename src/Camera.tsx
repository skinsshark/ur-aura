import Webcam from "react-webcam";
import { useState, useEffect, useCallback, useRef, RefObject } from "react";
import { useFaceDetection } from "react-use-face-detection";
import FaceDetection from "@mediapipe/face_detection";
import { Camera as CameraUtils } from "@mediapipe/camera_utils";

import "./Camera.css";
import { mergeRefs } from "./mergeRefs";
import AuraCluster from "./AuraCluster";
import html2canvas from "html2canvas";
import ShutterButton from "./ShutterButton";

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
    window.addEventListener("resize", handleResize);
    handleResize();

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const { webcamRef, boundingBox } = useFaceDetection({
    faceDetectionOptions: {
      selfieMode: true,
      model: "short",
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

  const captureImage = useCallback(() => {}, []);

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
      <div id="print-preview">
        <div
          style={{
            width: windowSize.width / 2,
            height: windowSize.height,
            position: "relative",
          }}
        >
          <Webcam
            ref={mergeRefs([webcamRef, videoRef])}
            forceScreenshotSourceSize
            mirrored
            screenshotFormat="image/jpeg"
            style={{
              width: windowSize.width / 2,
              height: windowSize.height,
              position: "absolute",
            }}
          />
        </div>

        {facePosition !== null && (
          <AuraCluster facePosition={facePosition} auraRefs={auraRefs} />
        )}
      </div>

      <ShutterButton onClick={captureImage} />
    </>
  );
}

export default Camera;
