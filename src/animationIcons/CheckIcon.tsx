import type { SVGProps } from 'react';
import { styled } from '../../stitches.config';

const Path = styled('path', {
  'input:checked ~ div &': {
    transition: 'stroke-dashoffset 1s cubic-bezier(0.16, 1, 0.3, 1)',
  },
  transition: 'stroke-dashoffset 0.2s cubic-bezier(0.11, 0, 0.5, 0)',
});

export const CheckIcon = (props: SVGProps<SVGSVGElement>) => (
  <svg
    fill="none"
    focusable="false"
    height="1em"
    role="img"
    viewBox="0 0 16 16"
    width="1em"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <Path
      d="M0.709339 7.44716L5.70834 12.4462L15.3004 2.8541"
      stroke="currentColor"
      strokeDasharray="21 21"
      strokeMiterlimit="10"
      strokeWidth="2"
    />
  </svg>
);
