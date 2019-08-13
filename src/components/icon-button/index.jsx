import PropTypes from 'prop-types';
import React from 'react';

import Button from './button';

const IconButton = ({ ariaLabel, children, onClick }) => (
  <Button aria-label={ariaLabel} onClick={onClick} type="button">
    {children}
  </Button>
);

IconButton.propTypes = {
  ariaLabel: PropTypes.string.isRequired,
  children: PropTypes.node.isRequired,
  onClick: PropTypes.func,
};

IconButton.defaultProps = {
  onClick: () => {},
};

export default React.memo(IconButton);
