import PropTypes from 'prop-types';
import React from 'react';
import { useTransition } from 'react-spring';

import Container from './container';
import ItemContainer from './item-container';
import ItemsContainer from './items-container';

const Column = ({ header, items, renderItem }) => {
  const transitions = useTransition(items, item => item.id, {
    from: { opacity: 0, transform: 'translateX(-16px)' },
    enter: { opacity: 1, transform: 'translateX(0)' },
    leave: { opacity: 0, transform: 'translateX(16px)' },
  });

  return (
    <Container>
      {header}
      <ItemsContainer>
        {transitions.map(({ item, props, key }) => (
          <ItemContainer key={key} style={props}>
            {renderItem(item)}
          </ItemContainer>
        ))}
      </ItemsContainer>
    </Container>
  );
};

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
