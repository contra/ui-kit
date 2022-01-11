import { styled } from '../../../stitches.config';
import { Checkbox } from '../Checkbox';

const Wrapper = styled('div', {
  display: 'flex',
  flexFlow: 'row wrap',
  gap: '$16',
  width: '100%',
});

export const CheckboxStates = () => (
  <Wrapper>
    <Checkbox aria-label="Example checkbox: disabled" disabled />
    <Checkbox aria-label="Example checkbox: unchecked" />
    <Checkbox aria-label="Example checkbox: checked" defaultSelected />
    <Checkbox
      aria-label="Example checkbox: focused"
      autoFocus
      defaultSelected
    />
    <Checkbox
      aria-label="Example checkbox: unchecked"
      defaultSelected
      disabled
    />
    <Checkbox aria-label="test" isIndeterminate />
    <Checkbox aria-label="test" validationState="invalid" />
  </Wrapper>
);

export default {
  component: CheckboxStates,
  title: 'Checkbox',
};
