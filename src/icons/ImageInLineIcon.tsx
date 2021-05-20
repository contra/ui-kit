import type { SVGProps } from 'react';
export const ImageInLineIcon = (props: SVGProps<SVGSVGElement>) => (
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
    <path stroke="currentColor" d="M4 4.5h15M4 18.5h15" />
    <path
      fill="currentColor"
      stroke="currentColor"
      strokeLinecap="square"
      d="M4 7h15v9H4z"
    />
  </svg>
);
