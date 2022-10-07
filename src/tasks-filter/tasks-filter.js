import React from 'react';
import './tasks-filter.css';

import ButtonFilter from '../button-filter';

function TasksFilter({ onFilter }) {
  const buttonFilter = [
    { nameButton: 'All', id: 'all', active: true },
    { nameButton: 'Active', id: 'active', active: false },
    { nameButton: 'Completed', id: 'completed', active: false },
  ];

  const activeButton = (id) =>
    [...buttonFilter].map((button) => {
      if (button.id === id) {
        return { ...button, active: true };
      }
      return { ...button, active: false };
    });

  const buttonElement = buttonFilter.map((button) => {
    const { nameButton, id, active } = button;
    return (
      <ButtonFilter
        key={id}
        id={id}
        nameButton={nameButton}
        active={active}
        onFilter={onFilter}
        activeButton={activeButton}
      />
    );
  });

  return <ul className="filters">{buttonElement}</ul>;
}

export default TasksFilter;
