import { RefObject, useEffect, useState } from 'react';
import Aura from './Aura';

import './AuraCluster.css';
import { FacePositionType } from './CapturedImage';

const RED = 'rgba(255, 111, 111, 1)';
const ORANGE = 'rgba(237, 142, 0, 0.9)';
const YELLOW = 'rgba(255, 240, 102, 0.8)';
const GREEN = 'rgba(108, 239, 113, 0.8)';
const PURPLE = 'rgba(218, 111, 255, 0.8)';
const PINK = 'rgba(255, 184, 235, 1)';
const BLUE = 'rgba(101, 199, 255, 0.8)';
const WHITE = 'rgba(255, 255, 255, 1)';

const COLORS = [RED, ORANGE, YELLOW, GREEN, PURPLE, PINK, BLUE, WHITE];

const AuraCluster = ({
  auraRefs,
  facePosition,
}: {
  auraRefs: RefObject<SVGSVGElement>[];
  facePosition: FacePositionType;
}) => {
  const [auraColors, setAuraColors] = useState({
    crown: '',
    past: '',
    future: '',
  });

  // force uniqueness btwn auras
  useEffect(() => {
    const crownAuraColor = Math.floor(Math.random() * COLORS.length);

    let pastAuraColor = Math.floor(Math.random() * COLORS.length);
    while (pastAuraColor === crownAuraColor) {
      pastAuraColor = Math.floor(Math.random() * COLORS.length);
    }

    let futureAuraColor = Math.floor(Math.random() * COLORS.length);
    while (
      futureAuraColor === crownAuraColor ||
      futureAuraColor === pastAuraColor
    ) {
      futureAuraColor = Math.floor(Math.random() * COLORS.length);
    }

    setAuraColors({
      crown: COLORS[crownAuraColor],
      past: COLORS[pastAuraColor],
      future: COLORS[futureAuraColor],
    });
  }, []);

  const [auraScale, setAuraScale] = useState(1);

  const CROWN_AURA_HEIGHT = facePosition.height * 4 * auraScale;
  const CROWN_AURA_WIDTH = facePosition.width * 2.5 * auraScale;

  const PAST_AURA_HEIGHT = facePosition.height * 2 * auraScale;
  const PAST_AURA_WIDTH = facePosition.width * 2 * auraScale;

  const FUTURE_AURA_HEIGHT = facePosition.height * 1.6 * auraScale;
  const FUTURE_AURA_WIDTH = facePosition.width * 1.6 * auraScale;

  useEffect(() => {
    if (facePosition.width < 10) {
      setAuraScale(1.6);
    } else {
      setAuraScale(1.3);
    }
  }, [facePosition]);

  return (
    <div className="aura-cluster">
      <Aura
        d="M555.279 83.1759C643.225 43.6638 742.85 12.5 838.805 12.5C897.342 12.5 987.906 0.30896 1046.44 0.30896C1163.96 0.30896 1300.59 1.37617 1406.72 55.1878L1409.1 56.3903C1502.36 103.677 1597.56 151.94 1658.34 238.483C1701.99 300.623 1770.81 346.344 1824.08 400.375C1869.43 446.372 1885.66 511.523 1900.36 572.969C1920.63 657.735 1920.56 742.143 1950.3 825.412C1971.06 883.548 1987.07 933.814 1987.07 996.085C1987.07 1051.59 1990.68 1108.82 1981.03 1163.74C1971.23 1219.5 1957.43 1272.59 1953.59 1329.47C1950.23 1379.26 1948.22 1429.16 1939.87 1478.47C1929.9 1537.37 1873.9 1561.42 1831.76 1596.73C1761.2 1655.85 1679.67 1665.09 1590.29 1658.75C1489.91 1651.62 1466.21 1567.4 1441.3 1484.78C1431.56 1452.48 1428.82 1417.39 1416.88 1386C1403.16 1349.94 1385.31 1315.94 1377.91 1277.61C1363.09 1200.82 1383.69 1128.42 1393.28 1053.43C1405.46 958.162 1421.06 865.835 1413.03 768.612L1412.92 767.263C1410.66 739.855 1407.31 699.232 1393.28 675.318C1386.59 663.926 1366.94 658.352 1356.23 651.446C1332.72 636.273 1312.21 611.533 1285.99 601.232C1265.19 593.06 1235.54 597.736 1213.82 597.939C1169.07 598.357 1125.81 607.569 1081.57 612.756C1031.27 618.653 976.607 611.91 927.357 624.007C852.844 642.308 785.261 694.75 759.977 766.143C729.516 852.15 728.854 953.829 717.72 1043.55C708.478 1118.04 700.041 1191.56 688.085 1265.81C675.563 1343.59 655.294 1441.21 608.511 1506.18C562.038 1570.73 470.492 1572.13 398.325 1578.07C336.322 1583.18 272.897 1581.81 210.64 1580.82C158.938 1580 113.181 1537.65 75.0891 1505.91C32.819 1470.68 7.18981 1434.53 2.64912 1377.77C-1.50019 1325.9 0.970165 1271.3 16.3688 1221.36C31.2678 1173.04 59.1445 1130.06 78.1075 1083.34C102.645 1022.9 124.986 962.489 133.809 897.577C153.617 751.847 175.779 602.251 254.543 473.364C295.409 406.492 335.703 330.985 389.545 273.88C448.172 211.699 473.531 119.903 555.279 83.1759Z"
        svgWidth={1988}
        svgHeight={1661}
        width={CROWN_AURA_WIDTH}
        height={CROWN_AURA_HEIGHT}
        top={facePosition.yCenter - facePosition.height * 2.5}
        left={
          facePosition.xCenter - (CROWN_AURA_WIDTH - facePosition.width) / 2 - 4
        }
        facePosition={facePosition}
        fillColor={auraColors.crown}
        ref={auraRefs[0]}
      />

      <Aura
        svgWidth={1226}
        svgHeight={1808}
        d="M167.93 1718.63C257.709 1795.44 344.017 1842.25 446.824 1777.21C492.894 1748.07 533.49 1680.31 553.089 1662.8C576.601 1641.79 595.274 1604.12 614.975 1574.58C634.342 1545.54 651.65 1518.38 675.843 1501.52C710.482 1477.37 749.953 1470.86 786.382 1457.41C822.152 1444.2 859.91 1440.93 894.886 1422.95C924.551 1407.69 950.717 1379.15 975.297 1347.82C997.393 1319.65 1020.84 1295.21 1043.7 1268.9C1068.94 1239.84 1085.16 1202.01 1101.1 1158.28C1134.3 1067.26 1165.61 970.824 1195.97 877.067C1217.15 811.66 1229.59 763.505 1225.08 687.182C1221.19 621.312 1210.09 554.984 1201.67 490.404C1185.51 366.541 1170.87 224.614 1118.61 127.864C1094.22 82.6945 1069.09 39.1141 1034.74 16.5513C994.839 -9.66113 945.535 3.11108 903.64 3.11108H759.918C701.762 3.11108 642.81 -3.41028 585.66 18.2743C545.716 33.4307 506.983 52.7573 479.599 106.842C450.092 165.118 419.399 224.101 393.488 287.078C369.418 345.579 352.341 411.286 327.734 469.037C293.465 549.465 258.067 628.244 233.073 718.542C212.445 793.068 205.412 878.168 179.534 948.748C159.394 1003.68 124.664 1033.27 91.7942 1061.09C61.2076 1086.98 24.8312 1122.72 8.12605 1175.51C-6.75138 1222.52 2.46046 1284.76 7.10819 1334.72C22.8315 1503.74 76.2312 1640.18 167.93 1718.63Z"
        fillColor={auraColors.future}
        facePosition={facePosition}
        width={FUTURE_AURA_WIDTH}
        height={FUTURE_AURA_HEIGHT}
        top={facePosition.yCenter - 8}
        left={
          facePosition.xCenter + facePosition.width - FUTURE_AURA_WIDTH / 2.75
        }
        ref={auraRefs[1]}
      />

      <Aura
        svgWidth={780}
        svgHeight={948}
        d="M333.693 46.1851C258.081 12.2644 182.837 -20.3521 104.136 15.8161C51.7299 39.9003 36.0271 94.6889 15.3157 116.88C-3.80286 137.364 -1.44446 170.315 3.43134 195.54C13.3073 246.634 73.0098 275.671 63.4789 330.458C53.4585 388.06 18.462 436.655 34.3934 497.238C47.7791 548.141 97.5999 571.39 127.905 612.74C161.022 657.926 188.911 703.989 202.965 755.125C219.561 815.513 244.811 862.739 311.175 899.005C400.458 947.794 485.471 947.794 589.736 947.794H590.147C644.061 947.794 725.589 952.823 762.471 913.193C808.397 863.846 751.481 808.585 734.636 760.602C713.208 699.562 721.355 634.778 698.045 573.41C673.778 509.522 606.221 475.443 564.501 419.574C516.08 354.729 473.994 279.695 464.422 203.506C460.799 174.67 457.716 139.217 439.402 113.395C416.917 81.6921 371.946 63.3458 333.693 46.1851Z"
        fillColor={auraColors.past}
        facePosition={facePosition}
        width={PAST_AURA_WIDTH}
        height={PAST_AURA_HEIGHT}
        top={facePosition.yCenter}
        left={facePosition.xCenter - PAST_AURA_WIDTH / 1.8}
        ref={auraRefs[2]}
      />
    </div>
  );
};

export default AuraCluster;
