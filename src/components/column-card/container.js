import styled from 'styled-components';

import * as STATE from './state';

export default styled.div`
  align-items: center;
  background-color: white;
  border: 1px solid #dddee1;
  border-left-color: ${props =>
    (props.state === STATE.SUCCESS && props.theme.color.green) ||
    (props.state === STATE.ERROR && props.theme.color.red) ||
    '#dddee1'};
  border-left-width: ${props => (props.state !== STATE.NORMAL ? '3px' : '1px')};
  display: grid;
  grid-gap: 4px;
  grid-template: repeat(3, auto) / 1fr 1fr;
  padding: 12px 8px;
`;
