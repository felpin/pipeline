import styled from 'styled-components';

import Detail from './detail';

export default styled(Detail)`
  grid-area: ${props => props.row} / 2;
`;
