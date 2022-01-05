import { useRef } from 'react';
import { useCheckbox } from 'react-aria';
import { useToggleState } from 'react-stately';
import { styled } from '../../stitches.config';

const Input = styled('input', {
  '&:disabled': {
    borderColor: '$gray30',
  },
  appearance: 'none',
  backgroundColor: '$brandWhite',
  borderColor: '$gray50',
  borderRadius: '$4',
  borderStyle: '$solid',
  borderWidth: '$thin',
  height: '24px',
  margin: '0',
  width: '24px',
});

export const Checkbox = (props: { children?: string; disabled?: boolean }) => {
  const state = useToggleState(props);
  const ref = useRef<HTMLInputElement>(null);
  const { inputProps } = useCheckbox(props, state, ref);

  return (
    <label style={{ display: 'block' }}>
      <Input {...inputProps} disabled={props.disabled} ref={ref} />
      {props.children}
    </label>
  );
};
