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
    <Checkbox aria-label="test" isDisabled />
    <Checkbox aria-label="test" />
    <Checkbox aria-label="test" defaultSelected />
    <Checkbox aria-label="test" autoFocus defaultSelected />
    <Checkbox aria-label="test" defaultSelected isDisabled />
    <Checkbox aria-label="test" isIndeterminate />
    <Checkbox aria-label="test" validationState="invalid" />
  </Wrapper>
);

export default {
  component: CheckboxStates,
  title: 'Checkbox',
};
