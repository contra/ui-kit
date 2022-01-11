import { gsap } from 'gsap';
import type { ChangeEvent } from 'react';
import { useEffect, useRef } from 'react';
import { useCheckbox } from 'react-aria';
import { useToggleState } from 'react-stately';
import { styled } from '../../stitches.config';
import { CheckIcon } from '../animationIcons/CheckIcon';

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
  'aria-label': string;
  autoFocus?: boolean;
  children?: string;
  defaultSelected?: boolean;
  isDisabled?: boolean;
  isIndeterminate?: boolean;
  validationState?: 'invalid' | 'valid';
}) => {
  const state = useToggleState(props);
  const ref = useRef<HTMLInputElement>(null);
  const checkedTl = useRef<GSAPTimeline>(
    gsap.timeline({
      paused: true,
    })
  );
  const { inputProps } = useCheckbox(props, state, ref);

  useEffect(() => {
    checkedTl.current
      .to(ref.current, {
        duration: 0.1,
        ease: 'expo.easeIn',
        scale: 1.2,
      })
      .to(ref.current, {
        duration: 0.1,
        ease: 'expo.easeOut',
        scale: 1,
      });
  }, []);

  const onChange = (event: ChangeEvent<HTMLInputElement>) => {
    const checked = event.target.checked;
    state.setSelected(checked);

    checkedTl.current.play(0);
  };

  return (
    <Label>
      <Input
        {...inputProps}
        aria-label={props['aria-label']}
        onChange={onChange}
        ref={ref}
      />
      <IconContainer>
        <CheckIcon strokeDashoffset={state.isSelected ? '' : '21'} />
      </IconContainer>
      {props.children}
    </Label>
  );
};
