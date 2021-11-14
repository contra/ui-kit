import type { SVGProps } from 'react';
export const IdIcon = (props: SVGProps<SVGSVGElement>) => (
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
      d="M6.5 6a1.5 1.5 0 100-3 1.5 1.5 0 000 3zM6 10.5H2V9h5.5v8c0 .844-.279 1.623-.75 2.25H11v1.5H2v-1.5h1.75A2.25 2.25 0 006 17v-6.5z"
      fill="currentColor"
    />
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M21 10.313V3h1.5v18H21v-1.313a4.375 4.375 0 01-7.5-3.062v-3.25a4.375 4.375 0 017.5-3.062zm-6 3.062a2.875 2.875 0 015.75 0v3.25a2.875 2.875 0 01-5.75 0v-3.25z"
      fill="currentColor"
    />
  </svg>
);
