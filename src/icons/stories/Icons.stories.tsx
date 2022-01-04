import * as Icons from '../.';
import { styled } from '../../../stitches.config';

const IconsWrapper = styled('div', {
  display: 'flex',
  width: '100%',
  flexFlow: 'row wrap',
});

const IconContainer = styled('div', {
  display: 'flex',
  flexFlow: 'column',
  alignItems: 'center',
  fontSize: '1rem',
  color: '$brandBlack',
  backgroundColor: '$brandWhite',
  borderRadius: '20px',
  padding: '16px',
  margin: '24px',
  boxShadow: '0px 0px 20px rgba(0, 0, 0, 0.16)',
  '& > *': {
    marginBottom: '8px',
  },
});

export const AllIcons = () => (
  <IconsWrapper>
    {Object.entries(Icons)
      .sort(([a], [b]) => a.localeCompare(b))
      .map(([iconName, Icon]) => (
        <IconContainer key={iconName}>
          <Icon height="32px" width="32px" />
          {iconName}
        </IconContainer>
      ))}
  </IconsWrapper>
);

export default {
  title: 'Icons',
  component: AllIcons,
};
