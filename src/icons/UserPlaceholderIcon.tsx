import type { SVGProps } from 'react';
export const UserPlaceholderIcon = (props: SVGProps<SVGSVGElement>) => (
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
    <circle cx={12} cy={12} r={12} fill="currentColor" />
    <g clipPath="url(#prefix__clip0)">
      <mask
        id="prefix__a"
        maskUnits="userSpaceOnUse"
        x={0}
        y={1}
        width={24}
        height={23}
      >
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M12.126 23.713c6.238 0 11.294-5.056 11.294-11.294 0-6.237-5.056-11.294-11.294-11.294C5.89 1.125.832 6.182.832 12.419c0 6.238 5.057 11.294 11.294 11.294z"
          fill="#fff"
        />
      </mask>
      <g mask="url(#prefix__a)" fill="#fff">
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M12.14 15.086a4.87 4.87 0 004.876-4.863A4.87 4.87 0 0012.14 5.36a4.87 4.87 0 00-4.876 4.863 4.87 4.87 0 004.876 4.863z"
        />
        <rect x={3.655} y={16.184} width={16.941} height={9.569} rx={4.784} />
      </g>
    </g>
    <defs>
      <clipPath id="prefix__clip0">
        <rect
          x={1.126}
          y={1.125}
          width={21.84}
          height={21.84}
          rx={10.92}
          fill="#fff"
        />
      </clipPath>
    </defs>
  </svg>
);
