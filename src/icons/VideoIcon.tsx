import type { SVGProps } from 'react';
export const VideoIcon = (props: SVGProps<SVGSVGElement>) => (
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
    <rect x={1} y={3.2} width={22} height={17} rx={2} stroke="currentColor" />
    <path
      d="M9.75 15.02l5.75-3.27-5.75-3.27v6.54z"
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);
