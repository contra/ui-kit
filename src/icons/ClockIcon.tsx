import type { SVGProps } from 'react';
export const ClockIcon = (props: SVGProps<SVGSVGElement>) => (
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
    <g clipPath="url(#prefix__clip0_39_17467)" fill="currentColor">
      <path d="M11.25 5v7.31l4.22 4.22 1.06-1.06-3.78-3.78V5h-1.5z" />
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M12 24c6.627 0 12-5.373 12-12S18.627 0 12 0 0 5.373 0 12s5.373 12 12 12zm10.5-12c0 5.799-4.701 10.5-10.5 10.5S1.5 17.799 1.5 12 6.201 1.5 12 1.5 22.5 6.201 22.5 12z"
      />
    </g>
    <defs>
      <clipPath id="prefix__clip0_39_17467">
        <path fill="#fff" d="M0 0h24v24H0z" />
      </clipPath>
    </defs>
  </svg>
);
