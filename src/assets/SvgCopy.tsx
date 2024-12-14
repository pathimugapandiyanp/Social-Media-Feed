import * as React from "react";
const SvgCopy = (props:any) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={20}
    height={20}
    fill="none"
    {...props}
  >
    <path
      fill="#212121"
      d="M5 5.107v8.018a3.125 3.125 0 0 0 2.92 3.118l.205.007h5.518a1.88 1.88 0 0 1-1.768 1.25H7.5a3.75 3.75 0 0 1-3.75-3.75V6.875c0-.817.522-1.511 1.25-1.768M14.375 2.5c1.036 0 1.875.84 1.875 1.875v8.75c0 1.036-.84 1.875-1.875 1.875h-6.25a1.875 1.875 0 0 1-1.875-1.875v-8.75c0-1.036.84-1.875 1.875-1.875z"
      opacity={0.5}
    />
  </svg>
);
export default SvgCopy;