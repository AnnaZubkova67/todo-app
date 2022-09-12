import React from 'react';
import './button-filter.css';
import PropTypes from 'prop-types';

function ButtonFilter({ nameButton, id, active, onFilter, activeButton }) {
  let classButton = '';

  if (active) {
    classButton += 'selected';
  }

  return (
    // eslint-disable-next-line jsx-a11y/no-noninteractive-element-interactions
    <li onClick={() => onFilter(id)} onKeyDown={() => onFilter(id)}>
      <button type="button" className={classButton} onClick={() => activeButton(id)} onKeyDown={() => activeButton(id)}>
        {nameButton}
      </button>
    </li>
  );
}

export default ButtonFilter;

ButtonFilter.defaultProps = {
  activeButton: () => {},
  nameButton: '',
};

ButtonFilter.propTypes = {
  activeButton: PropTypes.func,
  nameButton: PropTypes.node,
  id: PropTypes.node.isRequired,
  active: PropTypes.bool.isRequired,
};
