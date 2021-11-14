import type { SVGProps } from 'react';
export const HelpIcon = (props: SVGProps<SVGSVGElement>) => (
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
      d="M11 16a1 1 0 112 0 1 1 0 01-2 0zM12 6.75A3.25 3.25 0 008.75 10h1.5c0-.966.784-1.75 1.75-1.75h.115c.903 0 1.635.732 1.635 1.635v.269c0 .506-.308.962-.778 1.15a2.739 2.739 0 00-1.722 2.542V14h1.5v-.154c0-.506.308-.962.778-1.15a2.739 2.739 0 001.722-2.542v-.269a3.135 3.135 0 00-3.135-3.135H12z"
      fill="currentColor"
    />
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M24 12c0 6.627-5.373 12-12 12S0 18.627 0 12 5.373 0 12 0s12 5.373 12 12zM12 22.5c5.799 0 10.5-4.701 10.5-10.5S17.799 1.5 12 1.5 1.5 6.201 1.5 12 6.201 22.5 12 22.5z"
      fill="currentColor"
    />
  </svg>
);
