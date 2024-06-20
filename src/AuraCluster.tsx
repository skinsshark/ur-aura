import { RefObject, createRef, useEffect, useRef, useState } from 'react';
import { FacePositionType } from './Camera';
import Aura from './Aura';

import './AuraCluster.css';

function AuraCluster({ facePosition }: { facePosition: FacePositionType }) {
  const [auraScale, setAuraScale] = useState(1);
  const auraRefs = useRef<RefObject<SVGSVGElement>[]>([
    createRef<SVGSVGElement>(),
    createRef<SVGSVGElement>(),
    createRef<SVGSVGElement>(),
    createRef<SVGSVGElement>(),
  ]);

  const heartAuraColor = '#FFFFFF';
  const crownAuraColor = '#D258E6';
  const pastAuraColor = '#5FC74E';
  const futureAuraColor = '#3988FF';

  const CROWN_AURA_HEIGHT = facePosition.height * 4 * auraScale;
  const CROWN_AURA_WIDTH = facePosition.width * 3 * auraScale;

  const PAST_AURA_HEIGHT = facePosition.height * 2 * auraScale;
  const PAST_AURA_WIDTH = facePosition.width * 2 * auraScale;

  const FUTURE_AURA_HEIGHT = facePosition.height * 1.6 * auraScale;
  const FUTURE_AURA_WIDTH = facePosition.width * 2 * auraScale;

  const HEART_AURA_HEIGHT = facePosition.height * 2 * auraScale;
  const HEART_AURA_WIDTH = facePosition.width * 3 * auraScale;

  useEffect(() => {
    if (facePosition.width < 10) {
      setAuraScale(1.6);
    } else {
      setAuraScale(1);
    }
  }, [facePosition]);

  return (
    <div className="aura-cluster">
      <Aura
        svgWidth={979}
        svgHeight={407}
        d="M300.778 32.6742C202.722 5.0961 85.9151 -30.9915 25.2279 58.44C-25.9438 133.849 10.4538 244.322 51.3514 290.331C72.769 314.426 105.933 337.803 135.09 351.167C159.962 362.567 189.069 365.433 215.966 367.628C251.595 370.537 281.718 382.999 316.166 389.458C357.111 397.135 399.688 393.532 441.058 399.836C477.528 405.393 512.946 407.568 549.846 404.846C637.043 398.413 728.552 376.472 800.346 325.401C848.736 290.98 906.471 262.617 946.352 218.044C980.613 179.753 979.277 152.321 978.559 103.53C977.231 13.2065 874.392 0.467102 801.062 0.467102C748.926 0.467102 714.708 13.4017 672.591 46.2728C634.362 76.1107 604.879 116.413 552.709 116.413C503.414 116.413 456.43 100.047 416.724 71.3228C386.33 49.3358 336.312 42.6682 300.778 32.6742Z"
        fillColor={heartAuraColor}
        facePosition={facePosition}
        width={HEART_AURA_WIDTH}
        height={HEART_AURA_HEIGHT}
        top={facePosition.yCenter + facePosition.height - 10}
        left={
          facePosition.xCenter - (HEART_AURA_WIDTH - facePosition.width) / 2
        }
        fillOpacity={0.6}
        ref={auraRefs.current[0]}
      />

      <Aura
        svgWidth={1226}
        svgHeight={1808}
        d="M167.93 89.3709C257.709 12.5619 344.017 -34.2484 446.824 30.7855C492.894 59.9285 533.49 127.689 553.089 145.199C576.601 166.206 595.274 203.883 614.975 233.422C634.342 262.461 651.65 289.617 675.843 306.481C710.482 330.627 749.953 337.138 786.382 350.593C822.152 363.805 859.91 367.067 894.886 385.055C924.551 400.311 950.717 428.851 975.297 460.182C997.393 488.346 1020.84 512.786 1043.7 539.1C1068.94 568.161 1085.16 605.991 1101.1 649.723C1134.3 740.741 1165.61 837.176 1195.97 930.933C1217.15 996.34 1229.59 1044.5 1225.08 1120.82C1221.19 1186.69 1210.09 1253.02 1201.67 1317.6C1185.51 1441.46 1170.87 1583.39 1118.61 1680.14C1094.22 1725.31 1069.09 1768.89 1034.74 1791.45C994.839 1817.66 945.535 1804.89 903.64 1804.89H759.918C701.762 1804.89 642.81 1811.41 585.66 1789.73C545.716 1774.57 506.983 1755.24 479.599 1701.16C450.092 1642.88 419.399 1583.9 393.488 1520.92C369.418 1462.42 352.341 1396.71 327.734 1338.96C293.465 1258.54 258.067 1179.76 233.073 1089.46C212.445 1014.93 205.412 929.832 179.534 859.252C159.394 804.324 124.664 774.728 91.7942 746.906C61.2076 721.016 24.8312 685.28 8.12605 632.492C-6.75138 585.479 2.46046 523.239 7.10819 473.277C22.8315 304.257 76.2312 167.822 167.93 89.3709Z"
        fillColor={futureAuraColor}
        facePosition={facePosition}
        width={FUTURE_AURA_WIDTH}
        height={FUTURE_AURA_HEIGHT}
        top={facePosition.yCenter}
        left={facePosition.xCenter + facePosition.width - 4}
        ref={auraRefs.current[1]}
      />

      <Aura
        d="M555.279 83.1759C643.225 43.6638 742.85 12.5 838.805 12.5C897.342 12.5 987.906 0.30896 1046.44 0.30896C1163.96 0.30896 1300.59 1.37617 1406.72 55.1878L1409.1 56.3903C1502.36 103.677 1597.56 151.94 1658.34 238.483C1701.99 300.623 1770.81 346.344 1824.08 400.375C1869.43 446.372 1885.66 511.523 1900.36 572.969C1920.63 657.735 1920.56 742.143 1950.3 825.412C1971.06 883.548 1987.07 933.814 1987.07 996.085C1987.07 1051.59 1990.68 1108.82 1981.03 1163.74C1971.23 1219.5 1957.43 1272.59 1953.59 1329.47C1950.23 1379.26 1948.22 1429.16 1939.87 1478.47C1929.9 1537.37 1873.9 1561.42 1831.76 1596.73C1761.2 1655.85 1679.67 1665.09 1590.29 1658.75C1489.91 1651.62 1466.21 1567.4 1441.3 1484.78C1431.56 1452.48 1428.82 1417.39 1416.88 1386C1403.16 1349.94 1385.31 1315.94 1377.91 1277.61C1363.09 1200.82 1383.69 1128.42 1393.28 1053.43C1405.46 958.162 1421.06 865.835 1413.03 768.612L1412.92 767.263C1410.66 739.855 1407.31 699.232 1393.28 675.318C1386.59 663.926 1366.94 658.352 1356.23 651.446C1332.72 636.273 1312.21 611.533 1285.99 601.232C1265.19 593.06 1235.54 597.736 1213.82 597.939C1169.07 598.357 1125.81 607.569 1081.57 612.756C1031.27 618.653 976.607 611.91 927.357 624.007C852.844 642.308 785.261 694.75 759.977 766.143C729.516 852.15 728.854 953.829 717.72 1043.55C708.478 1118.04 700.041 1191.56 688.085 1265.81C675.563 1343.59 655.294 1441.21 608.511 1506.18C562.038 1570.73 470.492 1572.13 398.325 1578.07C336.322 1583.18 272.897 1581.81 210.64 1580.82C158.938 1580 113.181 1537.65 75.0891 1505.91C32.819 1470.68 7.18981 1434.53 2.64912 1377.77C-1.50019 1325.9 0.970165 1271.3 16.3688 1221.36C31.2678 1173.04 59.1445 1130.06 78.1075 1083.34C102.645 1022.9 124.986 962.489 133.809 897.577C153.617 751.847 175.779 602.251 254.543 473.364C295.409 406.492 335.703 330.985 389.545 273.88C448.172 211.699 473.531 119.903 555.279 83.1759Z"
        svgWidth={1988}
        svgHeight={1661}
        width={CROWN_AURA_WIDTH}
        height={CROWN_AURA_HEIGHT}
        top={
          facePosition.yCenter -
          (CROWN_AURA_HEIGHT - facePosition.height) / 2 -
          10
        }
        left={
          facePosition.xCenter - (CROWN_AURA_WIDTH - facePosition.width) / 2
        }
        facePosition={facePosition}
        fillColor={crownAuraColor}
        ref={auraRefs.current[2]}
      />

      <Aura
        svgWidth={780}
        svgHeight={948}
        d="M446.307 46.1851C521.919 12.2644 597.163 -20.3521 675.864 15.8161C728.27 39.9003 743.973 94.6889 764.684 116.88C783.803 137.364 781.444 170.315 776.569 195.54C766.693 246.634 706.99 275.671 716.521 330.458C726.542 388.06 761.538 436.655 745.607 497.238C732.221 548.141 682.4 571.39 652.095 612.74C618.978 657.926 591.089 703.989 577.035 755.125C560.439 815.513 535.189 862.739 468.825 899.005C379.542 947.794 294.529 947.794 190.264 947.794H189.853C135.939 947.794 54.4108 952.823 17.5292 913.193C-28.3969 863.846 28.5193 808.585 45.3637 760.602C66.7916 699.562 58.6453 634.778 81.9553 573.41C106.222 509.522 173.779 475.443 215.499 419.574C263.92 354.729 306.006 279.695 315.578 203.506C319.201 174.67 322.284 139.217 340.598 113.395C363.083 81.6921 408.054 63.3458 446.307 46.1851Z"
        fillColor={pastAuraColor}
        facePosition={facePosition}
        width={PAST_AURA_WIDTH}
        height={PAST_AURA_HEIGHT}
        top={facePosition.yCenter - 10}
        left={facePosition.xCenter - PAST_AURA_WIDTH / 1.2}
        fillOpacity={0.7}
        ref={auraRefs.current[3]}
      />
    </div>
  );
}

export default AuraCluster;
