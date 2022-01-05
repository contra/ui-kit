import { useRef } from 'react';
import { useCheckbox } from 'react-aria';
import { useToggleState } from 'react-stately';

export const Checkbox = (props: { children: HTMLElement }) => {
  const state = useToggleState(props);
  const ref = useRef<HTMLInputElement>(null);
  const { inputProps } = useCheckbox(props, state, ref);

  return (
    <label style={{ display: 'block' }}>
      <input {...inputProps} ref={ref} />
      {props.children}
    </label>
  );
};
