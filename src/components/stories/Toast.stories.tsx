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
    <Toast isRelative message="This is an error toast." type="error" />
    <Toast isRelative message="This is an info toast." type="info" />
    <Toast isRelative message="This is an warning toast." type="warning" />
    <Toast isRelative message="This is an success toast." type="success" />
  </Wrapper>
);

export default {
  component: ToastStory,
  title: 'Toast',
};
