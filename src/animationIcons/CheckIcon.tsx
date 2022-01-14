import type { SVGProps } from 'react';
import { styled } from '../../stitches.config';
import { easeOutExpo, easeInQuad } from '../primitives/animation';

const Path = styled('path', {
  transition: `stroke-dashoffset 0.2s ${easeInQuad}`,
  variants: {
    isChecked: {
      true: {
        transition: `stroke-dashoffset 1s ${easeOutExpo}`,
      },
    },
  },
});

type CheckIconProps = SVGProps<SVGSVGElement> & {
  isChecked?: boolean;
};

export const CheckIcon = (props: CheckIconProps) => {
  const { isChecked, ...svgProps } = props;

  return (
    <svg
      fill="none"
      focusable="false"
      height="1em"
      role="img"
      viewBox="0 0 16 16"
      width="1em"
      xmlns="http://www.w3.org/2000/svg"
      {...svgProps}
    >
      <Path
        d="M0.709339 7.44716L5.70834 12.4462L15.3004 2.8541"
        isChecked={isChecked}
        stroke="currentColor"
        strokeDasharray="21 21"
        strokeMiterlimit="10"
        strokeWidth="2"
      />
    </svg>
  );
};
