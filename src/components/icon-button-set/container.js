import styled from 'styled-components';

export default styled.div`
  align-items: stretch;
  display: flex;

  *:nth-child(n + 2) {
    margin-left: 8px;
  }
`;
