import React, { Component } from 'react';
import './tasks-filter.css';

import ButtonFilter from '../button-filter';

export default class TasksFilter extends Component {
  constructor() {
    super();
    this.state = {
      buttonFilter: [
        { nameButton: 'All', id: 'all', active: true },
        { nameButton: 'Active', id: 'active', active: false },
        { nameButton: 'Completed', id: 'completed', active: false },
      ],
    };
  }

  activeButton = (id) => {
    this.setState(({ buttonFilter }) => {
      const newArr = [...buttonFilter].map((button) => {
        if (button.id === id) {
          return { ...button, active: true };
        }
        return { ...button, active: false };
      });
      return {
        buttonFilter: newArr,
      };
    });
  };

  render() {
    const { buttonFilter } = this.state;
    const { onFilter } = this.props;
    const buttonElement = buttonFilter.map((button) => {
      const { nameButton, id, active } = button;
      return (
        <ButtonFilter
          key={id}
          id={id}
          nameButton={nameButton}
          active={active}
          onFilter={onFilter}
          activeButton={this.activeButton}
        />
      );
    });

    return <ul className="filters">{buttonElement}</ul>;
  }
}
