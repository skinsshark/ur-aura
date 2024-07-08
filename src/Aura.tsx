import { forwardRef, useEffect } from 'react';
import AuraFilter from './AuraFilter';
import { FacePositionType } from './CapturedImage';

type AuraProps = {
  svgWidth: number;
  svgHeight: number;
  d: string;
  fillColor: string;
  facePosition: FacePositionType;
  width: number;
  height: number;
  top: number;
  left: number;
  fillOpacity?: number;
};

const Aura = forwardRef<SVGSVGElement, AuraProps>(
  (
    {
      d,
      fillColor,
      svgWidth,
      svgHeight,
      facePosition,
      width,
      height,
      top,
      left,
      fillOpacity = 1,
    },
    ref
  ) => {
    useEffect(() => {
      if (ref && typeof ref !== 'function' && ref.current) {
        ref.current.setAttribute('width', `${Math.round(width)}%`);
        ref.current.setAttribute('height', `${Math.round(height)}%`);
        ref.current.style.top = `${Math.round(top - 10)}%`;
        ref.current.style.left = `${Math.round(left)}%`;
      }
    }, [facePosition, height, ref, width, top, left]);
    const PADDING = 500; // to pad for filter effect

    return (
      <svg
        ref={ref}
        viewBox={`-${PADDING} -${PADDING} ${svgWidth + PADDING + PADDING} ${
          svgHeight + PADDING + PADDING
        }`}
        fill="none"
        fillOpacity={fillOpacity}
        xmlns="http://www.w3.org/2000/svg"
        preserveAspectRatio="xMidYMid meet"
      >
        <defs>
          <AuraFilter />
        </defs>
        <path d={d} fill={fillColor} />
      </svg>
    );
  }
);

export default Aura;
