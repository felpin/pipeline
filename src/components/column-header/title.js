import styled from 'styled-components';

export default styled.div`
  color: ${props => props.theme.color.dark};
  font-size: ${props => props.theme.fontSize.medium};
  font-weight: ${props => props.theme.fontWeight.bold};
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
`;
