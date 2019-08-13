import styled from 'styled-components';

export default styled.div`
  display: grid;
  grid-template-columns: repeat(${props => (props.showTotals ? 3 : 1)}, 1fr);
  margin-top: 6px;
  width: 100%;
`;
