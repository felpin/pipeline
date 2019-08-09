import PropTypes from 'prop-types';
import React from 'react';
import styled from 'styled-components';

const STATE = {
  NORMAL: 'normal',
  SUCCESS: 'success',
  ERROR: 'error',
};

const Detail = styled.div`
  color: ${props => props.theme.color.light};
  font-size: ${props => props.theme.fontSize.small};
  font-weight: ${props => props.theme.fontWeight.regular};
`;

const Client = styled(Detail)`
  grid-area: 3 / 1;
`;

const Manufacter = styled(Detail)`
  grid-area: 2 / 1;
`;

const TopRightContainer = styled(Detail)`
  align-items: center;
  color: ${props =>
    (props.state === STATE.SUCCESS && props.theme.color.green) ||
    (props.state === STATE.ERROR && props.theme.color.red) ||
    props.theme.color.light};
  display: flex;
  fill: currentColor;
  grid-area: 1 / 2;
  justify-self: end;
`;

const BottomRightContainer = styled(TopRightContainer)`
  color: ${props => props.theme.color.blue};
  grid-area: 4 / 2;
`;

const Container = styled.div`
  align-items: center;
  background-color: white;
  border: 1px solid #dddee1;
  border-left-color: ${props =>
    (props.state === STATE.SUCCESS && props.theme.color.green) ||
    (props.state === STATE.ERROR && props.theme.color.red) ||
    '#dddee1'};
  border-left-width: ${props => (props.state !== STATE.NORMAL ? '3px' : '1px')};
  display: grid;
  grid-gap: 4px;
  grid-template: repeat(3, auto) / 1fr 1fr;
  margin: 12px 12px 0;
  padding: 12px 8px;
`;

const Title = styled.div`
  color: ${props => props.theme.color.dark};
  font-size: ${props => props.theme.fontSize.medium};
  font-weight: ${props => props.theme.fontWeight.bold};
  grid-area: 1 / 1;
`;

const Value = styled(Detail)`
  color: ${props => props.theme.color.dark};
  grid-area: 4 / 1;
`;

const VerticalEllipsis = styled.span`
  color: ${props => props.theme.color.dark};
  font-size: ${props => props.theme.fontSize.medium};
  font-weight: ${props => props.theme.fontWeight.regular};
`;

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
