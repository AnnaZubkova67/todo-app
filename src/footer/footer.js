import React from 'react';
import './footer.css';
import PropTypes from 'prop-types';

import TasksFilter from '../tasks-filter';

function Footer({ countActive, onFilter, onClear }) {
  return (
    <footer className="footer">
      <span className="todo-count">{countActive} items left</span>
      <TasksFilter onFilter={onFilter} />
      <button type="button" className="clear-completed" onClick={onClear}>
        Clear completed
      </button>
    </footer>
  );
}

export default Footer;
Footer.defaultProps = {
  onFilter: () => {},
  onClear: () => {},
};

Footer.propTypes = {
  countActive: PropTypes.number.isRequired,
  onFilter: PropTypes.func,
  onClear: PropTypes.func,
};
