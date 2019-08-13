import styled from 'styled-components';

import TopRightContainer from './top-right-container';

export default styled(TopRightContainer)`
  color: ${props => props.theme.color.blue};
  fill: currentColor;
  grid-area: ${props => props.row} / 2;
`;
