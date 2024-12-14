import * as React from "react";
const SvgCamera = (props:any) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={17}
    height={17}
    fill="none"
    {...props}
  >
    <path
      fill="#3A8CD9"
      fillRule="evenodd"
      d="M3.188 3.188H0v11.687h17V3.188h-3.187l-2.126-2.125H5.314zm5.312 8.5a3.188 3.188 0 1 0 0-6.376 3.188 3.188 0 0 0 0 6.376"
      clipRule="evenodd"
    />
  </svg>
);
export default SvgCamera;