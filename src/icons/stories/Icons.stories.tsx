import * as Icons from '../.';

// const IconWrapper = styled.div`
//   display: flex;
//   width: 100%;
//   flex-flow: row wrap;

//   & > div.icon {
//     display: flex;
//     flex-flow: column;
//     align-items: center;
//     font-size: 1rem;
//     color: black;
//     background-color: white;
//     border-radius: 20px;
//     padding: 16px;
//     margin: 24px;
//     box-shadow: 0px 0px 20px rgba(0, 0, 0, 0.16);

//     & > * {
//       margin-bottom: 8px;
//     }

//     & > svg > path[fill='#fff'] {
//       fill: black;
//     }
//   }
// `;

export const AllIcons = () => (
  <div>
    {Object.entries(Icons)
      .sort(([a], [b]) => a.localeCompare(b))
      .map(([iconName, Icon]) => (
        <div className="icon" key={iconName}>
          <Icon height="32px" width="32px" />
          {iconName}
        </div>
      ))}
  </div>
);

export default {
  title: 'Icons',
  component: AllIcons,
};
