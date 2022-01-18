import { styled } from '../../../stitches.config';
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
  borderRadius: '$16',
  display: 'flex',
  flexDirection: 'row',
  maxWidth: '448px',
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
  marginLeft: '$8',
  variants: {
    hideIcon: {
      true: {
        marginLeft: '0',
      },
    },
  },
});

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
      </Body>
    </Container>
  );
};
