import * as React from "react";
const SvgFolder = (props:any) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={16}
    height={16}
    fill="none"
    {...props}
  >
    <path
      fill="#DC3840"
      d="M0 1h5l3 2h5v2H3.746L2.03 11h2.08l1.143-4H16l-2 7H0z"
    />
  </svg>
);
export default SvgFolder;