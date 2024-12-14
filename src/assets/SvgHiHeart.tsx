import * as React from "react";
const SvgHiHeart = (props:any) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={20}
    height={20}
    fill="none"
    {...props}
  >
    <path
      fill="#D95B7F"
      fillRule="evenodd"
      d="M3.172 5.172a4 4 0 0 1 5.656 0L10 6.343l1.172-1.171a4 4 0 1 1 5.656 5.656L10 17.657l-6.828-6.829a4 4 0 0 1 0-5.656"
      clipRule="evenodd"
    />
  </svg>
);
export default SvgHiHeart;