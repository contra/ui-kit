import {
  AlertCircleIcon,
  AlertTriangleIcon,
  InfoIcon,
  CheckCircleIcon,
} from '../../icons';
import type { Toast } from './types';

type ToastIconProps = {
  icon: Toast['icon'];
  type: Toast['type'];
};

// eslint-disable-next-line no-warning-comments
// TODO: Figure out how to set type to JSX.Element
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const getIcon = (type: ToastIconProps['type']): any => {
  const svgProps = {
    focusable: false,
    height: '24px',
    role: 'img',
    width: '24px',
  };

  switch (type) {
    case 'error': {
      return <AlertCircleIcon {...svgProps} />;
    }

    case 'success': {
      return <CheckCircleIcon {...svgProps} />;
    }

    case 'warning': {
      return <AlertTriangleIcon {...svgProps} />;
    }

    default: {
      return <InfoIcon {...svgProps} />;
    }
  }
};

export const ToastIcon = ({ icon, type }: ToastIconProps) => {
  if (icon !== undefined) {
    return icon;
  }

  return getIcon(type);
};
