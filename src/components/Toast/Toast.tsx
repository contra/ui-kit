import { styled } from '../../../stitches.config';
import { CloseIcon } from '../../icons';
import { ToastIcon } from './ToastIcon';
import type { Toast as ToastProps } from './types';

const Container = styled('div', {
  display: 'flex',
  position: 'fixed',
  right: '$16',
  top: '80px',
  variants: {
    isRelative: {
      true: {
        position: 'relative',
        right: '0',
        top: '0',
      },
    },
  },
  zIndex: '1000',
});

const Body = styled('div', {
  alignItems: 'flex-start',
  borderRadius: '$16',
  display: 'flex',
  flexDirection: 'row',
  maxWidth: '440px',
  padding: '$16',
  position: 'relative',
  textStyle: 'body:regular',
  variants: {
    type: {
      content: {
        backgroundColor: '$brandWhite',
        color: '$brandBlack',
      },
      error: {
        backgroundColor: '$alertError',
        color: '$brandWhite',
      },
      info: {
        backgroundColor: '$alertInformational',
        color: '$brandWhite',
      },
      loading: {
        backgroundColor: '$alertInformational',
        color: '$brandWhite',
      },
      success: {
        backgroundColor: '$alertSuccess',
        color: '$brandWhite',
      },
      warning: {
        backgroundColor: '$alertWarning',
        color: '$brandWhite',
      },
    },
  },
  width: '100%',
});

const Message = styled('span', {
  marginLeft: '$16',
  variants: {
    hideIcon: {
      true: {
        marginLeft: '0',
      },
    },
  },
});

const DismissButton = styled('button', {
  buttonReset: true,
  color: '$brandWhite',
  display: 'block',
  lineHeight: 1,
  marginLeft: '$16',
});

const handleDismiss = () => {
  // eslint-disable-next-line no-alert
  alert('TODO: Handle dismiss');
};

export const Toast = ({
  hideIcon,
  icon,
  message,
  type,
  isRelative,
}: ToastProps) => {
  return (
    <Container isRelative={isRelative}>
      <Body type={type}>
        {hideIcon ? null : <ToastIcon icon={icon} type={type} />}
        <Message hideIcon={hideIcon}>{message}</Message>
        <DismissButton onClick={handleDismiss}>
          <CloseIcon
            focusable={false}
            height={'24px'}
            role={'img'}
            width={'24px'}
          />
        </DismissButton>
      </Body>
    </Container>
  );
};
