import type {
  CheckboxProps as RTCheckboxProps,
  ToggleProps,
} from '@react-types/checkbox';
import type { ComponentPropsWithRef, ReactNode } from 'react';
import { useState, useRef } from 'react';
import { useCheckbox } from 'react-aria';
import { useToggleState } from 'react-stately';
import { styled } from '../../stitches.config';
import { CheckIcon } from '../animationIcons/CheckIcon';
import { easeOutExpo } from '../primitives/animation';

const Label = styled('label', {
  '& input:checked:disabled + div': {
    color: '$gray50',
  },
  display: 'block',
  position: 'relative',
});

const Input = styled('input', {
  '&:checked': {
    backgroundColor: '$brandYellow',
    borderColor: '$brandYellow',
  },
  '&:checked&:disabled': {
    backgroundColor: '$yellow20',
    borderColor: '$yellow20',
  },
  '&:disabled': {
    borderColor: '$gray30',
  },
  '&:focus': {
    outline: '2px solid $brandYellow',
    outlineOffset: '2px',
  },
  '&:indeterminate': {
    borderColor: '$brandYellow',
    position: 'relative',
  },
  '&:indeterminate:after': {
    backgroundColor: '$brandYellow',
    content: '""',
    height: '12px',
    left: '50%',
    position: 'absolute',
    top: '50%',
    transform: 'translate(-50%, -50%)',
    width: '12px',
  },
  appearance: 'none',
  backgroundColor: '$brandWhite',
  borderColor: '$gray50',
  borderRadius: '$4',
  borderStyle: '$solid',
  borderWidth: '$thin',
  height: '24px',
  margin: '0',
  position: 'relative',
  transform: 'scale(1)',
  transition: `transform 0.2s ${easeOutExpo}`,
  variants: {
    isPressed: {
      true: {
        transform: 'scale(0.9)',
      },
    },
  },
  width: '24px',
});

const IconContainer = styled('div', {
  left: '50%',
  position: 'absolute',
  top: '50%',
  transform: 'translate(-50%, -50%)',
});

type CheckboxProps = RTCheckboxProps & {
  label?: ReactNode;
};
export const Checkbox = ({
  validationState,
  label,
  defaultSelected,
  isIndeterminate,
  ...restProps
}: CheckboxProps &
  ComponentPropsWithRef<'input'> &
  RTCheckboxProps &
  ToggleProps) => {
  const ref = useRef<HTMLInputElement>(null);
  const { isSelected, toggle, setSelected } = useToggleState({
    defaultSelected,
    validationState,
  });
  const { inputProps } = useCheckbox(
    { isIndeterminate, ...restProps },
    { isSelected, setSelected, toggle },
    ref
  );
  const [isPressed, setIsPressed] = useState(false);

  return (
    <Label
      onMouseDown={() => setIsPressed(true)}
      onMouseUp={() => setIsPressed(false)}
    >
      <Input isPressed={isPressed} {...inputProps} {...restProps} ref={ref} />
      <IconContainer>
        <CheckIcon
          isChecked={isSelected}
          strokeDashoffset={isSelected ? '' : '21'}
        />
      </IconContainer>
      {label}
    </Label>
  );
};
