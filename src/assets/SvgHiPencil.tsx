import * as React from "react";
const SvgHiPencil = (props:any) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={16}
    height={16}
    fill="none"
    {...props}
  >
    <path
      fill="#000"
      d="M10.869 2.869A1.6 1.6 0 1 1 13.13 5.13l-.634.635-2.263-2.263zM9.103 4.634 2.4 11.338V13.6h2.262l6.704-6.703z"
      opacity={0.6}
    />
  </svg>
);
export default SvgHiPencil;