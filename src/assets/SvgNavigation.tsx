import * as React from "react";
const SvgNavigation = (props:any) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={17}
    height={16}
    fill="none"
    {...props}
  >
    <path
      fill="#000"
      fillRule="evenodd"
      d="m9.611 14.667-.04-.002a.666.666 0 0 1-.613-.532L7.933 9.088a.67.67 0 0 0-.521-.52L2.367 7.54a.664.664 0 0 1-.078-1.284L12.956 2.7a.667.667 0 0 1 .843.843l-3.556 10.667a.665.665 0 0 1-.632.456"
      clipRule="evenodd"
    />
    <mask
      id="navigation_svg__a"
      width={13}
      height={13}
      x={1}
      y={2}
      maskUnits="userSpaceOnUse"
      style={{
        maskType: "luminance",
      }}
    >
      <path
        fill="#fff"
        fillRule="evenodd"
        d="m9.611 14.667-.04-.002a.666.666 0 0 1-.613-.532L7.933 9.088a.67.67 0 0 0-.521-.52L2.367 7.54a.664.664 0 0 1-.078-1.284L12.956 2.7a.667.667 0 0 1 .843.843l-3.556 10.667a.665.665 0 0 1-.632.456"
        clipRule="evenodd"
      />
    </mask>
    <g mask="url(#navigation_svg__a)">
      <path fill="#000" d="M.5 0h16v16H.5z" />
    </g>
  </svg>
);
export default SvgNavigation;