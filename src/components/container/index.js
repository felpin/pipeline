import styled from 'styled-components';

export default styled.div`
  font-weight: ${props => props.theme.fontWeight[props.fontWeight || 'regular']};
`;
