import { styled } from '../../../stitches.config';
import { Checkbox } from '../Checkbox';

const Wrapper = styled('div', {
  display: 'flex',
  flexFlow: 'row wrap',
  gap: '$16',
  width: '100%',
});

export const AllCheckboxes = () => (
  <Wrapper>
    <Checkbox disabled />
    <Checkbox />
  </Wrapper>
);

export default {
  component: AllCheckboxes,
  title: 'Checkbox',
};
