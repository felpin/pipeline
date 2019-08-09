import React from 'react';
import styled from 'styled-components';

import Card from './card';

const CardContainer = styled.div`
  padding: 12px 12px 0;
`;

const Circle = styled.div`
  background-color: #fafafa;
  border: 2px solid #dddee1;
  border-radius: 50%;
  box-sizing: border-box;
  height: 12px;
  width: 12px;
`;

const CircleContainer = styled.div`
  bottom: -7px;
  display: flex;
  justify-content: center;
  position: absolute;
  width: 100%;
`;

const Container = styled.div`
  border-bottom: 2px solid #dddee1;
  position: relative;
`;

const ColumnHeader = props => (
  <Container>
    <CardContainer>
      <Card {...props} />
    </CardContainer>
    <CircleContainer>
      <Circle />
    </CircleContainer>
  </Container>
);

export default React.memo(ColumnHeader);
