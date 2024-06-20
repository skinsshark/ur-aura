import { useEffect, useRef } from 'react';
import { FacePositionType } from './Camera';

function Aura({
  d,
  fillColor,
  svgWidth,
  svgHeight,
  facePosition,
  width,
  height,
  top,
  left,
  fillOpacity = 0.9,
}: {
  d: string;
  fillColor: string;
  svgWidth: number;
  svgHeight: number;
  facePosition: FacePositionType;
  width: number;
  height: number;
  top: number;
  left: number;
  fillOpacity?: number;
}) {
  const auraRef = useRef<SVGSVGElement | null>(null);

  useEffect(() => {
    if (auraRef.current) {
      auraRef.current.setAttribute('width', `${Math.round(width)}%`);
      auraRef.current.setAttribute('height', `${Math.round(height)}%`);
      auraRef.current.style.top = `${Math.round(top - 10)}%`;
      auraRef.current.style.left = `${Math.round(left)}%`;
    }
  }, [facePosition, height, auraRef, width, top, left]);

  return (
    <svg
      ref={auraRef}
      width={svgWidth}
      height={svgHeight}
      viewBox={`0 0 ${svgWidth} ${svgHeight}`}
      fill="none"
      fillOpacity={fillOpacity}
      xmlns="http://www.w3.org/2000/svg"
    >
      <path d={d} fill={fillColor} />
    </svg>
  );
}

export default Aura;
