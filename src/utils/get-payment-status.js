export default item => {
  const { daysOverdue, paidAmount, taxedTotal } = item;
  return (
    (daysOverdue && paidAmount < taxedTotal && 'error') ||
    (paidAmount >= taxedTotal && 'success') ||
    'normal'
  );
};
