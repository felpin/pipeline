import PropTypes from 'prop-types';
import React from 'react';

import ItemContainer from './item-container';
import ItemsContainer from './items-container';

const Column = ({ header, items, renderItem }) => (
  <>
    {header}
    <ItemsContainer>
      {items.map(item => (
        <ItemContainer key={item.id}>{renderItem(item)}</ItemContainer>
      ))}
    </ItemsContainer>
  </>
);

Column.propTypes = {
  header: PropTypes.node.isRequired,
  items: PropTypes.arrayOf(PropTypes.shape({ id: PropTypes.number })),
  renderItem: PropTypes.func,
};

Column.defaultProps = {
  items: [],
  renderItem: () => null,
};

export default React.memo(Column);
