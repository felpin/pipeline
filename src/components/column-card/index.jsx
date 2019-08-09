import PropTypes from 'prop-types';
import React from 'react';

import BottomRightContainer from './bottom-right-container';
import Client from './client';
import Container from './container';
import Manufacter from './manufacter';
import * as STATE from './state';
import Title from './title';
import TopRightContainer from './top-right-container';
import Value from './value';
import VerticalEllipsis from './vertical-ellipsis';

const ColumnCard = ({
  action,
  client,
  currency,
  customInfo,
  id,
  manufacter,
  state,
  taxedTotal,
}) => (
  <Container state={state}>
    <Title>{id}</Title>
    <Manufacter>{manufacter}</Manufacter>
    <Client>{client}</Client>
    {!!currency && <Value>{`${taxedTotal} ${currency}`}</Value>}
    <TopRightContainer state={state}>
      {customInfo}
      <VerticalEllipsis>⋮</VerticalEllipsis>
    </TopRightContainer>
    <BottomRightContainer>{action}</BottomRightContainer>
  </Container>
);

ColumnCard.propTypes = {
  action: PropTypes.node,
  client: PropTypes.string.isRequired,
  currency: PropTypes.string,
  customInfo: PropTypes.node,
  id: PropTypes.number.isRequired,
  manufacter: PropTypes.string,
  state: PropTypes.oneOf(Object.values(STATE)),
  taxedTotal: PropTypes.number,
};

ColumnCard.defaultProps = {
  action: null,
  currency: '',
  customInfo: null,
  manufacter: '-',
  state: STATE.NORMAL,
  taxedTotal: 0,
};

export default React.memo(ColumnCard);
