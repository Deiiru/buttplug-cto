import * as React from "react";

const Moon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <svg viewBox="0 0 128 128" role="img" aria-hidden="true" {...props}>
    {/* crescent */}
    <defs>
      <mask id="cut">
        <rect width="128" height="128" fill="white" />
        <circle cx="82" cy="52" r="42" fill="black" />
      </mask>
    </defs>
    <circle cx="64" cy="64" r="42" fill="#FFEFAE" mask="url(#cut)" />
    {/* subtle craters */}
    <circle cx="52" cy="50" r="5" fill="#F4E7A1" />
    <circle cx="70" cy="80" r="4" fill="#F4E7A1" />
    <circle cx="44" cy="76" r="3" fill="#F4E7A1" />
  </svg>
);

export default React.memo(Moon);
