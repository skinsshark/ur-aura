import { forwardRef, useEffect } from 'react';
import { FacePositionType } from './Camera';

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

    return (
      <svg
        ref={ref}
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
);

export default Aura;
