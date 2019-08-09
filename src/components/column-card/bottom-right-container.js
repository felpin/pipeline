import styled from 'styled-components';

import TopRightContainer from './top-right-container';

export default styled(TopRightContainer)`
  color: ${props => props.theme.color.blue};
  grid-area: 4 / 2;
`;
