import type { SVGProps } from 'react';
export const FilterIcon = (props: SVGProps<SVGSVGElement>) => (
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
      stroke="currentColor"
      strokeWidth={1.5}
      strokeLinecap="round"
      d="M1.75 6.25h20.5M4.75 12.25h14.5M8.75 18.25h6.5"
    />
  </svg>
);
