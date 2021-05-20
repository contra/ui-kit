import type { SVGProps } from 'react';
export const CropIcon = (props: SVGProps<SVGSVGElement>) => (
  <svg
    width="1em"
    height="1em"
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    focusable="false"
    role="img"
    {...props}
  >
    <path
      d="M6.13 1L6 16a2 2 0 002 2h15"
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M1 6.13L16 6a2 2 0 012 2v15"
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);
