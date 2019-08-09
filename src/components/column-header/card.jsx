import PropTypes from 'prop-types';
import React from 'react';
import { useTranslation } from 'react-i18next';
import styled from 'styled-components';

const CardContainer = styled.div`
  background-color: white;
  border-bottom-width: 0;
  border-color: #dddee1;
  border-left-width: 1px;
  border-right-width: 1px;
  border-style: solid;
  border-top-width: 1px;
  box-sizing: border-box;
  padding: 12px 8px;
`;

const Total = styled.div`
  color: ${props => props.theme.color.light};
  font-size: ${props => props.theme.fontSize.small};
`;

const TotalCenter = styled(Total)`
  justify-self: center;
`;

const TotalEnd = styled(Total)`
  justify-self: end;
`;

const TotalContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(${props => (props.showTotals ? 3 : 1)}, 1fr);
  margin-top: 6px;
  width: 100%;
`;

const Title = styled.div`
  color: ${props => props.theme.color.dark};
  font-size: ${props => props.theme.fontSize.medium};
  font-weight: ${props => props.theme.fontWeight.bold};
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
`;

const Card = ({ deals, showTotals, taxedTotalEur, taxedTotalGbp, title }) => {
  const { t } = useTranslation();

  return (
    <CardContainer>
      <Title>{title}</Title>
      <TotalContainer showTotals={showTotals}>
        <Total>{t('deal', { count: deals })}</Total>
        {showTotals && <TotalCenter>{`${taxedTotalEur}€`}</TotalCenter>}
        {showTotals && <TotalEnd>{`${taxedTotalGbp}£`}</TotalEnd>}
      </TotalContainer>
    </CardContainer>
  );
};

Card.propTypes = {
  deals: PropTypes.number,
  showTotals: PropTypes.bool,
  taxedTotalEur: PropTypes.number,
  taxedTotalGbp: PropTypes.number,
  title: PropTypes.string.isRequired,
};

Card.defaultProps = {
  deals: 0,
  showTotals: true,
  taxedTotalEur: 0,
  taxedTotalGbp: 0,
};

export default React.memo(Card);
