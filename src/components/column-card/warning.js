import styled from 'styled-components';

export default styled.div`
  color: ${props => props.theme.color.red};
  font-size: ${props => props.theme.fontSize.small};
  font-weight: ${props => props.theme.fontWeight.bold};
  justify-self: end;
  grid-column: 1 / 3;
  grid-row: ${props => props.row};
  text-transform: uppercase;
`;
