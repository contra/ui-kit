import { styled } from '../../../stitches.config';
import { Toast } from '../Toast/Toast';

const Wrapper = styled('div', {
  display: 'flex',
  flexFlow: 'row wrap',
  gap: '$16',
  width: '100%',
});

export const ToastStory = () => (
  <Wrapper>
    <Toast isRelative type="error" />
    <Toast isRelative type="info" />
    <Toast isRelative type="warning" />
    <Toast isRelative type="success" />
  </Wrapper>
);

export default {
  component: ToastStory,
  title: 'Toast',
};
