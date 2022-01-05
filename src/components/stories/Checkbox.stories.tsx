import { styled } from '../../../stitches.config';
import { Checkbox } from '../Checkbox';

const Wrapper = styled('div', {
  display: 'flex',
  flexFlow: 'row wrap',
  width: '100%',
});

export const CheckboxStory = () => (
  <Wrapper>
    <Checkbox>Test</Checkbox>
  </Wrapper>
);

export default {
  component: CheckboxStory,
  title: 'Checkbox',
};
