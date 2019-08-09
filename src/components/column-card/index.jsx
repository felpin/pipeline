import PropTypes from 'prop-types';
import React from 'react';
import styled from 'styled-components';

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

const Container = styled.div`
  align-items: center;
  background-color: white;
  border: 1px solid #dddee1;
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

const TopRightContainer = styled(Detail)`
  align-items: center;
  display: flex;
  fill: currentColor;
  grid-area: 1 / 2;
  justify-self: end;
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

const ColumnCard = ({ client, currency, customInfo, id, manufacter, taxedTotal }) => (
  <Container>
    <Title>{id}</Title>
    <Manufacter>{manufacter}</Manufacter>
    <Client>{client}</Client>
    {!!currency && <Value>{`${taxedTotal} ${currency}`}</Value>}
    <TopRightContainer>
      {customInfo}
      <VerticalEllipsis>⋮</VerticalEllipsis>
    </TopRightContainer>
  </Container>
);

ColumnCard.propTypes = {
  client: PropTypes.string.isRequired,
  currency: PropTypes.string,
  customInfo: PropTypes.node,
  id: PropTypes.number.isRequired,
  manufacter: PropTypes.string,
  taxedTotal: PropTypes.number,
};

ColumnCard.defaultProps = {
  currency: '',
  customInfo: null,
  manufacter: '-',
  taxedTotal: 0,
};

export default React.memo(ColumnCard);
