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
    <Checkbox isDisabled />
    <Checkbox />
    <Checkbox autoFocus defaultSelected />
    <Checkbox defaultSelected />
    <Checkbox defaultSelected isDisabled />
    <Checkbox isIndeterminate />
    <Checkbox validationState="invalid" />
  </Wrapper>
);

export default {
  component: CheckboxStates,
  title: 'Checkbox',
};
