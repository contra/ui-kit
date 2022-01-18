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
    <Toast
      aria-label="Error toast"
      ariaLive="polite"
      createdAt={Date.now()}
      id="error-toast"
      isRelative
      message="This is an error toast. Lorem ipsum dolor sit amet."
      pauseDuration={2_000}
      role="status"
      type="error"
      visible
    />
    <Toast
      aria-label="Error toast"
      ariaLive="polite"
      createdAt={Date.now()}
      id="error-toast"
      isRelative
      message="This is an informational message. Lorem ipsum dolor sit amet."
      pauseDuration={2_000}
      role="status"
      type="info"
      visible
    />
    <Toast
      aria-label="Error toast"
      ariaLive="polite"
      createdAt={Date.now()}
      id="error-toast"
      isRelative
      message="This is an warning toast. Lorem ipsum dolor sit amet."
      pauseDuration={2_000}
      role="status"
      type="warning"
      visible
    />
    <Toast
      aria-label="Error toast"
      ariaLive="polite"
      createdAt={Date.now()}
      id="error-toast"
      isRelative
      message="This is an success toast. Lorem ipsum dolor sit amet."
      pauseDuration={2_000}
      role="status"
      type="success"
      visible
    />
  </Wrapper>
);

export default {
  component: ToastStory,
  title: 'Toast',
};
