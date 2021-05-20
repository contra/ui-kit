import type { SVGProps } from 'react';
export const JobIcon = (props: SVGProps<SVGSVGElement>) => (
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
    <path d="M17 7V4a1 1 0 00-1-1H8a1 1 0 00-1 1v3" stroke="currentColor" />
    <rect x={3} y={7} width={18} height={14} rx={1} stroke="currentColor" />
  </svg>
);
