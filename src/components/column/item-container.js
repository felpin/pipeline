import { animated } from 'react-spring';
import styled from 'styled-components';

export default styled(animated.li)`
  &:nth-child(n + 2) {
    margin-top: 12px;
  }
`;
