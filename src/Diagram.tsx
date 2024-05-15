import { FacePositionType } from './Camera';

import './Diagram.css';

function Diagram({ facePosition }: { facePosition: FacePositionType }) {
  return (
    <div className="diagram-wrapper">
      <p
        style={{
          width: `${facePosition.width}vw`,
          top: `${facePosition.yCenter - facePosition.height * 0.55}vh`,
          left: `${facePosition.xCenter}vw`,
        }}
      >
        crown
      </p>
      <p
        style={{
          width: `${facePosition.width}vw`,
          top: `${facePosition.yCenter - 8}vh`,
          left: `${facePosition.xCenter}vw`,
        }}
      >
        third eye
      </p>
      <p
        style={{
          height: `${facePosition.height}vh`,
          top: `${facePosition.yCenter + facePosition.height / 3}vh`,
          left: `${facePosition.xCenter - 4}vw`,
        }}
      >
        past
      </p>
      <p
        style={{
          height: `${facePosition.height}vh`,
          top: `${facePosition.yCenter + facePosition.height / 3}vh`,
          left: `${facePosition.xCenter + facePosition.width + 2}vw`,
        }}
      >
        future
      </p>
      <p
        style={{
          width: `${facePosition.width}vw`,
          top: `${facePosition.yCenter + facePosition.height * 1.8}vh`,
          left: `${facePosition.xCenter}vw`,
        }}
      >
        heart
      </p>
    </div>
  );
}

export default Diagram;
