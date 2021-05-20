import type { SVGProps } from 'react';
export const CameraIcon = (props: SVGProps<SVGSVGElement>) => (
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
      d="M23 18a2 2 0 01-2 2H3a2 2 0 01-2-2V7a2 2 0 012-2h4l2-3h6l2 3h4a2 2 0 012 2v11z"
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M12 16a4 4 0 100-8 4 4 0 000 8z"
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);
