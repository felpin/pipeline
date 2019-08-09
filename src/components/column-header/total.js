import styled from 'styled-components';

export default styled.div`
  color: ${props => props.theme.color.light};
  font-size: ${props => props.theme.fontSize.small};
  justify-self: ${props => props.justifySelf || 'auto'};
`;
