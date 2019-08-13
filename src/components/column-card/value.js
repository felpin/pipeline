import styled from 'styled-components';

import Detail from './detail';

export default styled(Detail)`
  color: ${props => props.theme.color.dark};
  grid-area: 4 / 1;
`;
