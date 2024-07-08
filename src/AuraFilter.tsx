const AuraFilter = () => (
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
);

export default AuraFilter;
