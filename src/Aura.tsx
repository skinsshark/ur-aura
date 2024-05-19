import { useRef } from 'react';
import { FacePositionType } from './Camera';

import './Aura.css';

function Aura({ facePosition }: { facePosition: FacePositionType }) {
  const crownAuraRef = useRef<SVGSVGElement | null>(null);

  const CROWN_AURA_HEIGHT = facePosition.height * 4;
  const CROWN_AURA_WIDTH = facePosition.width * 3;

  return (
    <svg
      ref={crownAuraRef}
      width={`${CROWN_AURA_WIDTH}%`}
      height={`${CROWN_AURA_HEIGHT}%`}
      style={{
        top: `${
          facePosition.yCenter -
          (CROWN_AURA_HEIGHT - facePosition.height) / 2 -
          10 // position adjustment
        }%`,
        left: `${
          facePosition.xCenter - (CROWN_AURA_WIDTH - facePosition.width) / 2
        }%`,
      }}
      viewBox="0 0 1388 1458"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <g filter="url(#filter0_f_11_90)">
        <path
          d="M275.508 427.61C279.351 418.834 298.309 355.397 307.676 354.241C350.763 288.777 384.657 225.947 455.673 189.388C536.392 147.835 554.519 150.02 643.139 150.02C729.094 150.02 813.303 156.576 898.439 168.173C968.935 177.776 1030.09 220.754 1077.66 271.544C1121.66 318.52 1143.16 389.237 1165.99 447.528C1204.77 546.517 1227.58 655.906 1233.9 761.676C1239.06 847.94 1241.88 939.96 1226.5 1025.4C1218.3 1070.94 1175.83 1236.24 1093.49 1195.58C1023.86 1161.2 990.977 1051.78 967.115 986.319C927.334 877.191 903.308 763.495 872.909 651.749C853.59 580.733 800.87 532.137 730.452 508.542C687.51 494.154 702.161 496.336 663.487 517.897C605.347 550.31 558.668 604.918 529.199 663.121C492.266 736.07 477.622 808.221 455.673 886C429.155 979.97 438.496 1086.36 402.826 1177.2C388.908 1212.65 252.222 1328.34 197.642 1304.75C139.624 1279.69 150.218 1202.28 151.688 1151.46C153.398 1092.33 159.088 1033.44 160.879 974.217C163.097 900.806 186.602 826.109 197.897 753.608C214.759 645.365 231.102 529.022 275.508 427.61Z"
          fill="#D258E6"
          fillOpacity="0.8"
        />
      </g>
      <defs>
        <filter
          id="filter0_f_11_90"
          x="0"
          y="0"
          width="1388"
          height="1458"
          filterUnits="userSpaceOnUse"
          colorInterpolationFilters="sRGB"
        >
          <feFlood floodOpacity="0" result="BackgroundImageFix" />
          <feBlend
            mode="normal"
            in="SourceGraphic"
            in2="BackgroundImageFix"
            result="shape"
          />
          <feGaussianBlur
            stdDeviation="75"
            result="effect1_foregroundBlur_11_90"
          />
        </filter>
      </defs>
    </svg>
  );
}

export default Aura;
