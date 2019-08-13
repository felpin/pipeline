import PropTypes from 'prop-types';
import React from 'react';

import Available from './available';
import BottomRightContainer from './bottom-right-container';
import Client from './client';
import Container from './container';
import Declined from './declined';
import Manufacturer from './manufacturer';
import * as STATE from './state';
import Title from './title';
import TopRightContainer from './top-right-container';
import Value from './value';
import VerticalEllipsis from './vertical-ellipsis';
import Warning from './warning';

const ACTION_MIN_ROW = 4;
const AVAILABLE_STARTING_ROW = 2;

const ColumnCard = ({
  action,
  available,
  client,
  currency,
  customInfo,
  declined,
  id,
  manufacturer,
  state,
  taxedTotal,
  warning,
}) => {
  const declinedStartingRow = AVAILABLE_STARTING_ROW + available.length;
  const actionRow = Math.max(ACTION_MIN_ROW, declinedStartingRow + declined.length);
  const warningRow = actionRow + 1;

  return (
    <Container state={state}>
      <Title>{id}</Title>
      <Manufacturer>{manufacturer ? manufacturer.name : '-'}</Manufacturer>
      <Client>{client}</Client>
      {!!currency && <Value>{`${taxedTotal} ${currency}`}</Value>}
      <TopRightContainer state={state}>
        {customInfo}
        <VerticalEllipsis>⋮</VerticalEllipsis>
      </TopRightContainer>
      {available.map((item, index) => (
        <Available key={item.id} row={AVAILABLE_STARTING_ROW + index}>
          {item.name}
        </Available>
      ))}
      {declined.map((item, index) => (
        <Declined key={item.id} row={declinedStartingRow + index}>
          {item.name}
        </Declined>
      ))}
      <BottomRightContainer row={actionRow}>{action}</BottomRightContainer>
      {warning.map((warningMessage, index) => (
        <Warning key={warningMessage} row={warningRow + index}>
          {warning}
        </Warning>
      ))}
    </Container>
  );
};

const manufacturerPropType = PropTypes.shape({
  id: PropTypes.number.isRequired,
  name: PropTypes.string.isRequired,
});

ColumnCard.propTypes = {
  action: PropTypes.node,
  available: PropTypes.arrayOf(manufacturerPropType),
  client: PropTypes.string.isRequired,
  currency: PropTypes.string,
  customInfo: PropTypes.node,
  declined: PropTypes.arrayOf(manufacturerPropType),
  id: PropTypes.number.isRequired,
  manufacturer: manufacturerPropType,
  state: PropTypes.oneOf(Object.values(STATE)),
  taxedTotal: PropTypes.number,
  warning: PropTypes.arrayOf(PropTypes.string),
};

ColumnCard.defaultProps = {
  action: null,
  available: [],
  currency: '',
  customInfo: null,
  declined: [],
  manufacturer: null,
  state: STATE.NORMAL,
  taxedTotal: 0,
  warning: [],
};

export default React.memo(ColumnCard);
