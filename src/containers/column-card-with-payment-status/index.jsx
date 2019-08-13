import PropTypes from 'prop-types';
import React, { useMemo } from 'react';
import { useTranslation } from 'react-i18next';

import ColumnCard from '../../components/column-card';

const ColumnCardWithPaymentStatus = props => {
  const { t } = useTranslation();

  const { daysOverdue, paidAmount, taxedTotal, warning } = props;

  const status = useMemo(
    () =>
      (daysOverdue && paidAmount < taxedTotal && 'error') ||
      (paidAmount >= taxedTotal && 'success') ||
      'normal',
    [daysOverdue, paidAmount, taxedTotal]
  );

  const warningWithPayment = useMemo(() => {
    const warnings = [...warning];

    if (daysOverdue && status === 'error') {
      warnings.push(t('paymentOverdue', { count: daysOverdue }));
    }

    return warnings;
  }, [daysOverdue, status, t, warning]);

  return <ColumnCard {...props} state={status} warning={[warningWithPayment]} />;
};

ColumnCardWithPaymentStatus.propTypes = {
  daysOverdue: PropTypes.number,
  paidAmount: PropTypes.number.isRequired,
  taxedTotal: PropTypes.number.isRequired,
  warning: PropTypes.arrayOf(PropTypes.string),
};

ColumnCardWithPaymentStatus.defaultProps = {
  daysOverdue: 0,
  warning: [],
};

export default React.memo(ColumnCardWithPaymentStatus);
