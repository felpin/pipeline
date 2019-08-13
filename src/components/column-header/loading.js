import styled, { keyframes } from 'styled-components';

const spin = keyframes`
  to {
    transform: rotate(360deg);
  }
`;

export default styled.div`
  border: 3px solid ${props => props.theme.color.light};
  border-top-color: ${props => props.theme.color.dark};
  border-radius: 50%;
  width: ${props => props.theme.fontSize.medium};
  height: ${props => props.theme.fontSize.medium};
  animation: ${spin} 1s linear infinite;
`;
