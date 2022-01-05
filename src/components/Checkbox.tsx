import { useRef } from 'react';
import { useCheckbox } from 'react-aria';
import { useToggleState } from 'react-stately';
import { styled } from '../../stitches.config';
import { Check16pxIcon } from '../icons';

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
  '&[aria-invalid="true"]': {
    borderColor: '$uiErrorRegular',
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
  width: '24px',
});

const IconContainer = styled('div', {
  left: '50%',
  position: 'absolute',
  top: '50%',
  transform: 'translate(-50%, -50%)',
});

export const Checkbox = (props: {
  autoFocus?: boolean;
  children?: string;
  defaultSelected?: boolean;
  isDisabled?: boolean;
  isIndeterminate?: boolean;
  validationState?: 'invalid' | 'valid';
}) => {
  const state = useToggleState(props);
  const ref = useRef<HTMLInputElement>(null);
  const { inputProps } = useCheckbox(props, state, ref);

  return (
    <Label>
      <Input {...inputProps} ref={ref} />
      {state.isSelected && (
        <IconContainer>
          <Check16pxIcon />
        </IconContainer>
      )}
      {props.children}
    </Label>
  );
};
