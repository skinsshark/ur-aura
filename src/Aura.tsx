import { forwardRef, useEffect } from 'react';
import { FacePositionType } from './CapturedImage';
import { isMobile, isSafari } from 'react-device-detect';
import classNames from 'classnames';

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

    const className = classNames({
      'aura-mobile': isMobile,
      'aura-safari': isSafari,
      'aura-safari-web': isSafari && !isMobile,
    });

    return (
      <svg
        className={className}
        ref={ref}
        viewBox={`-${PADDING} -${PADDING} ${svgWidth + PADDING + PADDING} ${
          svgHeight + PADDING + PADDING
        }`}
        fill="none"
        fillOpacity={1}
        xmlns="http://www.w3.org/2000/svg"
        preserveAspectRatio="xMidYMid meet"
      >
        <defs>
          <filter id="wavy">
            <feTurbulence
              id="turbulence"
              type="turbulence"
              numOctaves="10"
              result="NOISE"
            ></feTurbulence>
            <feDisplacementMap
              in="SourceGraphic"
              in2="NOISE"
              scale="30"
            ></feDisplacementMap>
            <animate
              xlinkHref="#turbulence"
              attributeName="baseFrequency"
              values="0.01 0;0.02 0;0.01 0"
              repeatCount="indefinite"
            ></animate>
          </filter>
        </defs>
        <path d={d} fill={fillColor} />
      </svg>
    );
  }
);

export default Aura;
