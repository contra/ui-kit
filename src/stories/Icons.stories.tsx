import * as Icons from '../icons';
import { styled } from '../stitches.config';

const IconsWrapper = styled('div', {
  display: 'flex',
  flexFlow: 'row wrap',
  width: '100%',
});

const IconContainer = styled('div', {
  '& > *': {
    marginBottom: '8px',
  },
  alignItems: 'center',
  backgroundColor: '$brandWhite',
  borderRadius: '20px',
  boxShadow: '0px 0px 20px rgba(0, 0, 0, 0.16)',
  color: '$brandBlack',
  display: 'flex',
  flexFlow: 'column',
  fontSize: '1rem',
  margin: '$24',
  padding: '$16',
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
  component: AllIcons,
  title: 'Icons',
};
