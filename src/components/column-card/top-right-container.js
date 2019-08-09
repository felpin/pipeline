import styled from 'styled-components';

import Detail from './detail';
import * as STATE from './state';

export default styled(Detail)`
  align-items: center;
  color: ${props =>
    (props.state === STATE.SUCCESS && props.theme.color.green) ||
    (props.state === STATE.ERROR && props.theme.color.red) ||
    props.theme.color.light};
  display: flex;
  fill: currentColor;
  font-style: italic;
  grid-area: 1 / 2;
  justify-self: end;

  svg {
    height: 16px;
    width: 16px;
  }
`;
