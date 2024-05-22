import { useEffect, useRef, useState } from 'react';
import { FacePositionType } from './Camera';

import './AuraCluster.css';

function AuraCluster({ facePosition }: { facePosition: FacePositionType }) {
  const [auraScale, setAuraScale] = useState(1);

  const heartAuraColor = '#FFFFFF';
  const crownAuraColor = '#D258E6';
  const outerAuraColor = '#C74E4E';
  const pastAuraColor = '#5FC74E';
  const futureAuraColor = '#3988FF';

  const crownAuraRef = useRef<SVGSVGElement | null>(null);
  const CROWN_AURA_HEIGHT = facePosition.height * 4 * auraScale;
  const CROWN_AURA_WIDTH = facePosition.width * 3 * auraScale;

  const outerAuraRef = useRef<SVGSVGElement | null>(null);
  const OUTER_AURA_HEIGHT = facePosition.height * 5 * auraScale;
  const OUTER_AURA_WIDTH = facePosition.width * 4 * auraScale;

  const pastAuraRef = useRef<SVGSVGElement | null>(null);
  const PAST_AURA_HEIGHT = facePosition.height * 6 * auraScale;
  const PAST_AURA_WIDTH = facePosition.width * auraScale;

  const futureAuraRef = useRef<SVGSVGElement | null>(null);
  const FUTURE_AURA_HEIGHT = facePosition.height * 2 * auraScale;
  const FUTURE_AURA_WIDTH = (facePosition.width / 1.2) * auraScale;

  const heartAuraRef = useRef<SVGSVGElement | null>(null);
  const HEART_AURA_HEIGHT = facePosition.height * 2 * auraScale;
  const HEART_AURA_WIDTH = facePosition.width * 3 * auraScale;

  useEffect(() => {
    if (facePosition.width < 20) {
      setAuraScale(1.8);
    } else {
      setAuraScale(1);
    }

    if (crownAuraRef.current) {
      crownAuraRef.current.setAttribute('width', `${CROWN_AURA_WIDTH}%`);
      crownAuraRef.current.setAttribute('height', `${CROWN_AURA_HEIGHT}%`);
      crownAuraRef.current.style.top = `${
        facePosition.yCenter -
        (CROWN_AURA_HEIGHT - facePosition.height) / 2 -
        10
      }%`;
      crownAuraRef.current.style.left = `${
        facePosition.xCenter - (CROWN_AURA_WIDTH - facePosition.width) / 2
      }%`;
    }

    if (outerAuraRef.current) {
      outerAuraRef.current.setAttribute('width', `${OUTER_AURA_WIDTH}%`);
      outerAuraRef.current.setAttribute('height', `${OUTER_AURA_HEIGHT}%`);
      outerAuraRef.current.style.top = `${
        facePosition.yCenter -
        (OUTER_AURA_HEIGHT - facePosition.height) / 2 -
        10
      }%`;
      outerAuraRef.current.style.left = `${
        facePosition.xCenter - (OUTER_AURA_WIDTH - facePosition.width) / 2
      }%`;
    }

    if (pastAuraRef.current) {
      pastAuraRef.current.setAttribute('width', `${PAST_AURA_WIDTH}%`);
      pastAuraRef.current.setAttribute('height', `${PAST_AURA_HEIGHT}%`);
      pastAuraRef.current.style.top = `${facePosition.yCenter - 60}%`;
      pastAuraRef.current.style.left = `${
        facePosition.xCenter - PAST_AURA_WIDTH - 8
      }%`;
    }

    if (futureAuraRef.current) {
      futureAuraRef.current.setAttribute('width', `${FUTURE_AURA_WIDTH}%`);
      futureAuraRef.current.setAttribute('height', `${FUTURE_AURA_HEIGHT}%`);
      futureAuraRef.current.style.top = `${facePosition.yCenter - 60}%`;
      futureAuraRef.current.style.left = `${
        facePosition.xCenter + facePosition.width + 8
      }%`;
    }

    if (heartAuraRef.current) {
      heartAuraRef.current.setAttribute('width', `${HEART_AURA_WIDTH}%`);
      heartAuraRef.current.setAttribute('height', `${HEART_AURA_HEIGHT}%`);
      heartAuraRef.current.style.top = `${
        facePosition.yCenter + facePosition.height - 20
      }%`;
      heartAuraRef.current.style.left = `${
        facePosition.xCenter - (HEART_AURA_WIDTH - facePosition.width) / 2
      }%`;
    }
  }, [
    CROWN_AURA_HEIGHT,
    CROWN_AURA_WIDTH,
    FUTURE_AURA_HEIGHT,
    FUTURE_AURA_WIDTH,
    HEART_AURA_HEIGHT,
    HEART_AURA_WIDTH,
    OUTER_AURA_HEIGHT,
    OUTER_AURA_WIDTH,
    PAST_AURA_HEIGHT,
    PAST_AURA_WIDTH,
    facePosition,
  ]);

  return (
    <>
      <svg
        ref={outerAuraRef}
        viewBox="0 0 1999 2052"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <g filter="url(#filter0_f_11_92)">
          <path
            d="M1674.86 570.01C1669.48 556.733 1642.94 460.757 1629.83 459.007C1569.52 359.964 1522.07 264.905 1422.66 209.593C1309.67 146.724 1106.75 150.03 982.696 150.03C862.375 150.03 744.499 159.949 625.323 177.495C526.641 192.023 441.04 257.048 374.448 333.891C312.856 404.963 282.764 511.955 250.797 600.145C196.51 749.912 164.582 915.412 155.736 1075.44C148.521 1205.95 144.57 1345.17 166.1 1474.44C177.576 1543.34 237.023 1793.44 352.291 1731.92C449.759 1679.9 495.787 1514.35 529.19 1415.31C584.876 1250.21 618.507 1078.19 661.061 909.123C688.104 801.679 761.903 728.155 860.475 692.457C920.585 670.688 1017.19 680.435 1071.32 713.056C1152.71 762.095 1218.05 844.714 1259.3 932.773C1311 1043.14 1331.5 1152.3 1362.23 1269.98C1399.35 1412.15 1386.27 1573.11 1436.2 1710.56C1455.68 1764.19 1529.91 1932.77 1606.31 1897.09C1687.52 1859.16 1850.24 1742.04 1848.18 1665.16C1845.79 1575.71 1837.82 1486.61 1835.32 1397C1832.21 1285.93 1799.31 1172.92 1783.5 1063.23C1759.9 899.465 1737.02 723.442 1674.86 570.01Z"
            fill={outerAuraColor}
            fillOpacity="0.7"
          />
        </g>
        <defs>
          <filter
            id="filter0_f_11_92"
            x="0.000488281"
            y="0"
            width="1998.2"
            height="2052"
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
              result="effect1_foregroundBlur_11_92"
            />
          </filter>
        </defs>
      </svg>

      <svg
        ref={crownAuraRef}
        viewBox="0 0 1388 1458"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <g filter="url(#filter0_f_11_90)">
          <path
            d="M275.508 427.61C279.351 418.834 298.309 355.397 307.676 354.241C350.763 288.777 384.657 225.947 455.673 189.388C536.392 147.835 554.519 150.02 643.139 150.02C729.094 150.02 813.303 156.576 898.439 168.173C968.935 177.776 1030.09 220.754 1077.66 271.544C1121.66 318.52 1143.16 389.237 1165.99 447.528C1204.77 546.517 1227.58 655.906 1233.9 761.676C1239.06 847.94 1241.88 939.96 1226.5 1025.4C1218.3 1070.94 1175.83 1236.24 1093.49 1195.58C1023.86 1161.2 990.977 1051.78 967.115 986.319C927.334 877.191 903.308 763.495 872.909 651.749C853.59 580.733 800.87 532.137 730.452 508.542C687.51 494.154 702.161 496.336 663.487 517.897C605.347 550.31 558.668 604.918 529.199 663.121C492.266 736.07 477.622 808.221 455.673 886C429.155 979.97 438.496 1086.36 402.826 1177.2C388.908 1212.65 252.222 1328.34 197.642 1304.75C139.624 1279.69 150.218 1202.28 151.688 1151.46C153.398 1092.33 159.088 1033.44 160.879 974.217C163.097 900.806 186.602 826.109 197.897 753.608C214.759 645.365 231.102 529.022 275.508 427.61Z"
            fill={crownAuraColor}
            fillOpacity="0.6"
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

      <svg
        ref={pastAuraRef}
        style={{ filter: 'blur(80px)' }}
        width="780"
        height="948"
        viewBox="0 0 780 948"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M446.307 46.1851C521.919 12.2644 597.163 -20.3521 675.864 15.8161C728.27 39.9003 743.973 94.6889 764.684 116.88C783.803 137.364 781.444 170.315 776.569 195.54C766.693 246.634 706.99 275.671 716.521 330.458C726.542 388.06 761.538 436.655 745.607 497.238C732.221 548.141 682.4 571.39 652.095 612.74C618.978 657.926 591.089 703.989 577.035 755.125C560.439 815.513 535.189 862.739 468.825 899.005C379.542 947.794 294.529 947.794 190.264 947.794H189.853C135.939 947.794 54.4108 952.823 17.5292 913.193C-28.3969 863.846 28.5193 808.585 45.3637 760.602C66.7916 699.562 58.6453 634.778 81.9553 573.41C106.222 509.522 173.779 475.443 215.499 419.574C263.92 354.729 306.006 279.695 315.578 203.506C319.201 174.67 322.284 139.217 340.598 113.395C363.083 81.6921 408.054 63.3458 446.307 46.1851Z"
          fill={pastAuraColor}
        />
      </svg>

      <svg
        ref={futureAuraRef}
        style={{ filter: 'blur(80px)' }}
        width="1226"
        height="1808"
        viewBox="0 0 1226 1808"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M167.93 89.3709C257.709 12.5619 344.017 -34.2484 446.824 30.7855C492.894 59.9285 533.49 127.689 553.089 145.199C576.601 166.206 595.274 203.883 614.975 233.422C634.342 262.461 651.65 289.617 675.843 306.481C710.482 330.627 749.953 337.138 786.382 350.593C822.152 363.805 859.91 367.067 894.886 385.055C924.551 400.311 950.717 428.851 975.297 460.182C997.393 488.346 1020.84 512.786 1043.7 539.1C1068.94 568.161 1085.16 605.991 1101.1 649.723C1134.3 740.741 1165.61 837.176 1195.97 930.933C1217.15 996.34 1229.59 1044.5 1225.08 1120.82C1221.19 1186.69 1210.09 1253.02 1201.67 1317.6C1185.51 1441.46 1170.87 1583.39 1118.61 1680.14C1094.22 1725.31 1069.09 1768.89 1034.74 1791.45C994.839 1817.66 945.535 1804.89 903.64 1804.89H759.918C701.762 1804.89 642.81 1811.41 585.66 1789.73C545.716 1774.57 506.983 1755.24 479.599 1701.16C450.092 1642.88 419.399 1583.9 393.488 1520.92C369.418 1462.42 352.341 1396.71 327.734 1338.96C293.465 1258.54 258.067 1179.76 233.073 1089.46C212.445 1014.93 205.412 929.832 179.534 859.252C159.394 804.324 124.664 774.728 91.7942 746.906C61.2076 721.016 24.8312 685.28 8.12605 632.492C-6.75138 585.479 2.46046 523.239 7.10819 473.277C22.8315 304.257 76.2312 167.822 167.93 89.3709Z"
          fill={futureAuraColor}
        />
      </svg>

      <svg
        ref={heartAuraRef}
        width="1224"
        height="572"
        viewBox="0 0 1224 572"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <g filter="url(#filter0_df_88_33)">
          <path
            d="M257.041 472.527C341.84 553.383 420.071 569.828 534.342 582.969C613.976 592.126 659.098 578.573 738.908 568.341C831.192 556.509 883.743 530.581 961.008 472.527C1009.28 436.26 1064.62 426.164 1072.06 361.354C1079.45 296.929 1042.47 251.452 990.881 222.388C944.838 196.447 909.479 210.714 859.05 222.388C809.077 233.957 788.378 266.127 738.908 280.169C661.442 302.157 609.941 309.253 534.342 280.169C468.554 254.859 456.057 184.729 388.872 164.608C339.118 149.706 304.987 143.487 257.041 164.608C204.266 187.856 168.147 218.243 154.433 280.169C135.603 365.198 197.654 415.902 257.041 472.527Z"
            fill={heartAuraColor}
            fillOpacity="0.6"
            shapeRendering="crispEdges"
          />
          <path
            d="M257.041 472.527C341.84 553.383 420.071 569.828 534.342 582.969C613.976 592.126 659.098 578.573 738.908 568.341C831.192 556.509 883.743 530.581 961.008 472.527C1009.28 436.26 1064.62 426.164 1072.06 361.354C1079.45 296.929 1042.47 251.452 990.881 222.388C944.838 196.447 909.479 210.714 859.05 222.388C809.077 233.957 788.378 266.127 738.908 280.169C661.442 302.157 609.941 309.253 534.342 280.169C468.554 254.859 456.057 184.729 388.872 164.608C339.118 149.706 304.987 143.487 257.041 164.608C204.266 187.856 168.147 218.243 154.433 280.169C135.603 365.198 197.654 415.902 257.041 472.527Z"
            stroke="black"
            shapeRendering="crispEdges"
          />
        </g>
        <defs>
          <filter
            id="filter0_df_88_33"
            x="0.5"
            y="0.5"
            width="1223"
            height="571"
            filterUnits="userSpaceOnUse"
            colorInterpolationFilters="sRGB"
          >
            <feFlood floodOpacity="0" result="BackgroundImageFix" />
            <feColorMatrix
              in="SourceAlpha"
              type="matrix"
              values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
              result="hardAlpha"
            />
            <feOffset dy="4" />
            <feGaussianBlur stdDeviation="2" />
            <feComposite in2="hardAlpha" operator="out" />
            <feColorMatrix
              type="matrix"
              values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.25 0"
            />
            <feBlend
              mode="normal"
              in2="BackgroundImageFix"
              result="effect1_dropShadow_88_33"
            />
            <feBlend
              mode="normal"
              in="SourceGraphic"
              in2="effect1_dropShadow_88_33"
              result="shape"
            />
            <feGaussianBlur
              stdDeviation="75"
              result="effect2_foregroundBlur_88_33"
            />
          </filter>
        </defs>
      </svg>
    </>
  );
}

export default AuraCluster;
