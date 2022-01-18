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

const getIcon = (type: ToastIconProps['type']): JSX.Element => {
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
