import Webcam from "react-webcam";
import { useState, useEffect, useCallback, useRef, RefObject } from "react";
import { useFaceDetection } from "react-use-face-detection";
import FaceDetection from "@mediapipe/face_detection";
import { Camera as CameraUtils } from "@mediapipe/camera_utils";

import "./Camera.css";
import AuraCluster from "./AuraCluster";
import ShutterButton from "./ShutterButton";
import AuraPhoto from "./AuraPhoto";

export type FacePositionType = {
  width: number;
  height: number;
  xCenter: number;
  yCenter: number;
};

function Camera() {
  const [windowSize, setWindowSize] = useState({ width: 0, height: 0 });
  const [facePosition, setFacePosition] = useState<FacePositionType | null>(
    null
  );
  const [isGeneratingPhoto, setIsGeneratingPhoto] = useState<boolean>(false);
  const [webcamSnapshotImgSrc, setWebcamSnapshotImgSrc] = useState<string>("");

  const auraRefs: RefObject<SVGSVGElement>[] = [
    useRef<SVGSVGElement>(null),
    useRef<SVGSVGElement>(null),
    useRef<SVGSVGElement>(null),
    useRef<SVGSVGElement>(null),
  ];

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

  const generatePhoto = useCallback(async () => {
    if (isGeneratingPhoto) {
      return;
    } else {
      setIsGeneratingPhoto(true);
      // @ts-ignore
      setWebcamSnapshotImgSrc(webcamRef?.current?.getScreenshot());
    }
  }, [setIsGeneratingPhoto]);

  return (
    <div className="layer-container">
      <div className="webcam-layer">
        <div id="print-preview">
          <div
            style={{
              width: windowSize.width / 2,
              height: windowSize.height,
              position: "relative",
            }}
          >
            <Webcam
              ref={webcamRef}
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
        <ShutterButton onClick={generatePhoto} />
      </div>

      {facePosition && isGeneratingPhoto && webcamSnapshotImgSrc && (
        <div className="photo-layer">
          <AuraPhoto
            width={windowSize.width / 2}
            height={windowSize.height}
            webcamSnapshotImgSrc={webcamSnapshotImgSrc}
            facePosition={facePosition}
            auraRefs={auraRefs}
            isGeneratingPhoto={isGeneratingPhoto}
            setIsGeneratingPhoto={setIsGeneratingPhoto}
          />
        </div>
      )}
    </div>
  );
}

export default Camera;
