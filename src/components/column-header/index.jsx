import PropTypes from 'prop-types';
import React from 'react';
import { useTranslation } from 'react-i18next';

import Card from './card';
import CardContainer from './card-container';
import Circle from './circle';
import CircleContainer from './circle-container';
import Container from './container';
import Total from './total';
import TotalContainer from './total-container';
import Title from './title';

const ColumnHeader = ({ deals, showTotals, taxedTotalEur, taxedTotalGbp, title }) => {
  const { t } = useTranslation();

  return (
    <Container>
      <CardContainer>
        <Card>
          <Title>{title}</Title>
          <TotalContainer showTotals={showTotals}>
            <Total>{t('deal', { count: deals })}</Total>
            {showTotals && <Total justifySelf="center">{`${taxedTotalEur}€`}</Total>}
            {showTotals && <Total justifySelf="end">{`${taxedTotalGbp}£`}</Total>}
          </TotalContainer>
        </Card>
      </CardContainer>
      <CircleContainer>
        <Circle />
      </CircleContainer>
    </Container>
  );
};

ColumnHeader.propTypes = {
  deals: PropTypes.number,
  showTotals: PropTypes.bool,
  taxedTotalEur: PropTypes.number,
  taxedTotalGbp: PropTypes.number,
  title: PropTypes.string.isRequired,
};

ColumnHeader.defaultProps = {
  deals: 0,
  showTotals: true,
  taxedTotalEur: 0,
  taxedTotalGbp: 0,
};

export default React.memo(ColumnHeader);
